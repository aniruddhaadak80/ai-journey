"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { GitBranch, X, ChevronRight, Info } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { flowcharts, type Flowchart } from "@/data/content";

const nodeColors: Record<string, { bg: string; border: string; text: string }> = {
  start: { bg: "rgba(34, 211, 238, 0.15)", border: "#22d3ee", text: "#22d3ee" },
  process: { bg: "rgba(139, 92, 246, 0.15)", border: "#8b5cf6", text: "#a78bfa" },
  decision: { bg: "rgba(245, 158, 11, 0.15)", border: "#f59e0b", text: "#fbbf24" },
  data: { bg: "rgba(16, 185, 129, 0.15)", border: "#10b981", text: "#34d399" },
  end: { bg: "rgba(236, 72, 153, 0.15)", border: "#ec4899", text: "#f472b6" },
};

function FlowchartViewer({ flowchart }: { flowchart: Flowchart }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const centerView = useCallback(() => {
    if (!containerRef.current) return;
    const w = containerRef.current.clientWidth;
    const h = containerRef.current.clientHeight;
    setTransform({ x: w / 2 - 200, y: h / 2 - 250, scale: 1 });
  }, []);

  useEffect(() => {
    centerView();
  }, [centerView]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".flowchart-node")) return;
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
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.95 : 1.05;
    setTransform((t) => ({
      ...t,
      scale: Math.max(0.3, Math.min(2, t.scale * delta)),
    }));
  };

  const nodeMap = new Map(flowchart.nodes.map((n) => [n.id, n]));

  return (
    <div ref={containerRef} className="relative h-[500px] glass rounded-2xl overflow-hidden">
      <svg
        className="w-full h-full"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        <g transform={`translate(${transform.x}, ${transform.y}) scale(${transform.scale})`}>
          {/* Edges */}
          {flowchart.edges.map((edge, i) => {
            const from = nodeMap.get(edge.from);
            const to = nodeMap.get(edge.to);
            if (!from || !to) return null;

            const dx = to.x - from.x;
            const cx1 = from.x + dx * 0.4;
            const cy1 = from.y;
            const cx2 = to.x - dx * 0.4;
            const cy2 = to.y;

            return (
              <g key={i}>
                <path
                  d={`M ${from.x} ${from.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${to.x} ${to.y}`}
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="1.5"
                  markerEnd="url(#arrowhead)"
                />
                {edge.label && (
                  <text
                    x={(from.x + to.x) / 2}
                    y={(from.y + to.y) / 2 - 8}
                    textAnchor="middle"
                    fill="rgba(255,255,255,0.3)"
                    fontSize="10"
                    fontFamily="var(--font-mono)"
                  >
                    {edge.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* Arrow marker */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="8"
              markerHeight="6"
              refX="8"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="rgba(255,255,255,0.2)" />
            </marker>
          </defs>

          {/* Nodes */}
          {flowchart.nodes.map((node) => {
            const colors = nodeColors[node.type];
            const isSelected = selectedNode === node.id;
            return (
              <g
                key={node.id}
                className="flowchart-node cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedNode(isSelected ? null : node.id);
                }}
              >
                {node.type === "decision" ? (
                  <rect
                    x={node.x - 55}
                    y={node.y - 25}
                    width="110"
                    height="50"
                    rx="8"
                    fill={isSelected ? `${colors.border}30` : colors.bg}
                    stroke={colors.border}
                    strokeWidth={isSelected ? 2 : 1}
                    transform={`rotate(0, ${node.x}, ${node.y})`}
                  />
                ) : node.type === "start" || node.type === "end" ? (
                  <ellipse
                    cx={node.x}
                    cy={node.y}
                    rx="60"
                    ry="25"
                    fill={isSelected ? `${colors.border}30` : colors.bg}
                    stroke={colors.border}
                    strokeWidth={isSelected ? 2 : 1}
                  />
                ) : (
                  <rect
                    x={node.x - 55}
                    y={node.y - 25}
                    width="110"
                    height="50"
                    rx="10"
                    fill={isSelected ? `${colors.border}30` : colors.bg}
                    stroke={colors.border}
                    strokeWidth={isSelected ? 2 : 1}
                  />
                )}
                <text
                  x={node.x}
                  y={node.y - 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={colors.text}
                  fontSize="10"
                  fontFamily="var(--font-inter)"
                  fontWeight="500"
                >
                  {node.label.split("\n")[0]}
                </text>
                {node.label.includes("\n") && (
                  <text
                    x={node.x}
                    y={node.y + 10}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={colors.text}
                    fontSize="9"
                    fontFamily="var(--font-mono)"
                    opacity="0.7"
                  >
                    {node.label.split("\n")[1]}
                  </text>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Controls */}
      <div className="absolute bottom-3 right-3 flex gap-2">
        <button
          onClick={centerView}
          className="px-3 py-1.5 glass rounded-lg text-xs text-white/50 hover:text-white"
        >
          Reset View
        </button>
      </div>

      {/* Node info */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-3 left-3 glass-strong rounded-xl p-3 max-w-xs"
          >
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: nodeColors[nodeMap.get(selectedNode)!.type].border }}
              />
              <span className="text-xs text-white/40 capitalize">
                {nodeMap.get(selectedNode)!.type}
              </span>
            </div>
            <div className="text-sm font-medium">{nodeMap.get(selectedNode)!.label.replace("\n", " ")}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FlowchartsPage() {
  const [selectedFlowchart, setSelectedFlowchart] = useState<Flowchart | null>(null);

  return (
    <div className="min-h-screen bg-grid noise pt-16">
      <Navbar />

      {/* Header */}
      <section className="py-20 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Visual <span className="gradient-text">Flowcharts</span>
            </h1>
            <p className="text-white/40 max-w-xl mx-auto">
              See how everything works — neural network training, transformers, RLHF, agents, diffusion, and RAG.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Flowchart grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {flowcharts.map((fc, i) => (
              <motion.button
                key={fc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setSelectedFlowchart(fc)}
                className="glass rounded-2xl p-5 text-left card-hover group"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center">
                    <GitBranch className="w-4 h-4 text-violet-400" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold group-hover:text-cyan-300 transition-colors">
                      {fc.title}
                    </h3>
                    <p className="text-xs text-white/30">{fc.nodes.length} nodes</p>
                  </div>
                </div>
                <p className="text-sm text-white/40">{fc.description}</p>
                <div className="flex items-center gap-1 mt-3 text-xs text-cyan-400/60">
                  <span>Click to explore</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedFlowchart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedFlowchart(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-4xl glass-strong rounded-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-display text-xl font-bold">{selectedFlowchart.title}</h2>
                  <p className="text-sm text-white/40">{selectedFlowchart.description}</p>
                </div>
                <button
                  onClick={() => setSelectedFlowchart(null)}
                  className="p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FlowchartViewer flowchart={selectedFlowchart} />
              <div className="flex items-center gap-2 mt-4 text-xs text-white/30">
                <Info className="w-3 h-3" />
                Drag to pan · Scroll to zoom · Click nodes for details
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
