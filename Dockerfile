# syntax=docker/dockerfile:1

# ── deps ────────────────────────────────────────────────────────────────
FROM oven/bun:1.3.14-alpine AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# ── builder ─────────────────────────────────────────────────────────────
FROM oven/bun:1.3.14-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
RUN bun run build

# ── runner ──────────────────────────────────────────────────────────────
FROM oven/bun:1.3.14-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
 && adduser --system --uid 1001 bun

COPY --from=builder /app/public ./public
COPY --from=builder --chown=bun:bun /app/.next ./.next
COPY --from=builder --chown=bun:bun /app/node_modules ./node_modules
COPY --from=builder --chown=bun:bun /app/package.json ./package.json

USER bun
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD bun --eval "fetch('http://127.0.0.1:3000').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["bun", "run", "start"]
