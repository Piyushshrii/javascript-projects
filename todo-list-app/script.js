document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input")
const addTaskButton = document.getElementById("add-task-btn")
const todoList = document.getElementById("todo-list")


let tasks = JSON.parse(localStorage.getItem("tasks")) || [] ; ; // parse the code json into a array of tasks then get items for local storage when dom content is loaded or empty stringif none
tasks.forEach(task => returnTask(task));

addTaskButton.addEventListener("click", () => {
    const taskText = todoInput.value.trim() 
    if (taskText === "") return ; //checks if null or empty string isnt passed
 
    //create a newTask object 
    const newTask = {
        id : Date.now(),
        text : taskText,
        completed : false
    }
    tasks.push(newTask)
    saveTask();
    returnTask(newTask)
    todoInput.value = ""; //clear previous input
    console.log(tasks)
})

function returnTask(task){
    const li = document.createElement('li')
    li.setAttribute('data-id',task.id)
    if(task.completed) li.classList.add('completed')
    li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>`;
    li.addEventListener('click', (e) => {
        if(e.target.tagName === 'BUTTON') return
        task.completed = !task.completed
        li.classList.toggle('completed')
        saveTask();
            
    })
    li.querySelector('button').addEventListener('click', (e) => {
        e.stopPropagation()  //prevent toggle from firing
        tasks = tasks.filter(t => t.id!== task.id)  //only the selected element will be seclected for removal
        li.remove();
        saveTask();

    })




    todoList.appendChild(li)
    
}

// add task array to local storage and convert it into json format 
function saveTask(){
    localStorage.setItem("tasks", JSON.stringify(tasks))
}
})