import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AI Journey — The Complete Interactive History of AI",
    short_name: "AI Journey",
    description:
      "From Turing's dream to autonomous agents — timeline, knowledge graph, course, flowcharts, and every source linked.",
    start_url: "/",
    display: "standalone",
    background_color: "#050508",
    theme_color: "#050508",
    orientation: "portrait-primary",
    categories: ["education", "reference", "books"],
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/apple-touch-icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      { name: "Timeline", url: "/timeline" },
      { name: "Knowledge Graph", url: "/graph" },
      { name: "Course", url: "/course" },
      { name: "Glossary", url: "/glossary" },
      { name: "Sources", url: "/sources" },
    ],
  };
}
