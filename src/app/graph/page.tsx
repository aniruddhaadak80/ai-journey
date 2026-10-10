"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ZoomIn, ZoomOut, Maximize2, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { graphNodes, graphEdges, eras, type GraphNode } from "@/data/content";

export default function GraphPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const animFrameRef = useRef<number>(0);

  const filteredNodes = filter === "all" ? graphNodes : graphNodes.filter((n) => n.kind === filter);
  const filteredNodeIds = new Set(filteredNodes.map((n) => n.id));
  const filteredEdges = graphEdges.filter((e) => filteredNodeIds.has(e.source) && filteredNodeIds.has(e.target));

  // Center view
  const centerView = useCallback(() => {
    if (!containerRef.current) return;
    const w = containerRef.current.clientWidth;
    const h = containerRef.current.clientHeight;
    setTransform({ x: w / 2 - 1100, y: h / 2 - 100, scale: 0.6 });
  }, []);

  useEffect(() => {
    centerView();
  }, [centerView]);

  // Draw
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, w, h);

    ctx.save();
    ctx.translate(transform.x, transform.y);
    ctx.scale(transform.scale, transform.scale);

    // Draw edges
    filteredEdges.forEach((edge) => {
      const source = graphNodes.find((n) => n.id === edge.source);
      const target = graphNodes.find((n) => n.id === edge.target);
      if (!source || !target) return;

      const isHighlighted = hoveredNode === edge.source || hoveredNode === edge.target;
      ctx.beginPath();
      ctx.moveTo(source.x, source.y);
      ctx.lineTo(target.x, target.y);
      ctx.strokeStyle = isHighlighted
        ? "rgba(34, 211, 238, 0.6)"
        : "rgba(255, 255, 255, 0.08)";
      ctx.lineWidth = isHighlighted ? 2 : 1;
      ctx.stroke();

      // Edge label
      if (edge.label && transform.scale > 0.5) {
        const mx = (source.x + target.x) / 2;
        const my = (source.y + target.y) / 2;
        ctx.font = "10px var(--font-mono)";
        ctx.fillStyle = "rgba(255,255,255,0.25)";
        ctx.textAlign = "center";
        ctx.fillText(edge.label, mx, my - 4);
      }
    });

    // Draw nodes
    filteredNodes.forEach((node) => {
      const isHovered = hoveredNode === node.id;
      const isSelected = selectedNode?.id === node.id;
      const radius = node.size * (isHovered ? 1.2 : 1);

      // Glow
      if (isHovered || isSelected) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius + 8, 0, Math.PI * 2);
        ctx.fillStyle = `${node.color}15`;
        ctx.fill();
      }

      // Node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = `${node.color}30`;
      ctx.fill();
      ctx.strokeStyle = node.color;
      ctx.lineWidth = isSelected ? 2.5 : 1.5;
      ctx.stroke();

      // Inner dot
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius * 0.3, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.fill();

      // Label
      if (transform.scale > 0.35) {
        ctx.font = `${isHovered ? "bold " : ""}11px var(--font-inter)`;
        ctx.fillStyle = isHovered ? "#fff" : "rgba(255,255,255,0.6)";
        ctx.textAlign = "center";
        ctx.fillText(node.label, node.x, node.y + radius + 14);
      }
    });

    ctx.restore();
  }, [transform, hoveredNode, selectedNode, filteredNodes, filteredEdges]);

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [draw]);

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setTransform((t) => ({
        ...t,
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      }));
    }

    // Hit test
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = (e.clientX - rect.left - transform.x) / transform.scale;
    const my = (e.clientY - rect.top - transform.y) / transform.scale;

    let found: string | null = null;
    for (const node of filteredNodes) {
      const dx = mx - node.x;
      const dy = my - node.y;
      if (dx * dx + dy * dy < (node.size + 5) * (node.size + 5)) {
        found = node.id;
        break;
      }
    }
    setHoveredNode(found);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    if (hoveredNode) {
      const node = graphNodes.find((n) => n.id === hoveredNode);
      if (node) setSelectedNode(node);
    } else {
      setSelectedNode(null);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setTransform((t) => ({
      ...t,
      scale: Math.max(0.2, Math.min(3, t.scale * delta)),
    }));
  };

  const zoom = (factor: number) => {
    setTransform((t) => ({
      ...t,
      scale: Math.max(0.2, Math.min(3, t.scale * factor)),
    }));
  };

  const kindColors: Record<string, string> = {
    era: "#22d3ee",
    concept: "#8b5cf6",
    person: "#f59e0b",
    paper: "#60a5fa",
    tech: "#10b981",
  };

  return (
    <div className="min-h-screen bg-grid noise pt-16">
      <Navbar />

      {/* Header */}
      <section className="py-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-3">
              The <span className="gradient-text">Knowledge Graph</span>
            </h1>
            <p className="text-white/40 max-w-xl">
              Every concept, person, and era — connected. Drag to pan, scroll to zoom, click to explore.
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mt-6">
            {["all", "era", "concept", "person"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  filter === f
                    ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30"
                    : "glass text-white/40 hover:text-white/60"
                }`}
              >
                {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
                {f !== "all" && (
                  <span className="ml-1.5 text-white/20">
                    {graphNodes.filter((n) => n.kind === f).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Graph canvas */}
      <div ref={containerRef} className="relative h-[calc(100vh-280px)] min-h-[500px]">
        <canvas
          ref={canvasRef}
          className="w-full h-full graph-canvas"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={handleClick}
          onWheel={handleWheel}
        />

        {/* Controls */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button
            onClick={() => zoom(1.2)}
            className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => zoom(0.8)}
            className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={centerView}
            className="w-10 h-10 glass rounded-xl flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 glass rounded-xl p-3">
          <div className="text-xs text-white/30 mb-2 font-medium">Legend</div>
          <div className="space-y-1.5">
            {Object.entries(kindColors).map(([kind, color]) => (
              <div key={kind} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-xs text-white/40 capitalize">{kind}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Selected node panel */}
        <AnimatePresence>
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute top-4 right-4 w-80 glass-strong rounded-2xl p-5"
            >
              <button
                onClick={() => setSelectedNode(null)}
                className="absolute top-3 right-3 text-white/30 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: selectedNode.color }}
                />
                <span className="text-xs text-white/30 capitalize">{selectedNode.kind}</span>
              </div>
              <h3 className="font-display text-lg font-bold mb-2">{selectedNode.label}</h3>
              <p className="text-sm text-white/50 mb-4">{selectedNode.description}</p>
              <div className="text-xs text-white/30">
                Era: {eras.find((e) => e.id === selectedNode.era)?.name || selectedNode.era}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}
