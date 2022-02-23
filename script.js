const todoTitle = document.querySelector("#todoTitle");
const todoText = document.querySelector("#todoText");
const btnAdd = document.querySelector(".btnAdd");
const count = document.querySelectorAll("#count>span");
const todoItems = document.querySelector(".todoItems");

function createNullTodo() {
  if (!window.localStorage.getItem("todos")) {
    window.localStorage.setItem("todos", JSON.stringify([]));
  }
}

function controlTexts() {
  if (todoTitle.value == "" || todoText.value == "") {
    alertNatf("red", "Boş değer bulunmakta");

    throw new Error("EMPTY_VALUE");
  }
}

function resetIds() {
  var a = eval(window.localStorage.getItem("todos"));
  for (i = 0; i < a.length; i++) {
    a[i].id = i;
  }
  window.localStorage.setItem("todos", JSON.stringify(a));
}

function addTodo() {
  controlTexts();
  createNullTodo();
  resetIds();
  var a = eval(window.localStorage.getItem("todos"));
  todo = {
    title: todoTitle.value,
    text: todoText.value,
    class: "0",
    id: `${a.length}`,
  };
  a.push(todo);
  window.localStorage.setItem("todos", JSON.stringify(a));
  alertNatf("green", "Todo başarıyla eklendi");
  showTodos();
}

function setTodoCounts() {
  var td = 0;
  var ip = 0;
  var c = 0;
  var a = eval(window.localStorage.getItem("todos"));
  for (i = 0; i < a.length; i++) {
    switch (a[i].class) {
      case "0":
        td = td + 1;
        break;

      case "1":
        ip = ip + 1;
        break;

      case "2":
        c = c + 1;
        break;
    }
  }
  count[0].innerText = td;
  count[1].innerText = ip;
  count[2].innerText = c;
}

function deleteTodo(id) {
  var a = eval(window.localStorage.getItem("todos"));
  b = [];
  for (i = 0; i < a.length; i++) {
    if (i == id) {
      continue;
    }
    b.push(a[i]);
  }

  window.localStorage.setItem("todos", JSON.stringify(b));
  resetIds();
  setTodoCounts();

  showTodos();
}

function createTodoElement(title, text, value, clas) {
  a = `<div class="todoItem" id="todo${value}" todoClass="${clas}" draggable="true"><span id="close" value="${value}">&#9587;	
  </span>
<span class="title">${title}</span>
<p class="text">${text}</p>
</div>`;
  return $.parseHTML(a)[0];
}

function showTodos() {
  var a = eval(window.localStorage.getItem("todos"));
  var b = document.querySelectorAll(".todoItems");
  for (i = 0; i < b.length; i++) {
    b[i].innerHTML = " ";
  }

  setTodoCounts();
  for (i = 0; i < a.length; i++) {
    var obj = createTodoElement(a[i].title, a[i].text, a[i].id, a[i].class);

    obj.ondragstart = function (ev) {
      startDrag(ev, parseInt(this.getAttribute("todoClass")));
    };
    b[parseInt(a[i].class)].appendChild(obj);
  }
  c = document.querySelectorAll("#close");
  for (i = 0; i < c.length; i++) {
    c[i].onclick = function () {
      deleteTodo(this.getAttribute("value"));
    };
  }
}

function startDrag(ev, id) {
  var a = document.querySelectorAll(".todoItems");
  ev.dataTransfer.setData("text", ev.target.id);
  b = [];
  for (i = 0; i < a.length; i++) {
    if (i == id) {
      console.log(id);
      continue;
    }
    b.push(a[i]);
  }
  a = b;
  for (i = 0; i < a.length; i++) {
    a[i].style.backgroundColor = "rgba(106, 183, 255, 0.25)";
    a[i].style.border = "5px dotted grey";
  }
}

function allowDrop(ev) {
  ev.preventDefault();
}

$(document).ready(function () {
  btnAdd.addEventListener("click", () => addTodo());
  showTodos();
  var a = document.querySelectorAll(".todoItems");

  for (i = 0; i < a.length; i++) {
    a[i].ondrop = function (ev) {
      var b = document.querySelectorAll(".todoItems");
      for (l = 0; l < b.length; l++) {
        a[l].style.backgroundColor = "rgba(106, 183, 255, 0)";
        a[l].style.border = "";
      }

      ev.preventDefault();
      var data = ev.dataTransfer.getData("text");
      ev.target.appendChild(document.getElementById(data));
      document
        .getElementById(data)
        .setAttribute("todoclass", this.getAttribute("value"));
      var c = eval(window.localStorage.getItem("todos"));
      c[data[data.length - 1]].class = this.getAttribute("value");
      window.localStorage.setItem("todos", JSON.stringify(c));
      setTodoCounts();
      showTodos();
    };
  }
});
