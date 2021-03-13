//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const deleteBtn = document.querySelector('.trash-btn');
const filterOption = document.querySelector('.filter-items');

//Event Listeners
document.addEventListener('DOMContentLoaded', previewTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterItems);



//Functions
function addTodo(event){
    //prevent form from submitting
    event.preventDefault();

    if(todoInput.value === ''){
      alert('this is wrong');
    }
    else{
      //todo div
      const todoDiv = document.createElement('div');
      todoDiv.classList.add('todo');
      //create an li todo item
      const newTodo = document.createElement('li');
      newTodo.innerText = todoInput.value;
      newTodo.classList.add('todo-item');
      //adding li inside todoDiv
      todoDiv.appendChild(newTodo);
      //adding todo to local storage
      saveLocalTodos(todoInput.value);
      //completed button 
      const completedButton = document.createElement('button');
      completedButton.innerHTML =`<i class="fas fa-check"></i>`;
      completedButton.classList.add('complete-btn')
      todoDiv.appendChild(completedButton);
      //trash button
      const trashButton = document.createElement('button');
      trashButton.innerHTML =`<i class="fas fa-trash"></i>`;
      trashButton.classList.add('trash-btn')
      todoDiv.appendChild(trashButton);
      //append to ul list
      todoList.appendChild(todoDiv);
      //clear todo input value after adding item
      todoInput.value='';
    }
 
}

function deleteCheck(e){
    const item = e.target;
    //delete todo item
    if(item.classList[0] === 'trash-btn'){
      const todo = item.parentElement;
      item.parentElement.classList.add('fall');
      removeLocalTodos(todo);
      //for animation first then remove
      item.parentElement.addEventListener('transitionend', function(){
        item.parentElement.remove();
      })
    }
    //checked todo item
    if(item.classList[0] === 'complete-btn')   {
      item.parentElement.classList.toggle('completed');  
    }
}

//filter todos item
function filterItems(e) {
  const todos = document.querySelectorAll('.todo');
  // i finr childrens with selector alll
  todos.forEach((todo) => {
    switch(e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'completed':
        if(todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if(!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  })
}

//save to local storage

function saveLocalTodos(todo){
  //check if I have todos at local storage
  let todos;
  if(localStorage.getItem('todos') === null)
  {
    todos = [];
  }
  else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}


//preview todos from local storage
function previewTodos(){
  //check if I have todos at local storage
  if(localStorage.getItem('todos') === null)
  {
    todos = [];
  }
  else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function(todo){
        //todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //create an li todo item
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        //adding li inside todoDiv
        todoDiv.appendChild(newTodo);
        //completed button 
        const completedButton = document.createElement('button');
        completedButton.innerHTML =`<i class="fas fa-check"></i>`;
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton);
        //trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML =`<i class="fas fa-trash"></i>`;
        trashButton.classList.add('trash-btn')
        todoDiv.appendChild(trashButton);
        //append to ul list
        todoList.appendChild(todoDiv);
        //clear todo input value after adding item
        todoInput.value='';
  })
}

//remove local todos
function removeLocalTodos(todo){
  let todos;
  if(localStorage.getItem('todos') === null)
  {
    todos = [];
  }
  else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex),1);
  localStorage.setItem('todos', JSON.stringify(todos));
}