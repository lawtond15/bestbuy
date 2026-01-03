import { router } from "./router";

document.addEventListener("click", e => {
  const target = e.target as HTMLAnchorElement;
  if (target.matches("[data-link]")) {
    e.preventDefault();
    history.pushState(null, "", target.href);
    router();
  }
});

window.addEventListener("popstate", router);

router(); // initial load
