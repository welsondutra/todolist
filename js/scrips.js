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

const service = '/php/service.php';
let taskEdit;
let tempEdit;

// Funções

const searchValidation = (text, select) => {
  const tasks = $(todoList).find(".todo");

  tasks.each((_, task) => {
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

const saveTask = (prop) => {
  try {
    $.ajax({
      url: service,
      type: 'POST',
      data: { action: 'create', task: prop },
      success: (response) => {
        alert(response);
      },
      error: (xhr) => {
        console.log(xhr.responseText);
      }
    });

    location.reload();
  } catch (error) {
    alert(error);
  }
};

const updateTask = (props) => {
  try {
    $.ajax({
      url: service,
      type: 'POST',
      data: { action: 'update', ...props },
      error: (xhr) => {
        console.log(xhr.responseText);
      }
    });
  } catch (error) {
    alert(error);
  }
};

const removeTask = (props) => {
  try {
    $.ajax({
      url: service,
      type: 'POST',
      data: { action: 'delete', id: props },

      success: (response) => {
        alert(response);
        location.reload(true);
      },
      error: (xhr) => {
        console.log(xhr.responseText);
      }
    });
  } catch (error) {
    alert(error);
  }
};

const visibilityElements = () => {
  $(editForm).toggleClass("hide");
  $(todoForm).toggleClass("hide");
  $(todoList).toggleClass("hide");
  $(tollbar).toggleClass("hide");
};

$(document).ready(() => {
  $.ajax({
    url: '/php/service.php',
    type: 'GET',
    data: { action: 'read' },
    success: (response) => {
      $(todoList).html(response);
    },
    error: function (xhr) {
      console.log(xhr.responseText);
    }
  });

  $(todoForm).submit((e) => {
    e.preventDefault();

    const input = $(todoInput).val();
    if (input) {
      saveTask(input);
    }
  });

  $(editForm).submit((e) => {
    e.preventDefault();

    const input = $(editInput).val();
    if (input) {
      updateTask({ id: tempEdit, task: input });
      location.reload(true);
    } else {
      alert("Campo vazio, favor digite uma tarefa!");
    }
  });

  $(cancelEditBtn).click((e) => {
    e.preventDefault();

    visibilityElements();
  });

  $(removeTaskBtn).click((e) => {
    e.preventDefault();

    removeTask($(taskEdit).find('input').attr('id'));
  });
});

$(document).on("click", (e) => {
  const target = e.target;
  taskEdit = $(target).closest("div");
  let taskTitle;

  if (taskEdit && $(taskEdit).find("h4").length > 0) {
    taskTitle = $(taskEdit).find("h4").text().trim();
  }

  if ($(target).hasClass("done-checkbox")) {
    $(taskEdit).toggleClass("done pending");
    const id = $(taskEdit).find('input').attr('id');
    const is_completed = $(taskEdit).attr('class').includes('done') ? 1 : 0;

    updateTask({ id, is_completed, task: taskTitle });
  }

  if ($(target).hasClass("edit-todo")) {
    e.preventDefault();

    tempEdit = $(taskEdit).find('input').attr('id');

    visibilityElements();
    editInput.val(taskTitle);
  }
});

searchForm.on("input", function (e) {
  e.preventDefault();

  const text = e.target.value.toLowerCase();
  const select = filterSelect.val().toLowerCase();
  searchValidation(text, select);
});

filterSelect.on("change", function () {
  const text = searchForm.val()?.toLowerCase() || "";
  const select = $(this).val
    ().toLowerCase();

  searchValidation(text, select);
});