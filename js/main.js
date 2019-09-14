$(document).ready(function() {
  // select elements
  const clearButton = $("#clearButton");
  const dateDisplay = $("#date");
  const list = $("#todo-list");
  const input = $("#todo-input");
  const addButton = $("#add-button");

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
    localStorage.clear();
    location.reload();
  });

  // Show todays date
  const options = {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric"
  };
  const today = new Date();
  dateDisplay.text(today.toLocaleDateString("en-GB", options));

  // add to do function
  function addToDo(toDo, done = false) {
    todoList[id] = {
      name: toDo,
      done: done
    };
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
    // add item to todo list display
    list.append(liItem);
    // add item to localstorage ( this code must be added where the todoList array is updated)
    localStorage.setItem("TODO", JSON.stringify(todoList));
    id++;
  }

  //---------------------------------------------
  // add an item to the list user the enter key or press the plus button
  input.keypress(function() {
    if (event.keyCode == 13) {
      addButton.trigger("click");
    }
  });

  addButton.click(function() {
    const toDo = input.val();
    // if the input isn't empty
    if (toDo) {
      addToDo(toDo);
    }
    input.val("");
  });

  // remove to do
  $("ul").on("click", "i.fa-trash-o", function() {
    const idToDelete = $(this)
      .siblings("input")
      .attr("id");
    console.log(idToDelete);
    delete todoList[idToDelete];
    localStorage.setItem("TODO", JSON.stringify(todoList));
    $(this)
      .parent()
      .remove();
  });

  $("ul").on("click", "input[type=checkbox]", function() {
    $(this).prop("checked", $(this).prop("checked"));
    todoList[$(this).attr("id")].done = $(this).prop("checked");
    localStorage.setItem("TODO", JSON.stringify(todoList));
  });

  //---------------------------------------------

  //   // complete to do
  //   function completeToDo(element) {
  //     console.log(element);
  //     element.parentNode.classList.toggle("complete");
  //     element.parentNode.classList.toggle("imcomplete");

  //     todoList[element.id].done = todoList[element.id].done ? false : true;
  //   }

  //   // target the items created dynamically

  //   list.addEventListener("click", function(event) {
  //     const element = event.target; // return the clicked element inside list
  //     console.log(element);
  //     const elementJob = element.parentNode.attributes.job.value; // complete or delete

  //     if (elementJob == "check-item") {
  //       completeToDo(element);
  //     } else if (elementJob == "delete") {
  //       removeToDo(element);
  //     }

  //     // add item to localstorage ( this code must be added where the todoList array is updated)
  //     localStorage.setItem("TODO", JSON.stringify(todoList));
  //   });
});
