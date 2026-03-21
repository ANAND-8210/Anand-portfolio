// Run after DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {

  // ================================
  // 🔹 Smooth Scroll to Projects
  // ================================
  window.scrollToProjects = function () {
    const section = document.getElementById("projects");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };


  // ================================
  // 🔹 Background Image Reveal Effect
  // ================================
  const layer1 = document.getElementById("layer1");
  const layer2 = document.getElementById("layer2");

  const images = ["back1.jpg", "back4.jpg", "back3.jpg", "back2.jpg"];

  let index = 0;
  let activeLayer = 1;

  if (layer1 && layer2) {

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
    }, 3000);
  }


  // ================================
  // 🔹 Mouse Reveal Effect (Optimized)
  // ================================
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateMask() {
    if (layer1 && layer2) {
      const mask = `radial-gradient(circle 120px at ${mouseX}px ${mouseY}px, transparent 0%, black 100%)`;

      layer1.style.maskImage = mask;
      layer2.style.maskImage = mask;

      layer1.style.webkitMaskImage = mask;
      layer2.style.webkitMaskImage = mask;
    }

    requestAnimationFrame(animateMask);
  }

  animateMask();


  // ================================
  // 🔹 3D Card Hover Effect
  // ================================
  const cards = document.querySelectorAll(".project-card, .skill-card");

  cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = -(y - rect.height / 2) / 12;
      const rotateY = (x - rect.width / 2) / 12;

      card.style.transform = `
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(1.05)
      `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "rotateX(0) rotateY(0) scale(1)";
    });

  });


  // ================================
  // 🔹 Smooth Navbar Scroll
  // ================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });

});