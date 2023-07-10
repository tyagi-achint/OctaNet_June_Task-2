const inputBox = document.getElementById("todo-input");
const ongoingTask = document.getElementById("ongoingTaskUL");
const finishedTask = document.getElementById("finishedTaskUL");

function addTask(event) {
  if (inputBox.value == "") {
    alert("You must write a task!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    ongoingTask.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "&#x2718;";
    li.appendChild(span);
    ongoingTask.appendChild(document.createElement("hr"));
  }
  inputBox.value = "";
  saveData();
}
ongoingTask.addEventListener("click", handleTaskClick, false);
finishedTask.addEventListener("click", handleTaskClick, false);

function handleTaskClick(e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    filterTask(e.target);
    saveData();
  } else if (e.target.tagName === "SPAN") {
    const liElement = e.target.parentElement;
    const hrElement = liElement.nextElementSibling;
    liElement.remove();
    if (hrElement && hrElement.tagName === "HR") {
      hrElement.remove();
    }
    saveData();
  }
}

function filterTask(task) {
  const hrElement = task.nextElementSibling;
  if (task.classList.contains("checked")) {
    finishedTask.appendChild(task);
    if (hrElement && hrElement.tagName === "HR") {
      finishedTask.appendChild(hrElement);
    }
  } else {
    ongoingTask.appendChild(task);
    if (hrElement && hrElement.tagName === "HR") {
      ongoingTask.appendChild(hrElement);
    }
  }
}

function saveData() {
  localStorage.setItem("dataOngoing", ongoingTask.innerHTML);
  localStorage.setItem("dataFinished", finishedTask.innerHTML);
}
function showTask() {
  ongoingTask.innerHTML = localStorage.getItem("dataOngoing");
  finishedTask.innerHTML = localStorage.getItem("dataFinished");
}
showTask();
