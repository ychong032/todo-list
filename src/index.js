import "./style.css";
import { format, parse } from "date-fns";

// Arrays to store each list of Todo objects
const allTodos = [];
const todayTodos = [];
const upcomingTodos = [];
const completedTodos = [];

const newTaskButton = document.querySelector("#add-task");
newTaskButton.addEventListener("click", showNewTaskForm);

const cancelNewTaskButton = document.querySelector("#newTaskButtons > .cancel");
cancelNewTaskButton.addEventListener("click", hideNewTaskForm);

function showNewTaskForm() {
	const newTaskForm = document.querySelector("#newTaskForm");
	console.log(newTaskForm);
	newTaskForm.style.visibility = "visible";
}

function hideNewTaskForm() {
	const newTaskForm = document.querySelector("#newTaskForm");
	newTaskForm.style.visibility = "hidden";
}

// Next step: handle form validation and submission
// TODO: handle min allowed date for due date
