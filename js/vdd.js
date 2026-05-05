
// let mood = "create";
// // جلب العناصر
// let tasksContainer = document.getElementById("tasks");
// let tempId;
// let titleTask = document.querySelector("#title-task");
// let descTask = document.querySelector("#desc-task");
// let priorityTask = document.querySelector("#priority-task");
// let dateTask = document.querySelector("#date-task");
// let mesage = document.getElementById("message");
// let materialTask = document.querySelector("#material-task");
// let btnAdd = document.querySelector("#btn-add");
// let errorMessage = document.querySelector("#error-message");
// let searchInput = document.getElementById("search-task");
// let statusFilter = document.getElementById("status-filter");
// let priorityFilter = document.getElementById("priority-filter");
// let sortFilter = document.getElementById("sort-filter");
// let navBar = document.getElementById("all-task");
// let total = document.createElement("p");
// let completed = document.createElement("p");
// let late = document.createElement("p");
// navBar.append(total, completed, late);
// navBar.style.display = "flex";
// navBar.style.gap = "20px";
// document.getElementById("tool").appendChild(navBar);

// // تعريف المصفوفة
// let tasks;

// // جلب من localStorage
// if (localStorage.getItem("tasks")) {
//   tasks = JSON.parse(localStorage.getItem("tasks"));
// } else {
//   tasks = [
//     {
//       id: crypto.randomUUID(),
//       title: "task1",
//       desc: "this is desc task 1",
//       priority: "mid",
//       material: "qq",
//       date: "2020-11-22",
//       done: false,
//     },
//   ];
// }

// // منع الفورم من الارسال
// document.forms[0].addEventListener("submit", (e) => {
//   e.preventDefault();
// });

// // دالة جلب المهام
// let getTasks = () => {
//   let filteredTasks = [...tasks];
//   let searchValue = searchInput.value.toLowerCase();
//   if (searchValue) {
//     filteredTasks = filteredTasks.filter((t) =>
//       t.title.toLowerCase().includes(searchValue),
//     );
//   }

  
//   if (statusFilter.value === "completed") {
//     filteredTasks = filteredTasks.filter((t) => t.done);
//   } else if (statusFilter.value === "pending") {
//     filteredTasks = filteredTasks.filter((t) => !t.done);
//   }

//   if (priorityFilter.value !== "all") {
//     filteredTasks = filteredTasks.filter(
//       (t) => t.priority === priorityFilter.value,
//     );
//   }

//   if (sortFilter.value === "date") {
//     filteredTasks.sort((a, b) => new Date(a.date) - new Date(b.date));
//   }


//   let totalCount = tasks.length;
//   let completedCount = tasks.filter((t) => t.done).length;

//   total.textContent = `الاجمالي: ${totalCount}`;
//   completed.textContent = `المكتمل: ${completedCount}`;
//   document.title = `${completedCount}/${totalCount}`;

//   // عرض
//   if (filteredTasks.length === 0) {
//     tasksContainer.innerHTML = "";
//     mesage.style.display = "block";
//     return;
//   }

//   mesage.style.display = "none";

//   let content = "";

//   filteredTasks.forEach((item) => {
//     content += `
//       <div class="card-task ${item.done ? "done" : ""}">
//         <div class="head-task">
//           <h3>${item.title}</h3>
//           <div class="button">
//             <button onclick="checkTask('${item.id}')">
//               ${item.done ? "تراجع" : "تم"}
//             </button>
//             <button onclick="updateTask('${item.id}')">تعديل</button>
//             <button onclick="deleteTask('${item.id}')">حذف</button>
//           </div>
//         </div>

//         <p>${item.desc}</p>
//         <p>${item.material}</p>

//         <div class="ff">
//           <p>${item.priority}</p>
//           <p>${item.date}</p>
//         </div>
//       </div>
//     `;
//   });

//   tasksContainer.innerHTML = content;
// };

// getTasks();

// statusFilter.onchange = getTasks;
// priorityFilter.onchange = getTasks;
// sortFilter.onchange = getTasks;
// searchInput.onkeyup = getTasks;

// // اضافة مهمة جديدة
// btnAdd.addEventListener("click", () => {
//   let newTask = {
//     id: crypto.randomUUID(),
//     title: titleTask.value,
//     desc: descTask.value,
//     priority: priorityTask.value,
//     material: materialTask.value,
//     date: dateTask.value,
//     done: false,
//   };

//   if (mood == "create") {
//     if (titleTask.value.trim().length < 3) {
//       errorMessage.style.display = "block";
//       return;
//     }
//     errorMessage.style.display = "none";
//     tasks.push(newTask);
//   } else {
//     tasks = tasks.map((item) => {
//       if (item.id === tempId) {
//         return { ...item, ...newTask };
//       }
//       return item;
//     });

//     mood = "create";
//     btnAdd.textContent = "إضافة";
//   }

//   getTasks();
//   saveStorage();
//   cleanData();
// });

// // حفظ المهام في اللوكال الستوريج
// function saveStorage() {
//   localStorage.setItem("tasks", JSON.stringify(tasks));
// }

// // حذف مهمة معينة
// function deleteTask(id) {
//   tasks = tasks.filter((item) => item.id !== id);
//   getTasks();
//   saveStorage();
// }

// //تنظيف الحقول
// function cleanData() {
//   titleTask.value = "";
//   descTask.value = "";
//   materialTask.value = "";
//   priorityTask.value = "";
//   dateTask.value = "";
// }

// // التحقق من حالة المهمة
// function checkTask(id) {
//   tasks = tasks.map((item) => {
//     if (item.id === id) {
//       return { ...item, done: !item.done };
//     }
//     return item;
//   });

//   saveStorage();
//   getTasks();
// }

// //تعديل مهمة معينة
// function updateTask(id) {
//   let task = tasks.find((item) => item.id === id);

//   titleTask.value = task.title;
//   descTask.value = task.desc;
//   materialTask.value = task.material;
//   priorityTask.value = task.priority;
//   dateTask.value = task.date;

//   mood = "update";
//   tempId = id;
//   btnAdd.textContent = "تحديث";

//   window.scroll({ top: 0, behavior: "smooth" });
// }
