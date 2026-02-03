import { ListingsPage } from "./pages/listings";
import { PipelinePage } from "./pages/pipeline";

const routes: Record<string, () => HTMLElement> = {
  "/": ListingsPage,
  "/pipeline": PipelinePage
};

export function router() {
  const app = document.getElementById("app")!;

  let path = window.location.pathname;

  // normalize trailing slash
  if (path.length > 1 && path.endsWith("/")) {
    path = path.slice(0, -1);
  }

  const page = routes[path] ?? ListingsPage;

  console.log("Routing to:", path, page.name);

  app.innerHTML = "";
  app.appendChild(page());
}

