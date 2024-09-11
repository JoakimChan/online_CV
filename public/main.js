import about from "./views/about.js";
import education from "./views/education.js";
import projects from "./views/projects.js";

const routes = {
  "#/": { title: "About", render: about },
  "#/education": { title: "Education", render: education },
  "#/projects": { title: "Projects", render: projects }
};

function router() {
  let view = routes[location.hash] || routes["#/"];
  document.title = view.title;
  app.innerHTML = view.render();
}

window.addEventListener("click", e => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    const href = e.target.getAttribute('href');
    location.hash = href;
  }
});

window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", router);