/* Scroll */
function scrollToProjects() {
  document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
}

/* Smooth Background Fade + Reveal */
const layer1 = document.getElementById("layer1");
const layer2 = document.getElementById("layer2");

const images = ["back1.jpg", "back4.jpg", "back3.jpg", "back2.jpg"];

let index = 0;
let activeLayer = 1;

layer1.style.backgroundImage = `url(${images[0]})`;
layer2.style.opacity = 0;

setInterval(() => {
  index = (index + 1) % images.length;

  if (activeLayer === 1) {
    layer2.style.backgroundImage = `url(${images[index]})`;
    layer2.style.opacity = 1;
    layer1.style.opacity = 0;
    activeLayer = 2;
  } else {
    layer1.style.backgroundImage = `url(${images[index]})`;
    layer1.style.opacity = 1;
    layer2.style.opacity = 0;
    activeLayer = 1;
  }
}, 2500);

/* Mouse Reveal */
document.addEventListener("mousemove", (e) => {
  const x = e.clientX;
  const y = e.clientY;

  const mask = `radial-gradient(circle 120px at ${x}px ${y}px, transparent 0%, black 100%)`;

  layer1.style.maskImage = mask;
  layer2.style.maskImage = mask;

  layer1.style.webkitMaskImage = mask;
  layer2.style.webkitMaskImage = mask;
});

/* 3D Card */
const cards = document.querySelectorAll(".project-card, .skill-card");

cards.forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = -(y - rect.height / 2) / 10;
    const rotateY = (x - rect.width / 2) / 10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0)";
  });
});