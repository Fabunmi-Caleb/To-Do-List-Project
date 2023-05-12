const body = document.querySelector("body");
const section1 = document.querySelector("#section1");
const addToDoInput = document.querySelector("#addToDoInput");
const submitBtn = document.querySelector("#submitBtn");
const toDoListItems = document.querySelector("#toBeAppendedTo");
const clearAllButton = document.querySelector("#clearAllButton");
let markedTodDos = [];
////The Code below is for the initialization of the local storage array.
let toDosArray = localStorage.getItem("todos");
if(toDosArray){
    toDosArray = JSON.parse(toDosArray);
}else{
    toDosArray = [];
}



submitBtn.addEventListener("click", function(){
    // console.log(addToDoInput.value);
    // toDoListItems.appendChild(document.createElement("li"));
    if(addToDoInput.value !== ""){
    const newLi = document.createElement("li");
    const newInput = document.createElement("input");
    const newLabel = document.createElement("label");
    const newIcon = document.createElement("i");
    newLi.classList.add("list-group-item");
    newLi.setAttribute("draggable" , "true");
    newInput.classList.add("form-check-input");
    newInput.type = "checkbox";
    newLabel.classList.add("form-check-label")
    newLabel.innerText = addToDoInput.value;
    newLabel.style.paddingLeft="7px";
    newIcon.classList.add("fa-solid")
    newIcon.classList.add("fa-trash-can");
    newIcon.style.float="right";
    newIcon.style.paddingTop="5px";
    newIcon.addEventListener("mouseover", function(){
        newIcon.classList.add("changeToRed");
    })
    newIcon.addEventListener("mouseout", function(){
        newIcon.classList.remove("changeToRed");
    })
    newLi.appendChild(newInput);
    newLi.appendChild(newLabel);
    newLi.appendChild(newIcon);
    toDoListItems.appendChild(newLi);
    addToDoInput.value="";

//THIS EVENT LISTENER IS TO DELETE A TODO
    newIcon.addEventListener("click", function(){
        // newLi.remove();
        toDoListItems.removeChild(newLi);
    })

//THIS EVENT LISTENER IS TO MARK A TODO AS DONE BY CHECKBOX AND CROSSING IT
    newInput.addEventListener("change", function(){
        if(newInput.checked){
            // console.log("To Do List was Checked");
            newLabel.classList.add("disabledLineThrough");
            markedTodDos.push(newLi);
        }if(!newInput.checked){
            newLabel.classList.remove("disabledLineThrough");
            // console.log(markedTodDos);
            // console.log(newLi);
            console.log(newLabel.innerText , markedTodDos.indexOf(newLi));
            markedTodDos.splice(markedTodDos.indexOf(newLi), 1);
        }
    })


//THIS EVENT LISTENER IS TO REMOVE ALL SELECTED ITEMS AT ONCE
    clearAllButton.addEventListener("click", function(){
        const [...nodesss] = markedTodDos;
        for(let eachNode of nodesss){
            // console.log(eachNode);
            eachNode.remove();
        }
    })

    
//THIS EVENT LISTENER IS TO ADD THE DRAG AND DROP FEATURE
    newLi.addEventListener("dragstart", function(){
        newLi.style.backgroundColor = "black";
        newLi.style.color = "white";
        newLi.classList.add("randomClass");
    })
    newLi.addEventListener("dragend", function(){
        newLi.style.backgroundColor = "white";
        newLi.style.color = "black";
        newLi.classList.remove("randomClass");
    })

    toDoListItems.addEventListener("dragover" , function(e){
        //This is to prevent the cursor from turning disabled because naturally you shouldnt be able to drag an element on another element
        e.preventDefault();
        const afterElement = getElementBelowTask(toDoListItems, e.clientY);
        const draggableListItem = document.querySelector(".randomClass");
        if(afterElement === null){
            toDoListItems.appendChild(draggableListItem);
        } else{
            toDoListItems.insertBefore(draggableListItem, afterElement)
        }
    })

    function getElementBelowTask(container,y){
        const elementsNotBeingDragged = [...container.querySelectorAll(".list-group-item:not(.randomClass)")];
        return elementsNotBeingDragged.reduce((closest , child)=>{
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if(offset<0 && offset > closest.offset){
                return {offset:offset , element:child}
            }
            else{
                return closest;
            }
        },{offset: Number.NEGATIVE_INFINITY}).element
    }

    //THIS EVENT LISTENER IS TO MAKE THE TODO EDITABLE
    newLi.addEventListener("dblclick" , function(){
        newLi.contentEditable = "true";
        newInput.contentEditable = "false";
        newIcon.contentEditable = "false";
        section1.addEventListener("mouseleave", function(){
                newLi.contentEditable = "false";
        })
        newLi.addEventListener("keydown", function(e){
            if(e.key === "Enter"){
                newLi.contentEditable = "false";
            }
        })
    })

    ///THIS IS TO IMPLEMENT THE LOCAL STORAGE FEATURE

    toDosArray.push(newLabel.innerText);
    localStorage.setItem("toDo" , JSON.stringify(toDosArray));
    console.log(toDosArray);
    window.addEventListener("beforeunload", function(e){
        for(let eachTodo of toDosArray){
            let newerLabel = document.createElement("label");
            let newerLi = document.createElement("li");
            newerLabel.innerText = eachTodo;
            newerLi.appendChild(newLabel);
            // newLabel.innerText = eachTodo;
            // newLi.appendChild(newLabel);
            toDoListItems.appendChild(newerLi);
        } 
    })
        

    


}
})


////THIS IS FOR PRESSING THE ENTER KEY WHEN ADDING A NEW TODO LIST INSTEAD OF USING THE CHECK BUTTON

addToDoInput.addEventListener("keydown", function(e){
    if(addToDoInput.value !== ""){
    if(e.key === "Enter"){
    // console.log(addToDoInput.value);
    // toDoListItems.appendChild(document.createElement("li"));
    const newLi = document.createElement("li");
    const newInput = document.createElement("input");
    const newLabel = document.createElement("label");
    const newIcon = document.createElement("i");
    newLi.classList.add("list-group-item");
    newLi.setAttribute("draggable" , "true");
    newInput.classList.add("form-check-input");
    newInput.type = "checkbox";
    newLabel.classList.add("form-check-label")
    newLabel.innerText = addToDoInput.value;
    newLabel.style.paddingLeft="7px";
    newIcon.classList.add("fa-solid")
    newIcon.classList.add("fa-trash-can");
    newIcon.style.float="right";
    newIcon.style.paddingTop="5px";
    newIcon.addEventListener("mouseover", function(){
        newIcon.classList.add("changeToRed");
    })
    newIcon.addEventListener("mouseout", function(){
        newIcon.classList.remove("changeToRed");
    })
    newLi.appendChild(newInput);
    newLi.appendChild(newLabel);
    newLi.appendChild(newIcon);
    // newLi.innerHTML = addToDoInput.value;
    toDoListItems.appendChild(newLi);
    addToDoInput.value="";


    newIcon.addEventListener("click", function(){
        // newLi.remove();
        toDoListItems.removeChild(newLi);
    })

    newInput.addEventListener("change", function(){
        if(newInput.checked){
            // console.log("To Do List was Checked");
            newLabel.classList.add("disabledLineThrough");
            markedTodDos.push(newLi);
        }if(!newInput.checked){
            newLabel.classList.remove("disabledLineThrough");
            // console.log(markedTodDos);
            // console.log(newLi);
            console.log(newLabel.innerText , markedTodDos.indexOf(newLi));
            markedTodDos.splice(markedTodDos.indexOf(newLi), 1);
        }
    })
    // console.log(markedTodDos);

    clearAllButton.addEventListener("click", function(){
        // console.log(markedTodDos);
        const [...nodesss] = markedTodDos;
        for(let eachNode of nodesss){ 
            // console.log(eachNode);
            eachNode.remove();
        }
    })

    newLi.addEventListener("dragstart", function(){
        newLi.style.backgroundColor = "black";
        newLi.style.color = "white";
        newLi.classList.add("randomClass");
    })
    newLi.addEventListener("dragend", function(){
        newLi.style.backgroundColor = "white";
        newLi.style.color = "black";
        newLi.classList.remove("randomClass");
    })

    toDoListItems.addEventListener("dragover" , function(e){
        //This is to prevent the cursor from turning disabled because naturally you shouldnt be able to drag an element on another element
        e.preventDefault();
        const afterElement = getElementBelowTask(toDoListItems, e.clientY);
        const draggableListItem = document.querySelector(".randomClass");
        if(afterElement === null){
            toDoListItems.appendChild(draggableListItem);
        } else{
            toDoListItems.insertBefore(draggableListItem, afterElement)
        }
    })

    function getElementBelowTask(container,y){
        // return container.querySelectorAll(".draggableListItem:not(.randomClass)");
        // return container.querySelectorAll(".list-group-item:not(.randomClass)")
        // return elementsNotBeingDragged;
        const elementsNotBeingDragged = [...container.querySelectorAll(".list-group-item:not(.randomClass)")];
        return elementsNotBeingDragged.reduce((closest , child)=>{
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if(offset<0 && offset > closest.offset){
                return {offset:offset , element:child}
            }
            else{
                return closest;
            }
        },{offset: Number.NEGATIVE_INFINITY}).element
    }



}
}
})