
function saveUser(user) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let users = JSON.parse(localStorage.getItem("users")) || [];
            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
            resolve();
        }, 500);
    });
}

function getUsers() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(JSON.parse(localStorage.getItem("users")) || []);
        }, 500);
    });
}


//todo

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


// select form
function showForm(formId) {
    document.querySelectorAll(".form").forEach(form => form.style.display = "none");
    document.getElementById(formId).style.display = "block";
}

// signup
const signupForm = document.getElementById("form1");
signupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let user = {
        name: `${signupForm[0].value} ${signupForm[1].value}`,
        email: signupForm[2].value,
        password: signupForm[3].value
    };
    saveUser(user).then(() => alert("User registered"));
    signupForm.reset();
    document.getElementById("form1").style.display = "none";
        loadTodos(user.email);
        document.getElementById("taskContainer").style.display = "block";
});


//  login
const loginForm = document.getElementById("form2");
loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let email = loginForm[0].value;
    let password = loginForm[1].value;
    
    getUsers().then(users => {
        let user = users.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem("loggedUser", JSON.stringify(user));
            alert("Login successful!");
            document.getElementById("form2").style.display = "none";
            loadTodos(email);
            document.getElementById("taskContainer").style.display = "block";
        } else {
            alert("Invalid ");
        }
    });
    loginForm.reset();
});



function saveTodo(taskTitle) {
    let user = JSON.parse(localStorage.getItem("loggedUser"));
    if (!user) {
        alert("first log in");
        return;
    }

    let todo = { email: user.email, taskTitle };
    
    saveTodoToLocal(todo).then(() => {
        document.getElementById("taskInput").value = ""; 
        loadTodos(user.email); 
    });
}



function loadTodos(email, todos = null) {
    if (todos) {
        updateTaskList(todos); 
    } else {
        getTodos(email).then(fetchedTodos => {
            console.log("Loading tasks:", fetchedTodos);
            updateTaskList(fetchedTodos); 
        });
    }
}


function updateTaskList(todos) {
    let taskBody = document.getElementById("taskBody");
    taskBody.innerHTML = "";

    todos.forEach(todo => {
        let row = document.createElement("tr");
        row.setAttribute("data-task", todo.taskTitle); 

        row.innerHTML = `
            <td class="task-title">${todo.taskTitle}</td>
            <td><button onclick="editTodo('${todo.taskTitle}')">Edit</button></td>
            <td><button onclick="deleteTodo('${todo.taskTitle}')">Delete</button></td>
        `;

        taskBody.appendChild(row);
    });
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




// Logout
function logoutUser() {
    localStorage.removeItem("loggedInUser");
    document.getElementById("taskContainer").style.display = "none";
    alert("Logged out ");
}


//dynamic delay

function randomDelay() {
    return Math.floor(Math.random() * (1000 - 200 + 1)) + 200;
}

setTimeout(() => {
    console.log("Executed after random delay");
}, randomDelay());
