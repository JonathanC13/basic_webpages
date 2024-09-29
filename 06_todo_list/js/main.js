/*
-- Task container templates.
<li class="task_container task__non_edit_height">
    <textarea class="task_text border_rad_tl border_rad_bl" name="task_text">At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.
    </textarea>
    <div class="task__edit_options">
        <button class="task_buttons border_rad_tr border_rad_br border_full task__done" type="button">todo</button>
    </div>
</li>
<li class="task_container task__edit_height">
    <textarea class="task_text  border_rad_tl border_rad_bl" name="task_text">At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.
    </textarea>
    <div class="task__edit_options">
        <button class="task_buttons border_rad_tr border_full task__del" type="button">Del</button>
        <button class="task_buttons border_rad_tr border_full task__save" type="button">Save</button>
        <button class="task_buttons border_rad_br border_full task__cancel" type="button">Cancel</button>
    </div>
</li>
*/

// Create a simple to-do list app that allows users to search, add, edit, and delete items. Use local storage to store the data.

"use strict";

// globals
const taskState = new Map([
    ["EDIT", "edit"],
    ["NONEDIT", "nonedit"]]
);

const taskStatus = new Map([
    ["PENDING", "pending"],
    ["COMPLETE", "complete"]
]);

const taskObj = {
    taskState: taskState.get("NONEDIT"),
    taskText: "",
    taskStatus: taskStatus.get("PENDING")
}
// /globals

/**
 * Event listener for search text input.
 * @param {object} event
 * @return {}
 */
function searchTasks(event){
    event.preventDefault();
    event.stopPropagation();
    const searchText = document.querySelector("#search-form-text").value;
    // const regex = / {2,}/g;
    // const searchTextClean = searchText.replaceAll(regex, " ").trim();

    if (searchText.length > 0) {
        console.log(searchText);
        // TODO: auto displaying tasks that have the searchText
    }
}

/**
 * Event listener for adding a task to the task list.
 * @param {object} event
 * @return {}
 */
function addTask(event) {
    event.preventDefault();
    event.stopPropagation();

    const taskList = getTaskListLocal();
    const task = Object.create(taskObj);

    task.taskId = "task_".concat(taskList.size);
    task.taskState = taskState.get("EDIT");
    task.taskText = "asdfasfdasa                      123";
    task.taskStatus = taskStatus.get("PENDING");
    const taskItem = taskList.set(task.taskId, task);
    saveTaskListLocal(taskList);
    
    createTaskContainer(task.taskId, taskItem.get(task.taskId));
    
    const task_empty = document.querySelector("#task_empty");
    if (taskList.size > 0) {
        task_empty.classList.add("offscreen");
    } else {
        task_empty.classList.remove("offscreen");
    }
}

/**
 * Event listener for adding a task to the task list.
 * @param {String} taskId ID for the task.
 * @param {object} taskItem Properties of the task.
 * @return {}
 */
function createTaskContainer(taskId, taskItem) {
    const taskListUl = document.querySelector("#task_list");

    const newli = document.createElement("li");
    newli.id = taskId;
    taskListUl.appendChild(newli);
    newli.classList.add("task_container");

    const newTextArea = document.createElement("textarea");
    newTextArea.classList.add("task_text", "border_rad_tl", "border_rad_bl");
    newTextArea.textContent = taskItem.taskText;
    newli.appendChild(newTextArea);

    const newDiv = document.createElement("div");
    newDiv.classList.add("task__edit_options");
    newli.appendChild(newDiv);

    // Edit options
    const newDelButton = document.createElement("button");
    newDelButton.classList.add("task_buttons", "border_rad_tr", "border_full", "del_bgcolor", "task__del");
    newDelButton.id = "del_button";
    newDelButton.textContent = "Del"
    newDiv.appendChild(newDelButton);

    const newSaveButton = document.createElement("button");
    newSaveButton.classList.add("task_buttons", "border_full", "complete_bgcolor", "task__save");
    newSaveButton.id = "save_button";
    newSaveButton.textContent = "Save"
    newDiv.appendChild(newSaveButton);

    const newCancelButton = document.createElement("button");
    newCancelButton.classList.add("task_buttons", "border_rad_br", "border_full", "cancel_bgcolor", "task__cancel");
    newCancelButton.id = "cancel_button";
    newCancelButton.textContent = "Cancel"
    newDiv.appendChild(newCancelButton);

    // Non edit option
    const newDoneButton = document.createElement("button");
    newDoneButton.classList.add("task_buttons", "border_rad_tr", "border_rad_br", "border_full", "task__done");

    if (taskItem.taskStatus === taskStatus.get("COMPLETE")) {
        newDoneButton.classList.add("complete_bgcolor");
        newDoneButton.textContent = "Done";
    } else {
        newDoneButton.textContent = "todo";
    }

    newDoneButton.id = "done_button";
    newDiv.appendChild(newDoneButton);

    if (taskItem.taskState === taskState.get("EDIT")) {
        newli.classList.add("task__edit_height");

        newDoneButton.classList.add("display_none")
    } else {
        newli.classList.add("task__non_edit_height");

        newDelButton.classList.add("display_none")
        newSaveButton.classList.add("display_none")
        newCancelButton.classList.add("display_none")
    }

    addTaskEditListeners(newli)
}

/**
 * Event listener for deleting the current task.
 * @param {object} event
 * @return {}
 */
function deleteTask(event) {
    event.preventDefault();
    event.stopPropagation();

    const currTask = event.currentTarget.task;

    const taskList = getTaskListLocal();

    currTask.remove();

    taskList.delete(currTask.id);
    saveTaskListLocal(taskList);
}

/**
 * Save the task's list map to local storage.
 * @param {object} taskList Map for the current task list
 * @return {}
 */
function saveTaskListLocal(taskList) {
    localStorage.myLocalTaskList = JSON.stringify(Array.from(taskList.entries()));
}

/**
 * Get the task's list map from local storage.
 * @param {N/A}
 * @return {object} Map for the task list.
 */
function getTaskListLocal() {
    if (localStorage.myLocalTaskList !== undefined) {
        return new Map(JSON.parse(localStorage.myLocalTaskList));
    } else {
        return new Map();
    }
}

/**
 * Event listener for saving the current task changes.
 * @param {object} event
 * @return {}
 */
function saveTask(event) {
    event.preventDefault();
    event.stopPropagation();

    const taskList = getTaskListLocal();

    // console.log("save to local storage on browser and local list")
    const currTask = event.currentTarget.task;
    const newText = currTask.querySelector(".task_text").value;
    currTask.querySelector(".task_text").textContent = newText;
    taskList.get(currTask.id)["taskText"] = newText;

    saveTaskListLocal(taskList);

    toggleTaskState(event, taskList);
}

/**
 * Event listener for closing the current task without saving the changes.
 * @param {object} event
 * @return {}
 */
function closeTaskEdit(event) {
    event.preventDefault();
    event.stopPropagation();

    const taskList = getTaskListLocal();
    const currTask = event.currentTarget.task;

    // reload text from local list
    const taskText = currTask.querySelector(".task_text");
    taskText.value = taskList.get(currTask.id)["taskText"];

    toggleTaskState(event, taskList);
}

/**
 * Toggling edit and non edit states for the current task.
 * @param {object} event Current task element
 * @param {object} taskList Map for the task list.
 * @return {}
 */
function toggleTaskState(event, taskList) {
    const currTask = event.currentTarget.task;

    if (taskList.get(currTask.id)["taskState"] === taskState.get("EDIT")) {
        taskList.set(currTask.id)["taskState"] = taskState.get("NONEDIT")
    } else {
        taskList.set(currTask.id)["taskState"] = taskState.get("EDIT")
    }

    // console.log("close edit, return to nonedit task container");
    currTask.classList.toggle("task__edit_height");
    currTask.classList.toggle("task__non_edit_height");

    const delOption = currTask.querySelector(".task__del");
    delOption.classList.toggle("display_none");
    
    const saveOption = currTask.querySelector(".task__save");
    saveOption.classList.toggle("display_none");

    const cancelOption = currTask.querySelector(".task__cancel");
    cancelOption.classList.toggle("display_none");

    const DoneOption = currTask.querySelector(".task__done");
    DoneOption.classList.toggle("display_none");
}

/**
 * Event listener for adding a task to the task list.
 * @param {Element} taskItem The list item for the task.
 * @return {}
 */
function addTaskEditListeners(taskItem) {
    const delOption = taskItem.querySelector(".task__del");
    delOption.addEventListener("click", deleteTask, false);
    delOption.task = taskItem;

    const saveOption = taskItem.querySelector(".task__save");
    saveOption.addEventListener("click", saveTask, false);
    saveOption.task = taskItem;

    const cancelOption = taskItem.querySelector(".task__cancel");
    cancelOption.addEventListener("click", closeTaskEdit, false);
    cancelOption.task = taskItem;
}

/**
 * Contruct the initial task list from the map from local storage.
 * @param {}
 * @return {}
 */
function buildTaskList() {
    const taskList = getTaskListLocal();
    const task_empty = document.querySelector("#task_empty");

    if (taskList !== null && taskList.size > 0) {    
        task_empty.classList.add("offscreen");

        for (let [key, value] of taskList) {
            console.log(key + " is " + value);
        }
    } else {
        task_empty.classList.remove("offscreen");
    }
}

/**
 * Initialize after DOM complete
 * @param {}
 * @return {}
 */
const initApp = () => {
    const searchToDo = document.querySelector("#searchToDo");
    searchToDo.addEventListener("input", searchTasks, false);

    const addTaskButton = document.querySelector("#add_task_button");
    addTaskButton.addEventListener("click", addTask, false);

    buildTaskList();
}

/**
 * Listener for readystatechange states.
 * @param {}
 * @return {}
 */
document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        initApp();
    }
});