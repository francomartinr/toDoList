const input = document.querySelector("input"); //Entrada formulario
const addBtn = document.querySelector("#add-button"); //Botón agregar tarea
const list = document.querySelector("#todo-list");  //Lista de tareas
const empty = document.querySelector(".empty");  //Mensaje de lista vacía
const full = document.querySelector(".delete-all"); //Botón eliminar todas las tareas


full.style.display = "none";

addBtn.addEventListener('click', (e) => {
    e.preventDefault(); //No recarga la página al hacer click en botón
    const text = input.value;
    let completed = false;
    if (text !== "") {
        const li = document.createElement("li");
        const p = document.createElement("p");
        p.textContent = text;

        li.appendChild(p);
        li.appendChild(addDeleteBtn());
        li.appendChild(addUpBtn());
        li.appendChild(addDownBtn());
        list.appendChild(li);
        input.value = "";
        empty.style.display = "none";
        full.style.display = "block";

        if (completed) {
            p.classList.add("completed");
        }

        p.addEventListener("dblclick", toggleToDoItemState);
    }
    
});

function toggleToDoItemState() {
    if (this.classList.contains("completed")) {
        this.classList.remove("completed");
    } else {
        this.classList.add("completed");
    }
}




function addDeleteBtn() {
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "X";
    deleteBtn.className = "btn-delete";

    deleteBtn.addEventListener('click', (e) => {
        const item = e.target.parentElement;
        list.removeChild(item);

        const items = document.querySelectorAll("li");
        if (items.length == 0) {
            empty.style.display="block";
            full.style.display= "none";
        }
    })
    return deleteBtn;
}

function addUpBtn() {
    const upBtn = document.createElement('button');
    upBtn.textContent = "^";
    upBtn.className = "btn-up";

    upBtn.addEventListener('click', (e) => {
        const item = e.target.parentElement;
        
        if (item.previousElementSibling) {
            item.parentNode.insertBefore(item, item.previousElementSibling);
        }

    })
    return upBtn;
}

function addDownBtn() {
    const downBtn = document.createElement('button');
    downBtn.textContent = "v";
    downBtn.className = "btn-up";

    downBtn.addEventListener('click', (e) => {
        const item = e.target.parentElement;
        
        if (item.nextElementSibling) {
            item.parentNode.insertBefore(item.nextElementSibling, item);
        }

    })
    return downBtn;
}



full.addEventListener ('click', (e) => {
    var toDoItems = list.children;
    while (toDoItems.length > 0) {
        toDoItems.item(0).remove();
    }
    
})
