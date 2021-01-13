var unorderedList = document.getElementById("unorderedList");
var dataBase = firebase.database().ref('toDo');
dataBase.on('child_added', function (data) {
    //Creating LIST
    var li = document.createElement("li");
    var liText = document.createTextNode(data.val().value);
    li.appendChild(liText);
    li.setAttribute("class", "list");

    //Delete Button
    var delbtn = document.createElement("button");
    var deltext = document.createTextNode("Delete");
    delbtn.appendChild(deltext);
    li.appendChild(delbtn);
    delbtn.setAttribute("class", "liBtn debtn btn btn-primary");
    delbtn.setAttribute("id", data.val().key);
    delbtn.setAttribute("onclick", "deleteTask(this)"); 

    //Edit Button
    var editBtn = document.createElement("button");
    var editText = document.createTextNode("Edit");
    editBtn.appendChild(editText);
    li.appendChild(editBtn);
    editBtn.setAttribute("class", "liBtn edbtn btn btn-primary");
    editBtn.setAttribute("id", data.val().key);
    editBtn.setAttribute("onclick", "editTask(this)");

    unorderedList.appendChild(li);
})

function addTask() {
    var taskToDo = document.getElementById("task");
    if (taskToDo.value === "") {
        alert("Added Task can't be empty!");
    }
    else {
        var key = dataBase.push().key;
        var todoTask = {
            value: taskToDo.value,
            key: key
        }
        dataBase.child(key).set(todoTask)
    }
    taskToDo.value = ""}

function deleteTask(x) {
    dataBase.child(x.id).remove();
    x.parentNode.remove();
}

function deleteAll() {
    dataBase.remove();
    unorderedList.innerHTML = "";
}

function editTask(y) {
    var change = prompt("Enter New Task", y.parentNode.firstChild.nodeValue)
    var editTodo = {
        value : change,
        key : y.id
    }
    dataBase.child(y.id).set(editTodo)
    y.parentNode.firstChild.nodeValue = change;
}