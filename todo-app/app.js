const STORAGE_KEY = "lab12-todos";

const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const list = document.querySelector("#todo-list");
const template = document.querySelector("#todo-template");
const emptyState = document.querySelector("#empty-state");
const taskCount = document.querySelector("#task-count");
const completeCount = document.querySelector("#complete-count");
const clearCompletedButton = document.querySelector("#clear-completed");
const dateElement = document.querySelector("#date");

let todos = loadTodos();

dateElement.textContent = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "long",
  day: "numeric",
  weekday: "long",
}).format(new Date());

function loadTodos() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function renderTodos() {
  list.replaceChildren();

  todos.forEach((todo) => {
    const item = template.content.firstElementChild.cloneNode(true);
    item.dataset.id = todo.id;
    item.classList.toggle("completed", todo.completed);
    item.querySelector(".task-text").textContent = todo.text;
    list.append(item);
  });

  const remaining = todos.filter((todo) => !todo.completed).length;
  const completed = todos.length - remaining;
  taskCount.textContent = `${remaining} 项待完成`;
  completeCount.textContent = `已完成 ${completed} 项`;
  emptyState.hidden = todos.length > 0;
  clearCompletedButton.disabled = completed === 0;
}

function updateTodos(nextTodos) {
  todos = nextTodos;
  saveTodos();
  renderTodos();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();

  if (!text) return;

  updateTodos([
    ...todos,
    { id: crypto.randomUUID(), text, completed: false },
  ]);
  form.reset();
  input.focus();
});

list.addEventListener("click", (event) => {
  const item = event.target.closest("li");
  if (!item) return;

  if (event.target.closest(".check-button")) {
    updateTodos(
      todos.map((todo) =>
        todo.id === item.dataset.id
          ? { ...todo, completed: !todo.completed }
          : todo,
      ),
    );
  }

  if (event.target.closest(".delete-button")) {
    updateTodos(todos.filter((todo) => todo.id !== item.dataset.id));
  }
});

clearCompletedButton.addEventListener("click", () => {
  updateTodos(todos.filter((todo) => !todo.completed));
});

renderTodos();
