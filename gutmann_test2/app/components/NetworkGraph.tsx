"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Customer } from "../lib/customers";

type Props = {
  customers: Customer[];
  onSelect: (customer: Customer) => void;
};

type Node = Customer & {
  x: number;
  y: number;
};

type Link = {
  source: Node;
  target: Node;
};

export default function NetworkGraph({ customers, onSelect }: Props) {
  const [graph, setGraph] = useState<{ nodes: Node[]; links: Link[] }>({
    nodes: [],
    links: [],
  });
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const initialized = useRef(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const gRef = useRef<SVGGElement>(null);
  const childCountMap = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    if (!initialized.current) {
      const initialNodes: Node[] = customers.map((cust) => ({
        ...cust,
        x: Math.random() * 800,
        y: Math.random() * 600,
      }));

      const nodeMap = new Map(initialNodes.map((n) => [n.id, n]));

      const initialLinks: Link[] = customers
        .filter((c) => c.referredBy)
        .map((c) => ({
          source: nodeMap.get(c.referredBy!)!,
          target: nodeMap.get(c.id)!,
        }));

      const sim = d3
        .forceSimulation(initialNodes as any)
        .force("link", d3.forceLink(initialLinks).distance(100).strength(1))
        .force("charge", d3.forceManyBody().strength(-150))
        .force("center", d3.forceCenter(600, 400))
        .force("collide", d3.forceCollide().radius(50).iterations(10))
        .stop();

      for (let i = 0; i < 600; i++) sim.tick();

      setGraph({ nodes: initialNodes, links: initialLinks });
      initialized.current = true;
    } else {
      setGraph((prevGraph) => {
        const existingIds = new Set(prevGraph.nodes.map((n) => n.id));
        const newCustomers = customers.filter((c) => !existingIds.has(c.id));
        if (newCustomers.length === 0) return prevGraph;

        const newNodes: Node[] = [];
        const newLinks: Link[] = [];
        const allNodes = [...prevGraph.nodes];

        newCustomers.forEach((cust) => {
          let x = Math.random() * 1000;
          let y = Math.random() * 700;
          const parent = allNodes.find((n) => n.id === cust.referredBy);

          if (parent) {
            const siblings = childCountMap.current.get(parent.id) || 0;
            const totalSiblings = siblings + 1;
            const radius = 100 + totalSiblings * 5; // dynamischer Radius
            const angle = ((siblings % totalSiblings) / totalSiblings) * 2 * Math.PI + Math.random() * 0.3; // etwas zufällig

            childCountMap.current.set(parent.id, siblings + 1);

            x = parent.x + radius * Math.cos(angle);
            y = parent.y + radius * Math.sin(angle);
          }

          const newNode: Node = { ...cust, x, y };
          newNodes.push(newNode);
          allNodes.push(newNode);

          if (parent) {
            newLinks.push({ source: parent, target: newNode });
          }
        });

        return {
          nodes: allNodes,
          links: [...prevGraph.links, ...newLinks],
        };
      });
    }
  }, [customers]);

  // Zoom Setup
  useEffect(() => {
    if (!svgRef.current || !gRef.current) return;
    const zoom = d3.zoom<SVGSVGElement, unknown>().on("zoom", (event) => {
      d3.select(gRef.current).attr("transform", event.transform);
    });
    d3.select(svgRef.current).call(zoom);
  }, []);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 1200 800"
      style={{ backgroundColor: "#f8f3ee" }}
    >
      <g ref={gRef}>
        {/* Verbindungen */}
        {graph.links.map((link, idx) => (
          <line
            key={idx}
            x1={link.source.x}
            y1={link.source.y}
            x2={link.target.x}
            y2={link.target.y}
            stroke="#0d2f1d"
            strokeWidth={1.5}
          />
        ))}

        {/* Knoten */}
        {graph.nodes.map((node) => (
          <g
            key={node.id}
            onClick={() => {
              setSelectedNodeId(node.id);
              onSelect(node);
            }}
            className="cursor-pointer"
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={12}
              fill={node.id === selectedNodeId ? "#4ade80" : "#fff"}
              stroke="#0d2f1d"
              strokeWidth={2}
            />
            <text
              x={node.x}
              y={node.y - 16}
              textAnchor="middle"
              fontSize={10}
              fill="#0d2f1d"
            >
              {node.firstName} {node.lastName}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
