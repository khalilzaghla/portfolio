import { ArchitectureNode, ArchitectureEdge } from "@/lib/data/case-studies";
import { 
  Database, 
  Server, 
  Cpu, 
  Monitor, 
  ArrowRight,
  ArrowDown,
  BoxSelect,
  CloudCog
} from "lucide-react";

interface ArchitectureDiagramProps {
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
}

export function ArchitectureDiagram({ nodes, edges }: ArchitectureDiagramProps) {
  // A simple linear/wrap layout for nodes. 
  // For true complex graphs we'd need a canvas or complex SVG.
  // But for these mostly linear pipelines, a flex container with visual nodes works.
  
  const getIcon = (type: string) => {
    switch (type) {
      case "source": return <BoxSelect className="w-5 h-5" />;
      case "processing": return <Server className="w-5 h-5" />;
      case "storage": return <Database className="w-5 h-5" />;
      case "model": return <Cpu className="w-5 h-5" />;
      case "serving": return <CloudCog className="w-5 h-5" />;
      case "client": return <Monitor className="w-5 h-5" />;
      default: return <Server className="w-5 h-5" />;
    }
  };

  const getDomainColor = (domain?: string) => {
    switch (domain) {
      case "cv": return "text-[var(--color-accent-cv)] border-[var(--color-accent-cv)]";
      case "data": return "text-[var(--color-accent-data)] border-[var(--color-accent-data)]";
      case "ai": return "text-[var(--color-accent-genai)] border-[var(--color-accent-genai)]";
      case "system": return "text-[var(--color-accent-system)] border-[var(--color-accent-system)]";
      default: return "text-zinc-400 border-zinc-700 bg-zinc-800/50";
    }
  };

  return (
    <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
      <div className="flex flex-col md:flex-row items-center justify-start gap-4 min-w-max p-4 rounded-xl bg-zinc-900/50 border border-zinc-800">
        {nodes.map((node, index) => {
          // Find if there's an edge from this node to the next one
          const nextNode = nodes[index + 1];
          const edge = nextNode ? edges.find(e => e.from === node.id && e.to === nextNode.id) : null;

          return (
            <div key={node.id} className="flex flex-col md:flex-row items-center gap-4">
              <div className={`flex flex-col items-center justify-center p-4 w-40 h-28 rounded-lg border bg-zinc-950/80 shadow-sm ${getDomainColor(node.domain)} transition-colors duration-300`}>
                <div className="mb-2 p-2 rounded-full bg-zinc-900 border border-zinc-800/50">
                  {getIcon(node.type)}
                </div>
                <span className="text-xs text-center font-medium leading-tight text-zinc-300">
                  {node.label}
                </span>
              </div>
              
              {/* Connector */}
              {index < nodes.length - 1 && (
                <div className="flex flex-col items-center justify-center gap-1 opacity-60">
                  <span className="text-[10px] uppercase tracking-wider text-zinc-500 hidden md:block w-24 text-center">
                    {edge?.label || ""}
                  </span>
                  <ArrowRight className="w-5 h-5 text-zinc-600 hidden md:block" />
                  <ArrowDown className="w-5 h-5 text-zinc-600 block md:hidden my-2" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
