// select elements
const clearButton = document.getElementById("clearButton");
const dateDisplay = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const addButton = document.getElementById("plus-button");

// variables
let todoList = new Object();
let id = 0;

// components
// for imcomplete item
const squareElement = document.createElement("i");
squareElement.setAttribute("class", "far fa-square");
const checkInBoxElement = document.createElement("i");
checkInBoxElement.setAttribute("class", "far fa-check-square");
// for completed item
const checkComponent = document.createElement("i");
checkComponent.setAttribute("class", "fas fa-check");

const checkBox = {
  complete: checkComponent.outerHTML,
  imcomplete: squareElement.outerHTML + checkInBoxElement.outerHTML
};

// get item from localStorage
let todoData = localStorage.getItem("TODO");

if (todoData) {
  todoList = JSON.parse(todoData);
  id = todoList.length;
  loadList(todoList);
}

// load items to the user's interface
function loadList(list) {
  for (item in list) {
    addToDo(list[item].name, item, list[item].done);
  }
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
function addToDo(toDo, id, done = false) {
  const DONE = done ? "complete" : "imcomplete";

  // creat the item li
  const item = document.createElement("li");
  item.setAttribute("class", `item ${DONE}`);
  item.setAttribute("id", `${id}`);
  // append check box span child
  const checkBoxSpan = document.createElement("span");
  checkBoxSpan.setAttribute("class", "check-box");
  checkBoxSpan.setAttribute("job", "check-item");
  checkBoxSpan.innerHTML = checkBox[DONE];
  item.appendChild(checkBoxSpan);
  // append text span
  const testSpan = document.createElement("span");
  testSpan.setAttribute("class", "text");
  testSpan.innerText = toDo;
  item.appendChild(testSpan);
  // append bin icon
  const binIcon = document.createElement("i");
  binIcon.setAttribute("class", "far fa-trash-alt");
  binIcon.setAttribute("job", "delete");
  item.appendChild(binIcon);
  // add item to todo list display
  list.insertAdjacentElement("beforeend", item);
}

//---------------------------------------------
// add an item to the list user the enter key or press the plus button
document.addEventListener("keyup", function() {
  if (event.keyCode == 13) {
    addNewTodo();
  }
});
addButton.addEventListener("click", function() {
  addNewTodo();
});

function addNewTodo() {
  const toDo = input.value;
  // if the input isn't empty
  if (toDo) {
    addToDo(toDo, id);
    todoList[id] = {
      name: toDo,
      id: id,
      done: false
    };
    // add item to localstorage ( this code must be added where the todoList array is updated)
    localStorage.setItem("TODO", JSON.stringify(todoList));
    id++;
  }
  input.value = "";
}

addToDo("Drink Coffee", "2", false);
addToDo("Drink tea", "3", true);

//---------------------------------------------

// complete to do
function completeToDo(element) {
  console.log(element);
  element.parentNode.classList.toggle("complete");
  element.parentNode.classList.toggle("imcomplete");

  todoList[element.id].done = todoList[element.id].done ? false : true;
}

// remove to do
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  delete todoList[element.parentNode.id];
}

// target the items created dynamically

list.addEventListener("click", function(event) {
  const element = event.target; // return the clicked element inside list
  console.log(element);
  const elementJob = element.parentNode.attributes.job.value; // complete or delete

  if (elementJob == "check-item") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }

  // add item to localstorage ( this code must be added where the todoList array is updated)
  localStorage.setItem("TODO", JSON.stringify(todoList));
});
