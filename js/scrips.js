"use strict";

const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEdit = document.querySelector("#cancel-edit-btn");
const todoList = document.querySelector("#todo-list");
const tollbar = document.querySelector("#tollbar");
const searchForm = document.querySelector("#search-form");
const filterSelect = document.querySelector("#filter-select");

const saveTask = (prop) => {
  //função para salvar no banco de dados
  console.log("Inserir:" + prop);
};

const updateTask = (props) => {
  //função para salvar no banco
  //atualizar a lista no db
  console.log("aleterar para isso" + props);
  visibilityElements();
};

const visibilityElements = () => {
  editForm.classList.toggle("hide");
  todoForm.classList.toggle("hide");
  todoList.classList.toggle("hide");
  tollbar.classList.toggle("hide");
};

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const input = todoInput.value;

  if (input) {
    saveTask(input);
  }
});

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = editInput.value;

  if (input) {
    updateTask(e.target);
  }
});

document.addEventListener("click", (e) => {
  const target = e.target;
  const parent = target.closest("div");
  let taskTitle;

  if (target.classList.contains("done-checkbox")) {
    parent.classList.toggle("done");
    parent.classList.toggle("pending");

    //aqui colocar no banco quando ficar pronto
  }

  if (parent && parent.querySelector("h4")) {
    taskTitle = parent.querySelector("h4").innerText;
  }

  if (target.classList.contains("edit-todo")) {
    e.preventDefault();

    visibilityElements();
    editInput.value = taskTitle;
  }
});

cancelEdit.addEventListener("click", (e) => {
  e.preventDefault();

  visibilityElements();
});

const searchValidation = (text, select) => {
  const tasks = todoList.getElementsByClassName("todo");

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const h4 = task.getElementsByTagName("h4")[0];
    const textH4 = h4.textContent.toLowerCase();
    const hasText = textH4.includes(text);
    const hasSelect = select === "all" || task.classList.contains(select);

    if (hasText && hasSelect) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  }
};

searchForm.addEventListener("input", (e) => {
  e.preventDefault();

  const text = e.target.value.toLowerCase();
  const select = filterSelect.value.toLowerCase();
  searchValidation(text, select);
});

filterSelect.addEventListener("change", () => {
  const text = searchForm?.value?.toLowerCase() || "";
  const select = filterSelect.value.toLowerCase();

  searchValidation(text, select);
});
