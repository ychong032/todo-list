import { parse } from "date-fns";

export class Todo {
	constructor(title, description, dueDate, priority, isCompleted = false) {
		this.title = title;
		this.description = description;
		this.dueDate =
			dueDate === "" ? null : parse(dueDate, "yyyy-MM-dd", new Date());
		this.priority = priority;
		this.isCompleted = isCompleted;
	}
}
