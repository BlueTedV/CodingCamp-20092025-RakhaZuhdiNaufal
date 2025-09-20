 const form = document.getElementById("todo-form");
      const todoList = document.getElementById("todo-list");
      const searchInput = document.getElementById("search-input");
      const sortSelect = document.getElementById("sort-select");
      const deleteAllBtn = document.getElementById("delete-all");

      let todos = [];

      function renderTodos() {
        let filtered = todos.filter((todo) => {
          const q = searchInput.value.trim().toLowerCase();
          return (
            todo.title.toLowerCase().includes(q) ||
            todo.desc.toLowerCase().includes(q)
          );
        });
        if (sortSelect.value === "title") {
          filtered.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortSelect.value === "title-desc") {
          filtered.sort((a, b) => b.title.localeCompare(a.title));
        } else if (sortSelect.value === "date") {
          filtered.sort((a, b) => a.date.localeCompare(b.date));
        } else if (sortSelect.value === "date-desc") {
          filtered.sort((a, b) => b.date.localeCompare(a.date));
        }
        todoList.innerHTML = "";
        filtered.forEach((todo, idx) => {
          const li = document.createElement("li");
          li.className = todo.completed ? "todo-completed" : "";
          li.innerHTML = `
            <div class="todo-main">
              <span class="todo-title">${todo.title}</span>
              <span class="todo-desc">${todo.desc}</span>
              <span class="todo-date">Due: ${todo.date}</span>
            </div>
            <div class="todo-actions">
              <input type="checkbox" class="todo-checkbox" ${
                todo.completed ? "checked" : ""
              } data-idx="${todos.indexOf(todo)}" />
              <button class="todo-delete" data-idx="${todos.indexOf(
                todo
              )}">Delete</button>
            </div>
          `;
          todoList.appendChild(li);
        });
        // Add event listeners for checkboxes and delete buttons
        document.querySelectorAll(".todo-checkbox").forEach((cb) => {
          cb.addEventListener("change", function () {
            const i = parseInt(this.getAttribute("data-idx"));
            todos[i].completed = this.checked;
            renderTodos();
          });
        });
        document.querySelectorAll(".todo-delete").forEach((btn) => {
          btn.addEventListener("click", function () {
            const i = parseInt(this.getAttribute("data-idx"));
            todos.splice(i, 1);
            renderTodos();
          });
        });
      }

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        const title = document.getElementById("task-title").value.trim();
        const desc = document.getElementById("task-desc").value.trim();
        const date = document.getElementById("todo-date").value;
        if (title && desc && date) {
          todos.push({ title, desc, date, completed: false });
          renderTodos();
          form.reset();
        }
      });

      searchInput.addEventListener("input", renderTodos);
      sortSelect.addEventListener("change", renderTodos);
      deleteAllBtn.addEventListener("click", function () {
        if (todos.length === 0) return;
        if (confirm("Are you sure you want to delete all tasks?")) {
          todos = [];
          renderTodos();
        }
      });