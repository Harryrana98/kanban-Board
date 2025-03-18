const AddButtons = document.querySelectorAll(".userInput button");
// const inputValue=document.querySelector("#input")
const contentDivs = document.querySelectorAll(".content");
// const counts = document.querySelectorAll(".count");

contentDivs.forEach((div) => {  
  div.addEventListener("drop", dropHandler);
  div.addEventListener("dragover", dragoverHandler);
});
AddButtons.forEach((btn) => {
  btn.addEventListener("click", createTask);
});

function count(btn) {
  const todo = btn.closest(".todo");
  todo.querySelector(".count").innerHTML =
    Number(todo.querySelector(".count").innerHTML) + 1;
}

function createTask(e) {
  const btn = e.target;
  const input = btn.previousElementSibling;
  // console.log(input)
  const contentDiv = btn.parentElement.previousElementSibling;
  if(input.value==="" ){
    alert("Please enter the task")
    return;
  }

  const taskDiv = document.createElement("div");
  const text = document.createElement("p");
  const date = document.createElement("span");

  taskDiv.classList.add("task");
  taskDiv.draggable = true; 
  taskDiv.id = Date.now();

  taskDiv.addEventListener("dragstart", dragstartHandler);

  text.innerHTML = input.value;

  date.classList.add("date");
  date.innerHTML = new Date().toLocaleString();

  taskDiv.append(text, date);
  contentDiv.append(taskDiv);
  input.value = "";
  count(btn);

}

function dragstartHandler(e) {
  e.dataTransfer.setData("text/html", e.target.id);

}

function dropHandler(e) {
  e.preventDefault();
  const data = e.dataTransfer.getData("text/html");
  const findElement=document.getElementById(data)
  e.target.appendChild(findElement);
  const oldColumn = findElement.parentElement; // Original column
  const newColumn = e.target.closest(".content"); // New column

  if (!newColumn || newColumn === oldColumn) return; // Prevent errors

  newColumn.appendChild(findElement);

    // Update the counts
    updateCount(oldColumn);
    updateCount(newColumn);

}


function updateCount(column) {
  const countSpan = column.closest(".todo").querySelector(".count");
  countSpan.innerHTML = column.children.length;
}

function dragoverHandler(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
}
