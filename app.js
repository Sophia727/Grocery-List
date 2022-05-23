//***select items from DOM***

//additems container
const input = document.querySelector(".additems-input");
const addItemsAction = document.querySelector('.additems-action');
const submit = document.querySelector(".additems-submit");

//displayitems container
const list = document.querySelector(".grocery-list");
const displayItemsAction = document.querySelector('.displayitems-action');
const clear = document.querySelector(".displayitems-clear");

// ***addEventListener(s)***
//submit items listeners
submit.addEventListener('click', addItem);

//check for localstorage
document.addEventListener("DOMContentLoaded", displayStorage);

//clearlist
clear.addEventListener("click", removeItems); //II)1)
//remove individual items
list.addEventListener("click", removeSingleItem); //II)2)

//*****functions*****
//add item
//I)
function addItem (event){
    event.preventDefault();
    let value = input.value;
    if (value === ''){
        //1)
        showAction(addItemsAction, "please add item to grocery list", false);
    } else {
        showAction(addItemsAction, `${value} added to the list`, true);
        //2)
        createItem(value);
        //3)
        updateStorage(value);
    }
}
        //1)
function showAction(element, text, value){
    if (value === true){
        element.classList.add('success');
        element.innerText = text;
        input.value = '';
        setTimeout(function(){
         element.classList.remove('success');
         }, 3000)
    } else {
        element.classList.add('alert');
        element,innerText = text;
        input.value = '';
        setTimeout(function(){
           element.classList.remove('alert');
        }, 3000)
    }
}
        //2)
function createItem(value){
    let parent = document.createElement('div');
        parent.classList.add('grocery-item');

    // let title = document.createElement('h4');
    //     title.classList.add('grocery-item__title');

    parent.innerHTML = `<h4 class="grocery-item__title">${value}</h4>
    <a href="#" class="grocery-item__link">
        <i class="far fa-trash-alt"></i>
    </a>` //check in case of error maybe the semicolomn is de trop *************
    list.appendChild(parent);
}
        //3)
function updateStorage(value){
    let groceryList;
    groceryList = localStorage.getItem('groceryList') ? JSON.parse(localStorage.getItem('groceryList')): [];
    groceryList.push(value);
    localStorage.setItem('groceryList', JSON.stringify('groceryList'));
}



//II)
//display items in local storage
function displayStorage(){
    let exists = localStorage.getItem('groceryList');
    if(exists){
        let storageItems = JSON.parse(localStorage.getItem('groceryList'));
        storageItems.forEach(function(element){
            createItem(element);
        });
    }
}



//III)
// 1)remove all items  
function removeItems(){
    //delete from local storage
    localStorage.removeItem('groceryList');
    let items = document.querySelectorAll('.grocery-item');

    if(items.length > 0){
        //removee each item from the list
        showAction(displayItemsAction,'All items deleted', false);
        items.forEach(function(element){
            list.removeChild(element);
        })
    } else {
        showAction(displayItemsAction, 'no items to delete', false);
    }
}

//2)remove single item
function removeSingleItem(event){
    event.preventDefault();

    let link = event.target.parentElement;
    if (link.classList.contains('grocery-item__link')){
        let text = link.previousElementSibling.innerHTML;
        let groceryItem = event.target.parentElement.parentElement;

        //remove from list
        list.removeChild(groceryItem);
        showAction(displayItemsAction,`${text} remove from the list`, true);

        //remove from local storage
        editStorage(text);
    }
}

        //  ^  function edit storage
        function editStorage(){
            let groceryItems = JSON.parse(localStorage.getItem('groceryList'));
            let index  = groceryItems.indexOf(item);

            groceryItems.splice(index, 1);
            //first delete existing list
            localStorage.removeItem('groceryList');
            //add new updated/edited list
            localStorage.setItem('groceryList', JSON.stringify(groceryItems));
        

        }  