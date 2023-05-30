import "./style.css";
import { format, parse } from "date-fns";
import { Todo } from "./todo";

// Arrays to store each list of Todo objects
const allTodos = [];
const todayTodos = [];
const upcomingTodos = [];
const completedTodos = [];

const newTaskButton = document.querySelector("#add-task");
newTaskButton.addEventListener("click", showNewTaskForm);

const cancelNewTaskButton = document.querySelector("#newTaskButtons > .cancel");
cancelNewTaskButton.addEventListener("click", hideNewTaskForm);

const newTaskForm = document.querySelector("#newTaskForm");
newTaskForm.addEventListener("submit", addNewTask);

setMinDate();

function showNewTaskForm() {
	newTaskForm.style.display = "flex";
	newTaskButton.style.display = "none";
}

function hideNewTaskForm() {
	newTaskForm.reset();
	newTaskForm.style.display = "none";
	newTaskButton.style.display = "block";
}

function addNewTask() {
	let taskGrid = document.querySelector("#task-grid");
	let titleElement = document.querySelector("#title");
	let descriptionElement = document.querySelector("#description");
	let dueDateElement = document.querySelector("#dueDate");
	let priorityElement = document.querySelector("#priority");

	let newTask = new Todo(
		titleElement.value,
		descriptionElement.value,
		dueDateElement.value,
		priorityElement.value
	);
	allTodos.push(newTask);
	console.log(allTodos);

	const newTaskElement = createNewTaskElement(
		newTask.title,
		newTask.description,
		newTask.priority
	);

	taskGrid.appendChild(newTaskElement);

	hideNewTaskForm();
}

function createNewTaskElement(title, description, priority) {
	const newTaskElement = document.createElement("div");
	newTaskElement.classList.add("task");

	const newTaskHeader = document.createElement("div");
	newTaskHeader.classList.add("task-header");
	newTaskHeader.addEventListener("click", toggleDetails);

	const newTaskTitle = document.createElement("div");
	newTaskTitle.classList.add("task-title");
	newTaskTitle.textContent = title;

	const newTaskExpand = document.createElement("div");
	newTaskExpand.classList.add("expand-task");
	newTaskExpand.textContent = "+";

	const newTaskDetails = document.createElement("div");
	newTaskDetails.classList.add("task-details");
	newTaskDetails.style.display = "none";

	const newTaskDescription = document.createElement("div");
	newTaskDescription.classList.add("description");

	const newTaskDescriptionHeader = document.createElement("h4");
	newTaskDescriptionHeader.textContent = "Description";

	const newTaskDescriptionText = document.createElement("p");
	newTaskDescriptionText.textContent =
		description === "" ? "(no description provided)" : description;

	const newTaskPriority = document.createElement("div");
	newTaskPriority.classList.add("priority");

	const newTaskPriorityHeader = document.createElement("h4");
	newTaskPriorityHeader.textContent = "Priority";

	const newTaskPriorityText = document.createElement("p");
	newTaskPriorityText.textContent = priority;

	newTaskPriority.appendChild(newTaskPriorityHeader);
	newTaskPriority.appendChild(newTaskPriorityText);

	newTaskDescription.appendChild(newTaskDescriptionHeader);
	newTaskDescription.appendChild(newTaskDescriptionText);

	newTaskDetails.appendChild(newTaskDescription);
	newTaskDetails.appendChild(newTaskPriority);

	newTaskHeader.appendChild(newTaskTitle);
	newTaskHeader.appendChild(newTaskExpand);

	newTaskElement.appendChild(newTaskHeader);
	newTaskElement.appendChild(newTaskDetails);

	return newTaskElement;
}

function toggleDetails(e) {
	console.log(e);

	const taskDetails = e.target.nextSibling;
	taskDetails.style.display =
		taskDetails.style.display === "none" ? "flex" : "none";

	const expandTask = e.target.lastChild;
	expandTask.textContent = expandTask.textContent === "+" ? "-" : "+";
}

function setMinDate() {
	const minDate = format(new Date(), "yyyy-MM-dd");
	const dueDateElement = document.querySelector("#dueDate");
	dueDateElement.min = minDate;
}
