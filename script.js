console.log("Script started");
/* Task object structure
let task = {
  id: "An id generated from the current time",
  text: "The text the user entered",
  dueDate: "The date the user selected",
}
*/

// TODO: Declare an empty array to hold tasks
let taskList = [];

function addTask(event) {
    // TODO: Prevent form from reloading page
    event.preventDefault();

    // TODO: Get task text from textbox
    let textbox = document.getElementById("task-input");
    let taskText = textbox.value;

    // TODO: Get due date from date picker
    let datePicker = document.getElementById("duedate");
    let date = datePicker.value;
    console.log(date);

    // TODO (optional): Check for empty task text, empty date, or date in the past and alert user
    if (taskText == "") {
        alert("Please enter a task");
        return;
    }
    else if (date == "") {
        alert("Please select a due date");
        return;
    }
    else if (Date.parse(date) < Date.now()) {
        alert("Date must be in the future");
        return;
    }
    else {
        // TODO: Clear text box
        textbox.value = "";
        // TODO: Clear date picker
        datePicker.value = "";
    }

    // TODO: Create task object
    let task = {
        id: Date.now(),
        text: taskText,
        dueDate: date
    }

    // TODO: Add task to task list
    taskList.push(task);

    // TODO: Call createTaskDiv to add the task to the list
    createTaskDiv(task);

    // TODO: Save task list to local storage
    saveTask(task);
}

function createTaskDiv(task) {
    // Get todo-list container div
    let todoList = document.getElementById("todo-list");

    // Create list-item div for the task
    let taskDiv = document.createElement("div");
    // TODO: Set the id of the div to the task id
    taskDiv.id = task.id;
    taskDiv.classList.add("list-item"); // Add the CSS class for styling

    // Create checkbox
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "checkbox" + task.id;
    checkbox.addEventListener("change", removeTask);
    // Append checkbox to list-item div
    taskDiv.appendChild(checkbox);

    // Create a paragraph element for the task text
    let taskText = document.createElement("p");
    // TODO: Set the text of the task
    taskText.innerText = task.text;
    // Append taskText to div
    taskDiv.appendChild(taskText);

    // Create a paragraph element for the task due date
    let dueDate = document.createElement("p");
    dueDate.innerText = task.dueDate;
    taskDiv.appendChild(dueDate);

    // Append list-item div to the list
    todoList.appendChild(taskDiv);
}

// Called when task checkbox is clicked
function removeTask(event) {
    // Get id of checkbox
    let checkboxId = event.target.id; // e.g. checkbox10

    // Get id number from the checkbox id
    let id = checkboxId.substring(8);

    // Get task div by id
    let taskDiv = document.getElementById(id);

    // Apply animation
    taskDiv.classList.add("remove-task");

    // Remove the task div from layout
    setTimeout(function () {
        taskDiv.remove();
        deleteTask(taskDiv.id);
    }, 1000);

}

// TODO: Use id to delete task from task array and local storage
function deleteTask(id) {
    localStorage.removeItem(id);
}

// TODO: Iterate through the tasks array and create a task div for each task
function loadTaskList() {
    for (let i = 0; i < taskList.length; i++) {
        let curr = taskList[i];
        createTaskDiv(curr);
    }
}

function saveTask(task) {
    localStorage.setItem(task.id, JSON.stringify(task));
}

// TODO: Load each task from local storage into tasks array
function loadTasksFromStorage() {
    // TODO: Load each task from local storage into tasks array
    console.log("Loading tasks...")
    // Get each task from localStorage
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let task = JSON.parse(localStorage.getItem(key));
        console.log(task);
        // Create task divs for each task
        //createTaskDiv(task);
        taskList.push(task);
    }
    loadTaskList();
}

loadTasksFromStorage();