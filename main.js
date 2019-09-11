// select elements
const clearButton = document.getElementById("clearButton");
const dateDisplay = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// class names for css font awesome icon
const CHECK = "far fa-check-square";
const UNCHECK = "far fa-square button";
const LINE_THROUGH = "lineThrough";

// variables
let todoList = [];
let id = 0;

// get item from localStorage
let todoData = localStorage.getItem("TODO");

if (todoData) {
  todoList = JSON.parse(todoData);
  id = todoList.length;
  loadList(todoList);
}

// load items to the user's interface
function loadList(array) {
  array.forEach(function(item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

// clear the local storage
clearButton.addEventListener("click", function() {
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

dateDisplay.innerHTML = today.toLocaleDateString("en-GB", options);
console.log("date: ", today.toLocaleDateString("en-GB", options));

// add to do function

function addToDo(toDo, id, done = false, trash = false) {
  if (trash) {
    return;
  }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `<li class="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  </li>
                `;

  const position = "beforeend";

  list.insertAdjacentHTML(position, item);
}

// add an item to the list user the enter key or press the plus button
document.addEventListener("keyup", function(even) {
  if (event.keyCode == 13) {
    addNewTodo();
  }
});

function addNewTodo() {
  const toDo = input.value;

  // if the input isn't empty
  if (toDo) {
    addToDo(toDo, id);

    LIST.push({
      name: toDo,
      id: id,
      done: false,
      trash: false
    });

    // add item to localstorage ( this code must be added where the LIST array is updated)
    localStorage.setItem("TODO", JSON.stringify(LIST));

    id++;
  }
  input.value = "";
}

// complete to do
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}

// target the items created dynamically

list.addEventListener("click", function(event) {
  const element = event.target; // return the clicked element inside list
  const elementJob = element.attributes.job.value; // complete or delete

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }

  // add item to localstorage ( this code must be added where the LIST array is updated)
  localStorage.setItem("TODO", JSON.stringify(LIST));
});
