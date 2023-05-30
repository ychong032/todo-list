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
	newTaskForm.style.visibility = "visible";
	newTaskButton.style.visibility = "hidden";
}

function hideNewTaskForm() {
	newTaskForm.reset();
	newTaskForm.style.visibility = "hidden";
	newTaskButton.style.visibility = "visible";
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

	const newTaskElement = document.createElement("div");
	newTaskElement.classList.add("task");
	newTaskElement.textContent = newTask.title;

	taskGrid.appendChild(newTaskElement);

	hideNewTaskForm();
}

function setMinDate() {
	const minDate = format(new Date(), "yyyy-MM-dd");
	const dueDateElement = document.querySelector("#dueDate");
	dueDateElement.min = minDate;
}

// Next step: handle form validation and submission
// TODO: handle min allowed date for due date
