// ================================
// جلب العناصر
// ================================
let titleInput = document.querySelector("#title-task");
let descInput = document.querySelector("#desc-task");
let priorityInput = document.querySelector("#priority-task");
let dateInput = document.querySelector("#date-task");
let materialInput = document.querySelector("#material-task");
let tasksContent = document.querySelector("#tasks");
let btnAdd = document.querySelector("#btn-add");
let errorMsg = document.querySelector("#error-message");
let noDataMsg = document.querySelector("#message");
let score = 0;

// ================================
// مصفوفة المهام
// ================================
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// ================================
// عرض المهام
// ================================
function getTasks(list = tasks) {
  let content = "";

  if (list.length == 0) {
    tasksContent.innerHTML = noDataMsg.innerHTML;
    document.title = `المهام المنجزة 0 / 0`;
    return;
  }

  score = list.filter((item) => item.done).length;

  list.forEach((item) => {
    content += `
      <div class="card-task">
        <div class="head-task ${item.done ? "done" : ""}">
          <h3>${item.title}</h3>
          <div class="button">
            <button onclick="checkTask(${item.id})">
              ${item.done ? "تراجع" : "تم"}
            </button>
            <button onclick="updateTask(${item.id})">تعديل</button>
            <button onclick="deleteTask(${item.id})">حذف</button>
          </div>
        </div>

        <p class="${item.done ? "done" : ""}">${item.desc}</p>
        <p class="${item.done ? "done" : ""}">${item.material}</p>

        <div class="ff">
          <p class="${item.done ? "done" : ""}">${item.priority}</p>
          <p class="${item.done ? "done" : ""}">${item.date}</p>
        </div>
      </div>
    `;
  });

  tasksContent.innerHTML = content;
  document.title = `المهام المنجزة ${score} / ${tasks.length}`;
}

getTasks();

// ================================
// إضافة مهمة
// ================================
btnAdd.addEventListener("click", () => {
  let newTask = {
    id: Date.now(),
    title: titleInput.value,
    desc: descInput.value ? descInput.value : "بدون وصف",
    date: dateInput.value ? dateInput.value : "بدون تاريخ",
    priority: priorityInput.value ? priorityInput.value : "medium",
    material: materialInput.value ? materialInput.value : "مادة غير محددة",
    done: false,
  };

  if (titleInput.value == "" || titleInput.value.length < 3) {
    errorMsg.style.display = "block";
    return;
  }

  errorMsg.style.display = "none";

  tasks.push(newTask);
  document.forms[0].reset();

  saveStorage();
  getTasks()
  applyFilters();
});

// ================================
// التخزين
// ================================
function saveStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ================================
// حذف
// ================================
function deleteTask(id) {
  tasks = tasks.filter((item) => item.id != id);
  saveStorage();
  applyFilters();
}

// ================================
// تعديل
// ================================
function updateTask(id) {
  let titleTaskNew = prompt("عدل عنوان المهمة");

  if (!titleTaskNew || titleTaskNew.length < 3) return;

  tasks = tasks.map((item) => {
    if (item.id == id) {
      return { ...item, title: titleTaskNew };
    }
    return item;
  });

  saveStorage();
  applyFilters();
}

// ================================
// تم / تراجع
// ================================
function checkTask(id) {
  tasks = tasks.map((item) => {
    if (item.id == id) {
      return { ...item, done: !item.done };
    }
    return item;
  });

  saveStorage();
  applyFilters();
}

// ================================
// البحث
// ================================
function searchTasks() {
  applyFilters();
}

// ================================
// FILTER SYSTEM
// ================================
function applyFilters() {
  let result = [...tasks];

  //  البحث
  let searchValue = document.getElementById("search-task").value.toLowerCase();

  result = result.filter((item) => {
    return item.title.toLowerCase().includes(searchValue);
  });

  //  الحالة
  let status = document.getElementById("status-filter").value;

  if (status === "completed") {
    result = result.filter((item) => item.done);
  }

  if (status === "pending") {
    result = result.filter((item) => !item.done);
  }

  //  الأولوية
  let priority = document.getElementById("priority-filter").value;

  if (priority !== "all") {
    result = result.filter((item) => item.priority === priority);
  }

  //  الترتيب
  let sort = document.getElementById("sort-filter").value;

  if (sort === "date") {
    result.sort((a, b) => new Date(a.date) - new Date(b.date));
  }

  getTasks(result);
}

// URL
document.getElementById("url").innerHTML = `
URL الحالي : ${document.URL}
`;

// ربط الفلاتر
document.getElementById("search-task").addEventListener("keyup", applyFilters);
document.getElementById("status-filter").addEventListener("change", applyFilters);
document.getElementById("priority-filter").addEventListener("change", applyFilters);
document.getElementById("sort-filter").addEventListener("change", applyFilters);
