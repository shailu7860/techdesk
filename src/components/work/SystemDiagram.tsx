/**
 * Architecture as a connected chain of nodes: the "visual" for case studies until
 * screenshots arrive, and a real explanation of how the system fits together.
 */
export function SystemDiagram({
  nodes,
  tone = "signal",
}: {
  nodes: { node: string; role: string }[];
  tone?: "signal" | "agent";
}) {
  const dot = tone === "agent" ? "bg-agent" : "bg-signal";
  return (
    <ol className="relative grid gap-0 border-l border-hairline md:grid-flow-col md:auto-cols-fr md:border-t md:border-l-0">
      {nodes.map((n, i) => (
        <li key={n.node} className="relative pb-8 pl-6 last:pb-0 md:pt-6 md:pr-6 md:pb-0 md:pl-0">
          <span
            aria-hidden="true"
            className={`absolute top-1.5 -left-[5px] size-[9px] rounded-full ${dot} md:-top-[5px] md:left-0`}
          />
          <p className="font-mono text-label text-muted">{String(i + 1).padStart(2, "0")}</p>
          <p className="mt-1 font-medium text-ink">{n.node}</p>
          <p className="mt-1 text-small text-muted">{n.role}</p>
        </li>
      ))}
    </ol>
  );
}
