/*

JS creating the task item for edit task and non-edit task

base task element
add classes and other elements as needed.


-- base
<div class="placeholder_non-edit">
    <textarea class="placeholder_non-edit__task-text" name="task-text">At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.At w3schools.com you will learn how to make a website. They offer free tutorials in all web development technologies.
    </textarea>
    <div class="placeholder__options">
    </div>
</div>

-- edit
in the element of class "placeholder__options"
    <button class="placeholder_non-edit__button" type="button">todo</button>

-- non edit
    <button class="placeholder_edit__button" type="button">Del</button>
    <button class="placeholder_edit__button" type="button">Cancel</button>

*/

"use strict";

function execSearch(event){
    event.preventDefault();
    event.stopPropagation();
    const searchText = document.querySelector("#search-form-text").value;
    // const regex = / {2,}/g;
    // const searchTextClean = searchText.replaceAll(regex, " ").trim();
    console.log(searchText);
}

const initApp = () => {
    const searchToDo = document.querySelector("#searchToDo");
    searchToDo.addEventListener("submit", execSearch, false);
}

document.addEventListener("readystatechange", (event) => {
    if (event.target.readyState === "complete") {
        initApp();
    }
});