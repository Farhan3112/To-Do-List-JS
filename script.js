const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let editTodo = null;//need to access it on both edit and remove btn

// Function to add to do
const addTodo = ()=>{
    const inputText = inputBox.value.trim();
    if(inputText.length <= 0){
        alert("You must write something in your to do");
        return false;
    }

    if(addBtn.value === "Edit"){
        // Passing the original text to editLocalTodos function before edit it in the todoList
        editLocalTodos(editTodo.target.previousElementSibling.innerHTML);//sending edited todo to the local storage
        editTodo.target.previousElementSibling.innerHTML = inputText;
        addBtn.value = "Add";
        inputBox.value = "";
    }
    else{

    //Creating p tag
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    
    //Creating Edit Btn
    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit"
    editBtn.classList.add("btn", "editBtn")
    li.appendChild(editBtn);
    
    //Creating delete Btn
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Remove"
    deleteBtn.classList.add("btn", "deleteBtn")
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    inputBox.value = "";

    saveLocalTodos(inputText); //save the todos to the local storage
    }
}

// Function to update : (Edit/Delete)
const updateTodo = (e)=>{
    // console.log(e.target.innerHTML);
    if(e.target.innerHTML === "Remove"){
        // console.log(e.target.parentElement);
        todoList.removeChild(e.target.parentElement);
        deleteLocalTodos(e.target.parentElement); //delete the todo from the local storage also
    }

    if(e.target.innerHTML === "Edit"){
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = "Edit";
        editTodo = e;
    }
}


// Function to save local todo
const saveLocalTodos = (todo) => {
    let todos;
    //console.log(localStorage.getItem("todos"));//Array of string
    //console.log(JSON.parse(localStorage.getItem("todos")));//object
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));//convert JSON string to JSON object, this first checks whether there is any lest items
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    //console.log(todos);
}

// Function to get local todo
const getLocalTodo = () => {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
        todos.forEach(todo => {
            
            //Creating p tag
            const li = document.createElement("li");
            const p = document.createElement("p");
            p.innerHTML = todo;
            li.appendChild(p);

    
            //Creating Edit Btn
            const editBtn = document.createElement("button");
            editBtn.innerText = "Edit"
            editBtn.classList.add("btn", "editBtn")
            li.appendChild(editBtn);
    
            //Creating delete Btn
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Remove"
            deleteBtn.classList.add("btn", "deleteBtn")
            li.appendChild(deleteBtn);

            todoList.appendChild(li);
            inputBox.value = "";

        });
    }
}

// Function to delete local todo
const deleteLocalTodos = (todo) => {
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    let todoText = todo.children[0].innerHTML;
    //console.log(todoText.children[0].innerHTML);//need to remove p tag from li
    let todoIndex = todos.indexOf(todoText);//gives the index of the removing li from the local storage
    //console.log(todoIndex);
    todos.splice(todoIndex, 1); //removes the deleted li from the original array(using splice function)
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Function to edit local todo
const editLocalTodos = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener('DOMContentLoaded', getLocalTodo); //when page is loaded it will get the todos from local storage
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);