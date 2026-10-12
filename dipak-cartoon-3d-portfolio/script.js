const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));

// Reveal sections as they enter the viewport.
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Make the cartoon lean gently toward the pointer on desktop.
const stage = document.getElementById("characterStage");
const cartoon = document.getElementById("cartoon");
if (window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
  stage.addEventListener("pointermove", event => {
    const rect = stage.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    cartoon.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 5}deg)`;
  });
  stage.addEventListener("pointerleave", () => { cartoon.style.transform = ""; });
}

// Current year in footer and active section navigation.
document.getElementById("year").textContent = new Date().getFullYear();
const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll(".nav a");
const activeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id));
    }
  });
}, { rootMargin: "-35% 0px -55% 0px" });
sections.forEach(section => activeObserver.observe(section));
