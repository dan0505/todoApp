$(document).ready(function() {
  // select elements
  const clearButton = $("#clearButton");
  const dateDisplay = $("#date");
  const list = $("#todo-list");
  const tryAddButton = $("#try-add");
  const contentElement = $("#content");

  const today = new Date();
  // variables
  let todoList = new Object();
  let id = 0;

  // get item from localStorage
  let todoData = localStorage.getItem("TODO");

  if (todoData) {
    todoListTmp = JSON.parse(todoData);
    console.log(todoListTmp);
    for (item in todoListTmp) {
      console.log(item);
      console.log(todoListTmp[item].name);
      addToDo(todoListTmp[item].name, todoListTmp[item].done);
    }
  }

  // clear the local storage
  clearButton.click(function() {
    if (confirm("Confirm to clear all memory!")) {
      localStorage.clear();
      location.reload();
    }
  });

  // Show todays date
  const options = {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric"
  };

  console.log(today);
  dateDisplay.text(today.toLocaleDateString("en-GB", options));

  function createElement(toDo, id, done) {
    // creat the item li
    const liItem = $("<li></li>");
    const checkboxInput = $('<input type="checkbox"></input>');
    checkboxInput.attr("id", id);
    checkboxInput.attr("value", toDo);
    checkboxInput.prop("checked", done);
    const checkboxLabel = $("<label></label>");
    checkboxLabel.attr("for", id);
    checkboxLabel.text(toDo);
    const itemModify = $('<i class="fa fa-trash-o" aria-hidden="true"></i>');
    const itemTrash = $('<i class="fa fa-pencil" aria-hidden="true"></i>');

    // append all children
    liItem.append(checkboxInput, checkboxLabel, itemModify, itemTrash);
    return liItem
  }

  // add to do function
  function addToDo(toDo, done = false, dueDate = today) {
    todoList[id] = {
      name: toDo,
      done: done,
      dueDate: dueDate
    };
    // add item to todo list display
    list.append(createElement(toDo, id, done));
    // add item to localstorage ( this code must be added where the todoList array is updated)
    localStorage.setItem("TODO", JSON.stringify(todoList));
    id++;
  }

  

  //---------------------------------------------
  // add an item to the list user the enter key or press the plus button

  // addButton.click(function() {
  //   const toDo = input.val();
  //   // if the input isn't empty
  //   if (toDo) {
  //     addToDo(toDo);
  //   }
  //   input.val("");
  // });
  // $(addButton).on("click", )

  tryAddButton.click(function() {
    contentElement.append(
      `<form id="last-todo-form">
      <input type="text" id="todo-input" name="todo" value="new-todo" placeholder="Add a to-do" />
      <button type="submit"><i class="fa fa-check" aria-hidden="true" ></i>
      Update</button>
    </form>`
    );
  });

  $(document).on("submit", "#last-todo-form", function() {
    console.log("submitted!");
    // do your things
    const toDo = $("#todo-input").val();
    console.log(toDo);
    // if the input isn't empty
    if (toDo) {
      console.log("add", toDo);
      addToDo(toDo);
    }
    $("#last-todo-form").remove();
    return false;
  });

  // remove to do
  $("ul").on("click", "i.fa-trash-o", function() {
    const idToDelete = $(this)
      .siblings("input")
      .attr("id");
    delete todoList[idToDelete];
    localStorage.setItem("TODO", JSON.stringify(todoList));
    $(this)
      .parent()
      .remove();
  });

  // tougle and save complete status
  $("ul").on("click", "input[type=checkbox]", function() {
    $(this).prop("checked", $(this).prop("checked"));
    todoList[$(this).attr("id")].done = $(this).prop("checked");
    localStorage.setItem("TODO", JSON.stringify(todoList));
  });

  // modidy list
  $("ul").on("click", "i.fa-pencil", function() {
    const idToModify = $(this)
      .siblings("input")
      .attr("id");
    console.log(idToModify);
    const origText = $(`label[for="${idToModify}"]`).text();
    $(`label[for="${idToModify}"]`)
      .siblings("i.fa-pencil")
      .remove();
    const inputElement = $(`<input type="text" class="modify"></input>`);
    $(`label[for="${idToModify}"]`).replaceWith(
      `<input type="text" class="modify" value="${origText}"></input>
       <button type="button" class="modify">
         <i class="fa fa-check" aria-hidden="true" ></i>
         Update
       </button>`
    );
    console.log($("input.modify"));
  });

  $("ul").on("blur", "input.modify", function() {
    console.log("trigered!");
    $("button.modify").trigger("click");
  });

  // $("ul").on("keypress", "input.modify", function() {
  //   if (event.keyCode == 13) {
  //     console.log("triger2")
  //     $("button.modify").trigger("click");
  //   }
  // });

  $("ul").on("click", "button.modify", function() {
    console.log(this);
    const newValue = $(this)
      .siblings("input[type=text]")
      .val();
    const thisID = $(this)
      .siblings("input[type=checkbox]")
      .attr("id");
    $(this).before($(`<label for="${thisID}">${newValue}</label>`));
    $(this)
      .parent()
      .append($('<i class="fa fa-pencil" aria-hidden="true"></i>'));
    $(this)
      .siblings("input[type=text]")
      .remove();
    $(this).remove();
    todoList[thisID].name = newValue;
    localStorage.setItem("TODO", JSON.stringify(todoList));
  });
});
