const todoList = document.querySelector(".todoList");
const inputTask = document.querySelector("#task-input");
const addBtn = document.querySelector("#task-submit");
// const editBtn = document.querySelector(".edit");
const deleteBtn = document.querySelector(".delete");
const deleteAllBtn = document.querySelector(".footer button");

inputTask.onkeyup = () => {
  let data = inputTask.value;

  if (data.trim() != 0) {
    addBtn.classList.add("active");
  } else {
    addBtn.classList.remove("active");
  }
};
allTasks();

// Onclick input content/add button
addBtn.onclick = () => {
  let data = inputTask.value;
  let getLocalStorage = localStorage.getItem("Todo");

  getLocalStorage == null
    ? (listArr = [])
    : (listArr = JSON.parse(getLocalStorage));

  listArr.push(data);
  localStorage.setItem("Todo", JSON.stringify(listArr));
  allTasks();
  addBtn.classList.remove("active");
};

// The Bones - Creating LI
function allTasks() {
  let getLocalStorage = localStorage.getItem("Todo");
  getLocalStorage == null
    ? (listArr = [])
    : (listArr = JSON.parse(getLocalStorage));

  const remainingTasks = document.querySelector(".remainingTasks");
  remainingTasks.textContent = listArr.length;
  listArr.length > 0
    ? deleteAllBtn.classList.add("active")
    : deleteAllBtn.classList.remove("active");

  let newLi = "";
  listArr.forEach((element, index) => {
    newLi += `<div class="list"><li><span>
    ${element}</span></li> <div class="buttons"><button class="delete" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></button></div></div>`;
  });

  todoList.innerHTML = newLi;
  inputTask.value = "";
}

// Edit Task -- do later
// function editable() {
//   let getLocalStorage = localStorage.getItem("Todo");
//   listArr = JSON.parse(getLocalStorage);
//   todoList.addEventListener("keypress", (e) => {
//     if (e.keyCode === 13) {
//       e.preventDefault();
//       return;
//     }
//   });
//   localStorage.setItem("Todo", JSON.stringify(listArr));
//   console.log(localStorage);
// }
// allTasks();

// Delete Task
function deleteTask(index) {
  let getLocalStorage = localStorage.getItem("Todo");
  listArr = JSON.parse(getLocalStorage);
  listArr.splice(index, 1);
  localStorage.setItem("Todo", JSON.stringify(listArr));
  allTasks();
}

// Delete All Button
deleteAllBtn.onclick = () => {
  listArr = [];
  localStorage.setItem("Todo", JSON.stringify(listArr));
  allTasks();
};
