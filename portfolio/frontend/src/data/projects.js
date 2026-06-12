// MCP Portfolio — Project Data (Config-Driven)
// Tambah project baru = tambah 1 objek dalam array ni je.
// Tak perlu sentuh JSX langsung.

const projects = [
  {
    id: 1,
    title: "Serverless Portfolio",
    icon: "globe",
    tags: ["AWS", "Lambda", "CloudFront", "DynamoDB"],
    description: "Full serverless architecture with zero EC2. S3 static hosting + CloudFront CDN + Lambda API + DynamoDB. 99.99% uptime, RM0/month cost.",
    repoUrl: "#",  // TODO: isi bila dah buat repo
    changelog: "v1.0 — Initial deploy\nFull stack: React frontend + Node.js Lambda + DynamoDB\n6 CloudWatch alarms + SNS email alerts\nWeekly backup to S3 via Lambda scheduler\nCost: RM0/month (AWS Free Tier)",
    architecture: "CloudFront CDN\n├── S3 Bucket (React static)\n└── API Gateway (REST)\n    └── Lambda (Node.js)\n        └── DynamoDB (NoSQL)\n\nBackup: EventBridge → Lambda → S3\nMonitoring: 6 CloudWatch Alarms → SNS → Email",
    extra: "terminal"
  },
  {
    id: 2,
    title: "AgentQ Pipeline",
    icon: "zap",
    tags: ["LangGraph", "OpenTofu", "Checkov", "Trivy"],
    description: "Multi-agent AI deployment pipeline. 7 specialist agents, config-driven YAML, real security scanning. Reduced deployment time by 60%.",
    repoUrl: "#",
    changelog: "v2.1 — Self-improve agent added\nv2.0 — Config-driven refactor (YAML only)\nv1.0 — Initial 7-agent pipeline\nAgents: requirement → iac → security → deployer → cost → reporting → self_improve",
    architecture: "requirements.txt\n    ↓\nrequirement agent → spec.yaml\n    ↓\niac agent → main.tf, variables.tf, ...\n    ↓\nsecurity agent → Checkov + Trivy\n    ├── PASS → deployer → cost → report\n    └── FAIL → debug → loop back\n    ↓\nreporting → client_report.md",
    extra: "uptime"
  },
  {
    id: 3,
    title: "Nexus Knowledge Base",
    icon: "book",
    tags: ["Markdown", "AI", "Self-Improving"],
    description: "Self-growing knowledge center. 53+ documented patterns across AWS, Linux, Security. Auto-saves new knowledge from every pipeline run.",
    repoUrl: "#",
    changelog: "v1.0 — Initial 53 patterns\nCategories: AWS (19), OpenTofu (8), Linux (10), Security (8), Agent (5), General (3)\nAuto-save from self_improve agent\nTemplate: format-nota-agent.md (6 sections)",
    architecture: "knowledge-center/\n├── knowledge-base/\n│   ├── aws/        (19 patterns)\n│   ├── opentofu/    (8 patterns)\n│   ├── linux/       (10 patterns)\n│   ├── security/     (8 patterns)\n│   └── agent/        (5 patterns)\n├── prompts/         (Agent prompts)\n└── index.md         (Search index)\n\nSelf-improve: pipeline run → save new pattern → KB grows",
    extra: null
  },
  {
    id: 4,
    title: "Cybersecurity Dashboard",
    icon: "shield",
    tags: ["FastAPI", "React", "SAST"],
    description: "Real-time threat monitoring dashboard. Checkov + Trivy integration. Live security scoring with remediation suggestions.",
    repoUrl: "#",
    changelog: "v1.0 — Initial build\nFastAPI backend + React frontend\nCheckov IaC scanning + Trivy container scanning\nLive security score dashboard\nRemediation suggestion engine",
    architecture: "React Dashboard\n    ↓\nFastAPI Backend\n    ├── Checkov (IaC scanner)\n    ├── Trivy (Container scanner)\n    └── Custom Rules Engine\n    ↓\nSecurity Score API\n    ├── /api/scan → Run scans\n    ├── /api/score → Get score\n    └── /api/remediate → Suggestions",
    extra: "uptime"
  }
];

export default projects;
