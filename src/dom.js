// Script to handle all DOM-related events
import { format } from "date-fns";

export class DOMHandler {
	showNewTaskForm() {
		const newTaskButton = document.querySelector("#add-task");
		const newTaskForm = document.querySelector("#newTaskForm");

		newTaskForm.style.display = "flex";
		newTaskButton.style.display = "none";
	}

	hideNewTaskForm() {
		const newTaskButton = document.querySelector("#add-task");
		const newTaskForm = document.querySelector("#newTaskForm");

		newTaskForm.reset();
		newTaskForm.style.display = "none";
		newTaskButton.style.display = "block";
	}

	setMinDate() {
		const minDate = format(new Date(), "yyyy-MM-dd");
		const dueDateElement = document.querySelector("#dueDate");
		dueDateElement.min = minDate;
	}

	getNewTaskValues() {
		let titleElement = document.querySelector("#title");
		let descriptionElement = document.querySelector("#description");
		let dueDateElement = document.querySelector("#dueDate");
		let priorityElement = document.querySelector("#priority");

		return {
			title: titleElement.value,
			description: descriptionElement.value,
			dueDate: dueDateElement.value,
			priority: priorityElement.value,
		};
	}

	createNewTaskElement(title, description, dueDate, priority) {
		const taskGrid = document.querySelector("#task-grid");

		const newTaskElement = document.createElement("div");
		newTaskElement.classList.add("task");

		const newTaskHeader = document.createElement("div");
		newTaskHeader.classList.add("task-header");
		newTaskHeader.addEventListener("click", this.toggleDetails);

		const newTaskHeaderContent = document.createElement("div");
		newTaskHeaderContent.classList.add("task-header-content");

		const newTaskCheckbox = document.createElement("input");
		newTaskCheckbox.setAttribute("type", "checkbox");

		const newTaskTitle = document.createElement("div");
		newTaskTitle.classList.add("task-title");
		newTaskTitle.textContent = title;

		const emptyDiv = document.createElement("div");

		const newTaskDate = document.createElement("div");
		newTaskDate.classList.add("task-date");
		newTaskDate.textContent = dueDate
			? `Due: ${format(dueDate, "dd MMMM yyyy")}`
			: "";

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

		newTaskHeaderContent.appendChild(newTaskCheckbox);
		newTaskHeaderContent.appendChild(newTaskTitle);
		newTaskHeaderContent.appendChild(emptyDiv);
		newTaskHeaderContent.appendChild(newTaskDate);

		newTaskHeader.appendChild(newTaskHeaderContent);
		newTaskHeader.appendChild(newTaskExpand);

		newTaskElement.appendChild(newTaskHeader);
		newTaskElement.appendChild(newTaskDetails);

		taskGrid.appendChild(newTaskElement);
		this.hideNewTaskForm();
	}

	toggleDetails(e) {
		console.log(e);
		if (e.target.className === "task-header") {
			const taskDetails = e.target.nextSibling;
			taskDetails.style.display =
				taskDetails.style.display === "none" ? "flex" : "none";

			const expandTask = e.target.lastChild;
			expandTask.textContent = expandTask.textContent === "+" ? "-" : "+";
		}
	}
}
