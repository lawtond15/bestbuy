import "./pipeline.css";

export function PipelinePage() {
  const div = document.createElement("div");
  div.className = "pipeline-page"
  div.innerHTML = `
    <h1 class="header">Pipeline</h1>
    <p>Coming soon...</p>
  `;
  return div;
}