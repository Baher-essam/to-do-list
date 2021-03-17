
//selectors
const clear = document.querySelector('.clear');
const dateElement = document.getElementById('date');
const list = document.getElementById('list');
const input = document.getElementById('input');

  //classes names 
const checked = "fa-check-circle";
const unchecked = "fa-circle-thin";
const lineThrough = 'lineThrough';

// Variables
let LIST, id;

// get item from localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
}else{
    // if data isn't empty
    LIST = [];
    id = 0;
  
}

// load items to the user's interface
function loadList(array){
  array.forEach(function(item){
      addToDo(item.name, item.id, item.done, item.trash);
  });
}

//event listners
  //add an item when the user hit enter key
  document.addEventListener('keyup', addKey);
  //target items that creaated dynamically
  list.addEventListener('click', dynamic);

// show today's date
const options = {weekday: 'long', month: 'short',day: 'numeric'};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString('en-US', options)


// add function todo
function addTodo(e, id, done, trash){
  if (trash){return;}

  const status = done ? checked : unchecked;
  const line = done ? lineThrough : "";

  const item = ` <li class="item">
                  <i class="fa ${status} co" job="complete" id="${id}"></i>
                  <p class="text ${line}">${e}</p>
                  <i class="fa fa-trash-o de" job="delete" id="${id}"></i> 
                </li> `;
  const postition ="beforeend";
  list.insertAdjacentHTML(postition,item);
}

function addKey(e){
  if(e.keyCode == 13){
    const todo = input.value;
    //if the input isn't empty
    if(todo){
      addTodo(todo, id, false, false);
      LIST.push({
        name: todo,
        id: id,
        done: false,
        trash:false
      });
      localStorage.setItem("TODO", JSON.stringify(LIST));
    }
    input.value ="";
  }
}





function completeToDo(element){
  element.classList.toggle(checked);
  element.classList.toggle(unchecked);
  element.parentNode.querySelector('.text').classList.toggle(lineThrough);
  LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove todo
function removeToDo(element){
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}



function dynamic(e){
  const element = e.target; // return the clicked element inside list
  const elementJob = element.attributes.job.value; // complete or delete
  
  if(elementJob == "complete"){
      completeToDo(element);
  }else if(elementJob == "delete"){
      removeToDo(element);
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
}


//clear local storage
clear.addEventListener('click', function() {
  localStorage.clear();
  location.reload();
})



//light mode with local storage
let lightMode = localStorage.getItem('lightMode');
const lightModeToggle = document.querySelector('#lightModeToggle');

const enableLightMode = () =>{
// add the class lightmode to the body
$('body').addClass('lightMode');
$('#lightModeToggle').removeClass('disabled');
$('#lightModeToggle').addClass('enabled');
//update lightmode at the local storage
localStorage.setItem('lightMode', 'enabled');

}

const disableLightMode = () =>{
  // remove the class lightmode to the body
  $('body').removeClass('lightMode');
  $('#lightModeToggle').removeClass('enabled');
  $('#lightModeToggle').addClass('disabled');
  //update lightmode at the local storage
  localStorage.setItem('lightMode', 'disabled');
}

//for remembering what was saved last time
  if ( lightMode === 'enabled')
    enableLightMode();


lightModeToggle.addEventListener("click", () => {
  lightMode = localStorage.getItem('lightMode');
  if (lightMode !== 'enabled')
  {
    enableLightMode();
    $('body').addClass('time');
  }
  else
  {
    disableLightMode();
    $('body').removeClass('time');
  }
});