import path from "path";

const templates = {
  Careers: path.resolve("./src/templates/career.tsx"),
  Leadership: path.resolve("./src/templates/leadership.tsx"),
  Insights: path.resolve("./src/templates/resources.tsx"),
  Contact: path.resolve("./src/templates/contact.tsx"),
  EventRegistration: path.resolve("./src/templates/event-registration.tsx"),
  DownloadableResource: path.resolve(
    "./src/templates/downloadable-resource.tsx",
  ),
  CaseStudy: path.resolve("./src/templates/case-study.tsx"),
  Blog: path.resolve("./src/templates/blog.tsx"),
  "Demo Page": path.resolve("./src/templates/demo-book/demoBook.template.tsx"),
  DTPChat: path.resolve("./src/templates/dtpChat/dtpChat.tsx"),
  ROI: path.resolve("./src/templates/roi/roi.tsx"),
  Default: path.resolve("./src/templates/page.tsx"),
} as const; // Mark the object as a constant so TypeScript can infer a narrower type

export type TemplateKey = keyof typeof templates;

export const templateFactory = (key: TemplateKey) =>
  templates[key] || templates.Default;
