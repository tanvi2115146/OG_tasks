
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
            loadTodos(user.email);
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
        alert("Please log in");
        return;
    }

    let todo = { email: user.email, taskTitle };
    
    saveTodoToLocal(todo).then(() => {
        document.getElementById("taskInput").value = ""; 
        loadTodos(user.email); 
    });
}



function loadTodos(email) {
    getTodos(email).then(todos => {
        console.log("Loading tasks:", todos);
        let taskBody = document.getElementById("taskBody");
        taskBody.innerHTML = "";


        todos.forEach(todo => {
            let row = document.createElement("tr");
            row.innerHTML = `<td>${todo.taskTitle}</td>
                <td><button onclick="deleteTodo('${todo.taskTitle}')">Delete</button></td>`;
            taskBody.appendChild(row);
        });
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




// Logout
function logoutUser() {
    localStorage.removeItem("loggedInUser");
    document.getElementById("taskContainer").style.display = "none";
    alert("Logged out ");
}

