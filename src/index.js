import "./style.css";
import { Todo } from "./todo";
import { Storage } from "./storage";
import { DOMHandler } from "./dom";

const storage = Storage();
const domHandler = new DOMHandler();
let currentTab = document.querySelector("#all-tasks");

// TODO: Delete the below lines once done testing
const testTodo = new Todo(
	"Buy 10 avocados",
	"Do as the title says, dummy",
	"2023-06-01",
	3
);
storage["all-tasks"].push(testTodo);
storage.completed.push(testTodo);
storage.today.push(testTodo);
storage.upcoming.push(testTodo);

initialise();

function initialise() {
	// TODO: read localStorage

	const newTaskButton = document.querySelector("#add-task");
	newTaskButton.addEventListener("click", domHandler.showNewTaskForm);

	const cancelNewTaskButton = document.querySelector(
		"#newTaskButtons > .cancel"
	);
	cancelNewTaskButton.addEventListener("click", domHandler.hideNewTaskForm);

	const newTaskForm = document.querySelector("#newTaskForm");
	newTaskForm.addEventListener("submit", addNewTask);

	domHandler.setMinDate();

	const menu = document.querySelector("#menu");
	for (const child of menu.children) {
		child.addEventListener("click", switchTab);
	}

	for (const item of storage[currentTab.id]) {
		domHandler.createNewTaskElement(
			item.title,
			item.description,
			item.dueDate,
			item.priority
		);
	}

	currentTab.classList.add("selected");
}

function switchTab(e) {
	const taskGridHeader = document.querySelector("#task-grid > h1");
	domHandler.changeTextContent(taskGridHeader, e.target.textContent);

	let task = taskGridHeader.nextSibling;
	let temp;
	const taskGrid = document.querySelector("#task-grid");

	while (task) {
		temp = task;
		task = task.nextSibling;
		taskGrid.removeChild(temp);
	}

	for (const item of storage[e.target.id]) {
		domHandler.createNewTaskElement(
			item.title,
			item.description,
			item.dueDate,
			item.priority
		);
	}

	currentTab.classList.remove("selected");

	currentTab = e.target;
	currentTab.classList.add("selected");

	domHandler.toggleAddTaskButton(currentTab);
}

function addNewTask() {
	const newTaskValues = domHandler.getNewTaskValues();

	let newTask = new Todo(
		newTaskValues.title,
		newTaskValues.description,
		newTaskValues.dueDate,
		newTaskValues.priority
	);
	storage[currentTab.id].push(newTask);
	console.log(storage[currentTab.id]);

	domHandler.createNewTaskElement(
		newTask.title,
		newTask.description,
		newTask.dueDate,
		newTask.priority
	);
}

// TODO: allow user to add new project
// TODO: show tasks for "Today" and "Upcoming" using date filtering
// TODO: add functionality for marking tasks as completed
