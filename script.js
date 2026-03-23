document.addEventListener("DOMContentLoaded", () => {
  document.body.style.transition = "background 0.5s ease";

  window.scrollToProjects = function () {
    const section = document.getElementById("projects");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const texts = [
    "Creative Developer",
    "Visual Storyteller",
    "UI Builder"
  ];

  let textIndex = 0;
  let charIndex = 0;
  let currentText = "";
  let isDeleting = false;

  function typingEffect() {
    const typing = document.getElementById("typing");
    if (!typing) return;

    if (!isDeleting && charIndex <= texts[textIndex].length) {
      currentText = texts[textIndex].substring(0, charIndex++);
    } else if (isDeleting && charIndex >= 0) {
      currentText = texts[textIndex].substring(0, charIndex--);
    }

    typing.textContent = currentText;

    if (charIndex === texts[textIndex].length) {
      isDeleting = true;
      setTimeout(typingEffect, 1200);
      return;
    }

    if (charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }

    setTimeout(typingEffect, isDeleting ? 55 : 95);
  }

  typingEffect();

  const slides = document.querySelectorAll(".slide");
  let slideIndex = 0;

  if (slides.length > 0) {
    setInterval(() => {
      slides[slideIndex].classList.remove("active");
      slideIndex = (slideIndex + 1) % slides.length;
      slides[slideIndex].classList.add("active");
    }, window.innerWidth < 768 ? 5000 : 3200);
  }

  const aboutPopup = document.getElementById("aboutPopup");

  function openAboutPopup() {
    if (!aboutPopup) return;

    aboutPopup.classList.add("show");
    aboutPopup.setAttribute("aria-hidden", "false");
    document.body.classList.add("popup-open");
  }

  function closeAboutPopup() {
    if (!aboutPopup) return;

    aboutPopup.classList.remove("show");
    aboutPopup.setAttribute("aria-hidden", "true");
    document.body.classList.remove("popup-open");
  }

  window.openAbout = openAboutPopup;
  window.closeAbout = closeAboutPopup;

  if (aboutPopup) {
    aboutPopup.addEventListener("click", (e) => {
      if (e.target === aboutPopup) {
        closeAboutPopup();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && aboutPopup && aboutPopup.classList.contains("show")) {
      closeAboutPopup();
    }
  });

  const revealItems = document.querySelectorAll(".reveal-card");

  revealItems.forEach((item, index) => {
    item.style.setProperty("--delay", `${index * 0.08}s`);
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

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

  const cards = document.querySelectorAll(".project-card, .skill-card, .profile-card");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = -(y - rect.height / 2) / 14;
      const rotateY = (x - rect.width / 2) / 14;

      card.style.transform = `
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-6px)
      `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
