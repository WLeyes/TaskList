const form = document.querySelector('#task__form');
const taskList =  document.querySelector('.collection');
const clearButton = document.querySelector('.task__btn--clear');
const filter = document.querySelector('.task--filter');
const taskInput = document.querySelector('#task__input');
const taskSubmit = document.querySelector('#task__submit');


// Load all event listeners
loadEventListeners();

// Loads all the event listeners
function loadEventListeners() {

  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  
  //Add Task event
  form.addEventListener('submit', addTask);
  
  // Remove Task
  taskList.addEventListener('click', removeTask);
  
  // Filter tasks
  filter.addEventListener('keyup', filterTasks);
  
  // Clear Task
  clearButton.addEventListener('click', clearTasks);
}



// Get Tasks from Local Storage
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
      // Create Element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(task));
  // Create new link element
  const link = document.createElement('a');
  // Add class name 
  link.className = 'delete-item secondary-content';
  // Add Icon
  link.innerHTML = '<i class="fas fa-trash"></i>';
  // Append the link to li
  li.appendChild(link);
  //Append li to the ul
  taskList.appendChild(li);
  });
}


// Add task
function addTask(e) {
  if(taskInput.value.trim() === '') {
    alert('Add a task!');
    return;
  } else {
    // Create Element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class name 
  link.className = 'delete-item secondary-content';
  // Add Icon
  link.innerHTML = '<i class="fas fa-trash"></i>';
  // Append the link to li
  li.appendChild(link);
  //Append li to the ul
  taskList.appendChild(li);

  // Store in Local Storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';
  // Prevent Default click action
  e.preventDefault();
  }
}



// Store Tasks in local storage
function storeTaskInLocalStorage(task) {
  let tasks;
  
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Remove task
function removeTask(e) {
  if(e.target.classList.contains('fa-trash') || e.target.hasAttribute('fill')) {
    if(confirm('Are you Sure?')){
      e.target.parentElement.parentElement.remove();
      //Remove from storage
      removeFromLocalStorage
      (e.target.parentElement.parentElement);
    }
  }
}

//Remove from local Storage
function removeFromLocalStorage(taskItem) {
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Filter task items
function filterTasks(e){
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach
  (function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
  
}



// Clear Tasks
function clearTasks(){

  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // Clear tasks from local storage
  clearAllTasksFromLocalStorage();
}

function clearAllTasksFromLocalStorage(){
  localStorage.clear();
}
