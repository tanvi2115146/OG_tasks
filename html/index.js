// the selected form
function showForm(formId) {
    let forms = document.querySelectorAll('.form');
    forms.forEach(form => {
        form.style.display = "none";
    });

    let selectedForm = document.getElementById(formId);
    if (selectedForm) {
        selectedForm.style.display = "block";
    }
}




const StorageModule = (() => {
    const data = "users"; 

    function getLocalStorageData(key) {
        return JSON.parse(localStorage.getItem(key)) || [];
    }

    function saveUser(user) {
        return new Promise((resolve) => {
            setTimeout(() => {
                let users = getLocalStorageData(data);
                users.push(user);
                localStorage.setItem(data, JSON.stringify(users));
                resolve("signed up successful");
            },0);
        });
    }

    function getUsers() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(getLocalStorageData(data));
            }, 500);
        });
    }

    function loginUser(email, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const users = getLocalStorageData(data);
                const user = users.find(u => u.email === email && u.password === password);
                if (user) {
                    resolve("Login successful");
                } else {
                    reject("Invalid");
                }
            }, 500);
        });
    }

    return {
        saveUser,
        getUsers,
        loginUser
    };
})();


// Sign-up 
document.getElementById("form1").addEventListener("submit", function(event) {
    event.preventDefault();

    const firstName = document.querySelector("#form1 input[placeholder='First Name']").value;
    const lastName = document.querySelector("#form1 input[placeholder='Last Name']").value;
    const email = document.querySelector("#form1 input[placeholder='Email']").value;
    const password = document.querySelector("#form1 input[placeholder='Password']").value;

    const newUser = { name: firstName + " " + lastName, email, password };

    StorageModule.saveUser(newUser).then((message) => {
        alert(message);
        document.getElementById("form1").reset();
    });
});


// Login 
document.getElementById("form2").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.querySelector("#form2 input[placeholder='Email']").value;
    const password = document.querySelector("#form2 input[placeholder='Password']").value;

    StorageModule.loginUser(email, password)
        .then((message) => {
            alert(message);
        })
        .catch((error) => {
            alert(error);
        });
});







//todo


function saveTodo() {
    if (!currentUser) {
        alert("Notlogged in ");
        return;
    }

    let todos = JSON.parse(localStorage.getItem("todos")) || {};
    if (!todos[currentUser]) {
        todos[currentUser] = [];
    }
    todos[currentUser].push(taskInput);
    localStorage.setItem("todos", JSON.stringify(todos));

    document.getElementById("taskInput").value = ""; 
    displayTasks();
}


function getTodos() {
    let todos = JSON.parse(localStorage.getItem("todos")) || {};
    return todos[currentUser] || [];
}



function displayTasks() {
    if (!currentUser) return;

    let taskBody = document.getElementById("taskBody");
    let taskContainer = document.getElementById("taskContainer");
    let formContainer = document.querySelector(".form-container");

    if (!taskBody || !taskContainer || !formContainer) {
        console.error("Elements missing in the HTML!");
        return;
    }

    taskBody.innerHTML = "";

    let tasks = getTodos();
    tasks.forEach((task, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${task}</td>
            <td><button onclick="deleteTask(${index})">Delete</button></td>
        `;
        taskBody.appendChild(row);
    });

    
    formContainer.style.display = "none";
    taskContainer.style.display = "block";
}



function deleteTask(index) {
    let todos = JSON.parse(localStorage.getItem("todos")) || {};
    if (!todos[currentUser]) return;

    todos[currentUser].splice(index, 1);
    localStorage.setItem("todos", JSON.stringify(todos));

    displayTasks();
}



// Login function
document.getElementById("form2").addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.querySelector("#form2 input[placeholder='Email']").value.trim();
    const password = document.querySelector("#form2 input[placeholder='Password']").value.trim();

    if (!email || !password) {
        alert("Please enter both email and password!");
        return;
    }

    StorageModule.loginUser(email, password)
        .then((message) => {
            alert(message); 
            currentUser = email;
            localStorage.setItem("currentUser", email);
            displayTasks();
        })
        .catch((error) => {
            alert(error);
        });
});


function logoutUser() {
    localStorage.removeItem("currentUser");
    currentUser = null;
    
    
    document.querySelector(".form-container").style.display = "block";
    document.getElementById("taskContainer").style.display = "none";
}

