import about from "./views/about.js";
import projects from "./views/projects.js";

const routes = {
  "/": { title: "About", render: about },
  "/projects": { title: "Projects", render: projects }
};

function router() {
  let view = routes[location.pathname];

  if (view) {
    document.title = view.title;
    app.innerHTML = view.render();
  } else {
    history.replaceState("", "", "/");
    router();
  }
};

window.addEventListener("click", e => {
  if (e.target.matches("[data-link]")) {
    e.preventDefault();
    history.pushState("", "", e.target.href);
    router();
  }
});

window.router = router;

window.addEventListener("popstate", router);
window.addEventListener("DOMContentLoaded", router);

document.addEventListener("DOMContentLoaded", function () {
  var navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      navLinks.forEach(function (link) {
        link.classList.remove("active");
      });
      this.classList.add("active");
    });
  });
});
