
const projects = JSON.parse(localStorage.getItem("projects")) || [];

function saveProjects() {
  localStorage.setItem("projects", JSON.stringify(projects));
}

function renderProjects() {
  const container = document.getElementById("projects");
  container.innerHTML = "";
  projects.forEach(proj => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${proj.image}" alt="${proj.title}" />
      <div class="card-content">
        <h3>${proj.title}</h3>
        <p>${proj.description}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

function addProject() {
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const imageInput = document.getElementById("imageInput");

  if (title && description && imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const image = e.target.result;
      projects.push({ title, description, image });
      saveProjects();
      renderProjects();
    };
    reader.readAsDataURL(imageInput.files[0]);

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    imageInput.value = "";
  }
}

function clearProjects() {
  projects.length = 0;
  saveProjects();
  renderProjects();
}

function scrollToGallery() {
  document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("clearBtn").addEventListener("click", clearProjects);
  document.getElementById("year").textContent = new Date().getFullYear();
  renderProjects();
});

// Star animation
const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = Array.from({length: 150}, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  radius: Math.random() * 1.5 + 1,
  dx: (Math.random() - 0.5) * 0.5,
  dy: (Math.random() - 0.5) * 0.5,
  color: `hsl(${Math.random() * 360}, 100%, 70%)`
}));

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = star.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = star.color;
    ctx.fill();
    star.x += star.dx;
    star.y += star.dy;
    if (star.x < 0 || star.x > canvas.width) star.dx *= -1;
    if (star.y < 0 || star.y > canvas.height) star.dy *= -1;
  });
  requestAnimationFrame(drawStars);
}
drawStars();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
