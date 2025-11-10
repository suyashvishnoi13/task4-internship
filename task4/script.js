// Typing animation
const typedName = document.getElementById("typed-name");
if (typedName) {
  const text = "Suyash Vishnoi";
  let i = 0;
  function type() {
    if (i < text.length) {
      typedName.textContent += text.charAt(i);
      i++;
      setTimeout(type, 150);
    }
  }
  type();
}

// Carousel
const images = document.querySelectorAll(".carousel img");
let current = 0;
if (images.length) {
  document.getElementById("next").onclick = () => {
    images[current].classList.remove("active");
    current = (current + 1) % images.length;
    images[current].classList.add("active");
  };
  document.getElementById("prev").onclick = () => {
    images[current].classList.remove("active");
    current = (current - 1 + images.length) % images.length;
    images[current].classList.add("active");
  };
}

// To-Do App
const addTask = document.getElementById("addTask");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

if (addTask && taskInput && taskList) {
  const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = tasks.map((t, i) =>
      `<li>${t}<button onclick="removeTask(${i})">❌</button></li>`
    ).join("");
  };

  window.removeTask = i => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(i, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  };

  addTask.onclick = () => {
    if (taskInput.value.trim()) {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push(taskInput.value.trim());
      localStorage.setItem("tasks", JSON.stringify(tasks));
      taskInput.value = "";
      loadTasks();
    }
  };

  loadTasks();
}

// Products
const productContainer = document.getElementById("productContainer");
if (productContainer) {
  const products = [
    { name: "Laptop", category: "Electronics", price: 800, rating: 4.5, img: "assets/5.jpg" },
    { name: "Headphones", category: "Electronics", price: 120, rating: 4.2, img: "assets/7.jpg" },
    { name: "Book", category: "Education", price: 25, rating: 4.8, img: "assets/6.jpg" },
    { name: "Smartwatch", category: "Gadgets", price: 250, rating: 4.4, img: "assets/8.jpg" }
  ];

  const displayProducts = list => {
    productContainer.innerHTML = list.map(p => `
      <div class="product">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.category}</p>
        <p>💰 $${p.price}</p>
        <p>⭐ ${p.rating}</p>
      </div>
    `).join("");
  };

  const filter = document.getElementById("categoryFilter");
  const sort = document.getElementById("sortFilter");

  const update = () => {
    let list = [...products];
    if (filter.value !== "All") {
      list = list.filter(p => p.category === filter.value);
    }
    if (sort.value === "price") list.sort((a, b) => a.price - b.price);
    if (sort.value === "rating") list.sort((a, b) => b.rating - a.rating);
    displayProducts(list);
  };

  filter.onchange = update;
  sort.onchange = update;
  displayProducts(products);
}
