

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("addTaskBtn").addEventListener("click", () => {
        let taskInput = document.getElementById("taskInput").value;
        if (taskInput.trim() === "") {
            alert("Please enter a task");
            return;
        }
        saveTodo(taskInput);
    });
});




function saveTodoToLocal(todo) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let todos = JSON.parse(localStorage.getItem("todos")) || []; 
            if (!Array.isArray(todos)) { 
                todos = []; 
            }
            todos.push(todo);
            localStorage.setItem("todos", JSON.stringify(todos));
            resolve();
        }, 500);
    });
}


function getTodos(email) {
  return new Promise((resolve) => {
        setTimeout(() => {
            let todos = JSON.parse(localStorage.getItem("todos")) || [];
            if (!Array.isArray(todos)) { 
                todos = []; 
            }
            resolve(todos.filter(todo => todo.email === email));
        }, 500);
    });
}



function saveTodo(taskTitle, priority = "Medium") {
    let user = JSON.parse(localStorage.getItem("loggedUser"));
    if (!user) {
        alert("First log in");
        return;
    }

    let todo = { 
        email: user.email, 
        taskTitle, 
        status: "Pending", 
        priority, 
        createdAt: new Date().toISOString() 
    };
    
    saveTodoToLocal(todo).then(() => {
        document.getElementById("taskInput").value = ""; 
        loadTodos(user.email); 
    });
}



function loadTodos(email, todos = null, sortBy = "date") {
    if (todos) {
        updateTaskList(sortTodos(todos, sortBy)); 
    } else {
        getTodos(email).then(fetchedTodos => {
            updateTaskList(sortTodos(fetchedTodos, sortBy));
        });
    }
}



function updateTaskList(todos) {
    let taskBody = document.getElementById("taskBody");
    taskBody.innerHTML = "";

    todos.forEach(todo => {
        let row = document.createElement("tr");
        row.setAttribute("data-task", todo.taskTitle);

        // Task Title Cell
        let taskCell = document.createElement("td");
        taskCell.textContent = todo.taskTitle;
        taskCell.classList.add("task-title");

        // Status Dropdown Cell
        let statusCell = document.createElement("td");
        let statusDropdown = document.createElement("select");
        statusDropdown.innerHTML = `
            <option value="Pending" ${todo.status === "Pending" ? "selected" : ""}>Pending</option>
            <option value="In Progress" ${todo.status === "In Progress" ? "selected" : ""}>In Progress</option>
            <option value="Complete" ${todo.status === "Complete" ? "selected" : ""}>Complete</option>
        `;
        statusDropdown.addEventListener("change", (event) => updateTaskStatus(todo.taskTitle, event.target.value));
        statusCell.appendChild(statusDropdown);

        // Edit and Delete Buttons
        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editTodo(todo.taskTitle));

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteTodo(todo.taskTitle));

        let actionCell = document.createElement("td");
        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);

        row.appendChild(taskCell);
        row.appendChild(statusCell);
        row.appendChild(actionCell);
        taskBody.appendChild(row);
    });
}




function updateTaskStatus(taskTitle, newStatus) {
    let user = JSON.parse(localStorage.getItem("loggedUser"));
    if (!user) return;

    let allTodos = JSON.parse(localStorage.getItem("todos")) || [];

    let updatedTodos = allTodos.map(todo => {
        if (todo.email === user.email && todo.taskTitle === taskTitle) {
            return { ...todo, status: newStatus };
        }
        return todo;
    });

    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    loadTodos(user.email);
}





function deleteTodo(taskTitle) {
    let user = JSON.parse(localStorage.getItem("loggedUser"));
    if (!user) {
        alert("Please log in first");
        return;
    }

    let allTodos = JSON.parse(localStorage.getItem("todos")) || []; 

    let updatedTodos = allTodos.filter(todo => !(todo.email === user.email && todo.taskTitle === taskTitle));
    
    localStorage.setItem("todos", JSON.stringify(updatedTodos)); 
    loadTodos(user.email); 
}


function editTodo(oldTaskTitle) {
    let user = JSON.parse(localStorage.getItem("loggedUser"));
    if (!user) {
        alert("Please log in first.");
        return;
    }

    let taskRow = document.querySelector(`tr[data-task="${oldTaskTitle}"]`);
    if (!taskRow) return;

    let taskCell = taskRow.querySelector(".task-title");
    let inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = oldTaskTitle;
    inputField.id = `edit-input-${oldTaskTitle}`;

    let saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    saveButton.onclick = function () {
        saveEditedTodo(oldTaskTitle);
    };
    taskCell.innerHTML = "";
    taskCell.appendChild(inputField);
    taskCell.appendChild(saveButton);
}



function saveEditedTodo(oldTaskTitle) {
    let user = JSON.parse(localStorage.getItem("loggedUser"));
    if (!user) {
        alert("Please log in first.");
        return;
    }

    let newTaskTitle = document.getElementById(`edit-input-${oldTaskTitle}`).value.trim();
    if (newTaskTitle === "") {
        alert("Task cannot be empty.");
        return;
    }

    let allTodos = JSON.parse(localStorage.getItem("todos")) || [];

   
    let updatedTodos = allTodos.map(todo => {
        if (todo.email === user.email && todo.taskTitle === oldTaskTitle) {
            return { ...todo, taskTitle: newTaskTitle };
        }
        return todo;
    });


    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    loadTodos(user.email);
}



//search function

function debounce(func, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => func.apply(this, args), delay);
    };
}

function searchTodos(query) {
    let user = JSON.parse(localStorage.getItem("loggedUser"));
    if (!user) return;

    getTodos(user.email).then(todos => {
        let filteredTodos = todos.filter(todo => 
            todo.taskTitle.toLowerCase().includes(query.toLowerCase())
        );

        updateTaskList(filteredTodos);
    });
}

const debouncedSearch = debounce(() => {
    let query = document.getElementById("searchInput").value;
    searchTodos(query);
}, 300);




function sortTodos(todos, criteria) {
    return todos.sort((a, b) => {
        if (criteria === "name") {
            return a.taskTitle.localeCompare(b.taskTitle); // Sort A-Z
        } else if (criteria === "date") {
            return new Date(b.createdAt) - new Date(a.createdAt); // Newest First
        } else if (criteria === "priority") {
            const priorityOrder = { "complete": 1, "In progress": 2, "pending": 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority]; 
        }
    });
}



function updateSortOrder() {
    let sortBy = document.getElementById("sortTodos").value;
    let user = JSON.parse(localStorage.getItem("loggedUser"));
    if (user) {
        loadTodos(user.email, null, sortBy);
    }
}

window.updateSortOrder = updateSortOrder;





export{saveTodo,saveTodoToLocal,getTodos,editTodo,deleteTodo
    ,loadTodos,saveEditedTodo,updateTaskList,debounce,debouncedSearch,searchTodos ,sortTodos,updateSortOrder}