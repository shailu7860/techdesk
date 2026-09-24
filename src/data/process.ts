export type Stage = { code: string; name: string; objective: string; activities: string[]; deliverables: string[] };

export const process: Stage[] = [
  {
    code: "01",
    name: "Discover",
    objective: "Understand the business problem before anyone writes code.",
    activities: [
      "Call or workshop with the people who feel the problem",
      "Map the current workflow",
      "Agree what success looks like",
    ],
    deliverables: ["Problem statement", "Success criteria"],
  },
  {
    code: "02",
    name: "Define",
    objective: "Turn the problem into a scope you can budget for.",
    activities: ["Prioritise features", "Choose the architecture", "Estimate effort and risk"],
    deliverables: ["Written scope", "Price range and timeline"],
  },
  {
    code: "03",
    name: "Design",
    objective: "Make the product clear before it is built.",
    activities: ["User flows", "Interface design", "Clickable prototype"],
    deliverables: ["Approved designs", "Design system"],
  },
  {
    code: "04",
    name: "Engineer",
    objective: "Build it properly, in small working increments.",
    activities: ["Weekly demo builds", "Code review", "Security by default"],
    deliverables: ["Working software every week", "Repository access from day one"],
  },
  {
    code: "05",
    name: "Test",
    objective: "Prove it works before your customers do.",
    activities: ["Automated tests", "Accessibility and performance checks", "User acceptance testing"],
    deliverables: ["Test report", "Fixed issues"],
  },
  {
    code: "06",
    name: "Deploy",
    objective: "Ship to production safely.",
    activities: ["Infrastructure setup", "Monitoring and alerts", "Launch checklist"],
    deliverables: ["Live system", "Runbook and handover"],
  },
  {
    code: "07",
    name: "Evolve",
    objective: "Keep improving once real users arrive.",
    activities: ["Usage analysis", "Iterations", "Support and maintenance"],
    deliverables: ["Roadmap", "Ongoing releases"],
  },
];
