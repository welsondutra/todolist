"use strict";

const todoForm = $("#todo-form");

const todoInput = $("#todo-input");
const editForm = $("#edit-form");
const editInput = $("#edit-input");
const cancelEditBtn = $("#cancel-edit-btn");
const removeTaskBtn = $("#remove-task-btn");
const todoList = $("#todo-list");
const tollbar = $("#tollbar");
const searchForm = $("#search-form");
const filterSelect = $("#filter-select");


// Funções

const saveTask = (prop) => {
  //função para salvar no banco de dados
  //atualizar a lista no front
  console.log('save' + prop);
};

const updateTask = (props) => {
  //função para salvar no banco
  //atualizar a lista no front
  console.log("update" + props);
  visibilityElements();
};

const removeTask = (props) => {
  //função para salvar no banco
  //atualizar a lista no front
  console.log('remove' + props);
}

const visibilityElements = () => {
  $(editForm).toggleClass("hide");
  $(todoForm).toggleClass("hide");
  $(todoList).toggleClass("hide");
  $(tollbar).toggleClass("hide");
};

// Eventos 
$(document).ready(() => {
  $(todoForm).submit((e) => {
    e.preventDefault();

    const input = $(todoInput).val();
    if (input) {
      saveTask(input);
    };
  });

  $(editForm).submit((e) => {
    e.preventDefault();

    const input = $(editInput).val();
    if (input) {
      updateTask(input);
    }
  });

  $(cancelEditBtn).click((e) => {
    e.preventDefault();
    console.log(e);
    visibilityElements();
  });

  $(removeTaskBtn).click((e) => {
    e.preventDefault();

    console.log(e);
    visibilityElements();
  });

});


$(document).on("click", (e) => {
  const target = e.target;
  const parent = $(target).closest("div");
  let taskTitle;

  if ($(target).hasClass("done-checkbox")) {
    $(parent).toggleClass("done pending");

    //aqui alterar no banco se ta feito ou não 
  }

  if (parent && $(parent).find("h4").length > 0) {
    taskTitle = $(parent).find("h4").text();
  }

  if ($(target).hasClass("edit-todo")) {
    e.preventDefault();

    visibilityElements();
    editInput.val(taskTitle);
  }
});

const searchValidation = (text, select) => {
  const tasks = $(todoList).find(".todo");

  tasks.each((index, task) => {
    const h4 = $(task).find("h4").first();
    const textH4 = h4.text().toLowerCase();
    const hasText = textH4.includes(text);
    const hasSelect = select === "all" || $(task).hasClass(select);

    if (hasText && hasSelect) {
      $(task).css("display", "flex");
    } else {
      $(task).css("display", "none");
    }
  });
};

searchForm.on("input", function (e) {
  e.preventDefault();

  const text = $(this).val().toLowerCase();
  const select = filterSelect.val().toLowerCase();
  searchValidation(text, select);
});

filterSelect.on("change", function () {
  const text = searchForm.val()?.toLowerCase() || "";
  const select = $(this).val().toLowerCase();

  searchValidation(text, select);
});