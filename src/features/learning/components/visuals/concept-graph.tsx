"use client";

import { ConceptGraphNode } from "@/features/learning/domain/types";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

export function ConceptGraph({ nodes }: { nodes: ConceptGraphNode[] }) {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const width = 960;
    const height = 520;
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const links = nodes.flatMap((node) =>
      node.prereqs.map((prereq) => ({
        source: nodes.find((item) => item.id === prereq),
        target: node,
      }))
    );

    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("rx", 24)
      .attr("fill", "rgba(3, 10, 24, 0.66)")
      .attr("stroke", "rgba(123, 191, 255, 0.12)");

    svg
      .append("g")
      .selectAll("line")
      .data(links)
      .enter()
      .append("line")
      .attr("x1", (d) => (d.source?.x ?? 0) * width)
      .attr("y1", (d) => (d.source?.y ?? 0) * height)
      .attr("x2", (d) => d.target.x * width)
      .attr("y2", (d) => d.target.y * height)
      .attr("stroke", "rgba(123, 191, 255, 0.18)")
      .attr("stroke-width", 2);

    const group = svg
      .append("g")
      .selectAll("g")
      .data(nodes)
      .enter()
      .append("g")
      .attr("transform", (d) => `translate(${d.x * width}, ${d.y * height})`);

    group
      .append("circle")
      .attr("r", 46)
      .attr("fill", "rgba(98, 168, 255, 0.1)")
      .attr("stroke", "rgba(98, 168, 255, 0.35)");
    group.append("circle").attr("r", 6).attr("fill", "#62a8ff");
    group
      .append("text")
      .attr("text-anchor", "middle")
      .attr("y", -64)
      .attr("fill", "#edf3ff")
      .attr("font-size", 15)
      .attr("font-family", "var(--font-sans)")
      .text((d) => d.label);
    group
      .append("text")
      .attr("text-anchor", "middle")
      .attr("y", 72)
      .attr("fill", "#94a5c6")
      .attr("font-size", 12)
      .attr("font-family", "var(--font-mono)")
      .text((d) => d.description);
  }, [nodes]);

  return (
    <svg ref={ref} className="glass-panel w-full rounded-[var(--radius-lg)]" />
  );
}
