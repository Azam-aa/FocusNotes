let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

document.getElementById("theme-toggle").onclick = () => {
  document.body.classList.toggle("dark");
};

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("task-input");
  const tag = document.getElementById("tag").value;
  const priority = document.getElementById("priority").value;

  if (input.value.trim() === "") return;

  tasks.push({
    text: input.value,
    tag: tag.trim(),
    priority: priority,
    id: Date.now()
  });

  input.value = "";
  document.getElementById("tag").value = "";
  displayTasks();
  saveTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  displayTasks();
  saveTasks();
}

function searchTasks() {
  const query = document.getElementById("search").value.toLowerCase();
  displayTasks(query);
}

function displayTasks(filter = "") {
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  tasks
    .filter(task => 
      task.text.toLowerCase().includes(filter) ||
      task.tag.toLowerCase().includes(filter)
    )
    .forEach(task => {
      const li = document.createElement("li");
      li.className = "task";
      li.innerHTML = `
        <span>${task.text} <span class="tag">${task.tag}</span> - <strong>${task.priority}</strong></span>
        <button onclick="deleteTask(${task.id})">❌</button>
      `;
      list.appendChild(li);
    });
}

displayTasks();
