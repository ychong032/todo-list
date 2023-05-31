import "./style.css";
import { Todo } from "./todo";
import { Storage } from "./storage";
import { DOMHandler } from "./dom";

const storage = new Storage();
const domHandler = new DOMHandler();

initialise();

function initialise() {
	const newTaskButton = document.querySelector("#add-task");
	newTaskButton.addEventListener("click", domHandler.showNewTaskForm);

	const cancelNewTaskButton = document.querySelector(
		"#newTaskButtons > .cancel"
	);
	cancelNewTaskButton.addEventListener("click", domHandler.hideNewTaskForm);

	const newTaskForm = document.querySelector("#newTaskForm");
	newTaskForm.addEventListener("submit", addNewTask);

	domHandler.setMinDate();
}

function addNewTask() {
	const newTaskValues = domHandler.getNewTaskValues();

	let newTask = new Todo(
		newTaskValues.title,
		newTaskValues.description,
		newTaskValues.dueDate,
		newTaskValues.priority
	);
	storage.allTodos.push(newTask);
	console.log(storage.allTodos);

	domHandler.createNewTaskElement(
		newTask.title,
		newTask.description,
		newTask.dueDate,
		newTask.priority
	);
}
