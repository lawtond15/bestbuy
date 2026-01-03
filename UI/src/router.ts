import { ListingsPage } from "./pages/listings";
import { PipelinePage } from "./pages/pipeline";

const routes: Record<string, () => HTMLElement> = {
  "/": ListingsPage,
  "/pipeline": PipelinePage
};

export function router() {
  const app = document.getElementById("app")!;
  const path = window.location.pathname;
  const page = routes[path] ?? ListingsPage;

    console.log("Routing to:", path, page.name);

  app.innerHTML = "";
  app.appendChild(page());
}
