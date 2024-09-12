import about from "./views/about.js";
import educations from "./views/educations.js";
import projects from "./views/projects.js";
import destinations from "./views/destinations.js";

const routes = {
  "#/": { title: "Joakim Chan Online CV", render: about },
  "#/educations": { title: "Educations", render: educations },
  "#/projects": { title: "Projects", render: projects },
  "#/destinations": { title: "Destinations", render: destinations }
};

async function router() {
  let view = routes[location.hash] || routes["#/"];
  document.title = view.title;
  app.innerHTML = await view.render();
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