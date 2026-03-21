// ================================
// 🔹 Run After Page Load
// ================================
document.addEventListener("DOMContentLoaded", () => {

  // 🔥 Smooth feel
  document.body.style.transition = "background 0.5s ease";

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
  // 🔹 Typing Effect
  // ================================
  const texts = [
    "Creative Developer 💻",
    "Video Artist 🎬",
    "UI Designer 🎨"
  ];

  let i = 0, j = 0;
  let currentText = "";
  let isDeleting = false;

  function typingEffect() {
    const typing = document.getElementById("typing");
    if (!typing) return;

    if (!isDeleting && j <= texts[i].length) {
      currentText = texts[i].substring(0, j++);
    } else if (isDeleting && j >= 0) {
      currentText = texts[i].substring(0, j--);
    }

    typing.innerHTML = currentText;

    if (j === texts[i].length) {
      isDeleting = true;
      setTimeout(typingEffect, 1000);
      return;
    }

    if (j === 0) {
      isDeleting = false;
      i = (i + 1) % texts.length;
    }

    setTimeout(typingEffect, isDeleting ? 50 : 100);
  }

  typingEffect();

  // ================================
  // 🔥 BACKGROUND SLIDER (FIXED)
  // ================================
  const slides = document.querySelectorAll(".slide");
  let index = 0;

  if (slides.length > 0) {
    setInterval(() => {
      slides[index].classList.remove("active");
      index = (index + 1) % slides.length;
      slides[index].classList.add("active");
    }, window.innerWidth < 768 ? 5000 : 3000);
  }

  // ================================
  // 🔹 Mouse Reveal Effect (SAFE)
  // ================================
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateMask() {
    const layer1 = document.getElementById("layer1");
    const layer2 = document.getElementById("layer2");

    if (layer1 && layer2 && window.innerWidth > 768) {

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

      const rotateX = -(y - rect.height / 2) / 10;
      const rotateY = (x - rect.width / 2) / 10;

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
  // 🔹 Navbar Smooth Scroll
  // ================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

});