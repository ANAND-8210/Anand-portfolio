document.addEventListener("DOMContentLoaded", () => {

  // 🔹 Smooth Scroll Button
  window.scrollToProjects = function () {
    document.getElementById("projects").scrollIntoView({
      behavior: "smooth"
    });
  };

  // 🔹 Typing Effect
  const text = ["Creative Developer 💻", "Video Artist 🎬", "UI Designer 🎨"];
  let i = 0, j = 0;
  let currentText = "";
  let isDeleting = false;

  function type() {
    const typing = document.getElementById("typing");

    if (!typing) return;

    if (i < text.length) {
      if (!isDeleting && j <= text[i].length) {
        currentText = text[i].substring(0, j++);
      } else if (isDeleting && j >= 0) {
        currentText = text[i].substring(0, j--);
      }

      typing.innerHTML = currentText;

      if (j === text[i].length) isDeleting = true;
      if (j === 0) {
        isDeleting = false;
        i = (i + 1) % text.length;
      }
    }

    setTimeout(type, isDeleting ? 50 : 100);
  }

  type();

  // 🔹 Background Reveal
  const layer1 = document.getElementById("layer1");
  const layer2 = document.getElementById("layer2");

  const images = ["back1.jpg", "back2.jpg", "back3.jpg", "back4.jpg"];

  let index = 0;
  let active = 1;

  if (layer1 && layer2) {
    layer1.style.backgroundImage = `url(${images[0]})`;

    setInterval(() => {
      index = (index + 1) % images.length;

      if (active === 1) {
        layer2.style.backgroundImage = `url(${images[index]})`;
        layer2.style.opacity = 1;
        layer1.style.opacity = 0;
        active = 2;
      } else {
        layer1.style.backgroundImage = `url(${images[index]})`;
        layer1.style.opacity = 1;
        layer2.style.opacity = 0;
        active = 1;
      }
    }, 4000);
  }

  // 🔹 3D Card Effect
  document.querySelectorAll(".project-card, .skill-card").forEach(card => {

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
      card.style.transform = "rotateX(0) rotateY(0)";
    });

  });

});