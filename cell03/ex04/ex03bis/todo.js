document.addEventListener("DOMContentLoaded", loadTodos);

function newTodo() {
    let task = prompt("Enter a new TO DO:");
    if (task && task.trim() !== "") {
        addTodo(task.trim());
        saveTodos();
    }
}

function addTodo(text) {
    let ftList = document.getElementById("ft_list");

    let todoDiv = document.createElement("div");
    todoDiv.className = "todo";
    todoDiv.textContent = text;
    todoDiv.addEventListener("click", () => removeTodo(todoDiv));

    ftList.prepend(todoDiv);
}

function removeTodo(todo) {
    if (confirm("Do you really want to delete this TO DO?")) {
        todo.remove();
        saveTodos();
    }
}

function saveTodos() {
    let todos = [];
    document.querySelectorAll(".todo").forEach(todo => {
        todos.push(todo.textContent);
    });

    // ใช้ encodeURIComponent() เพื่อให้ `;` และอักขระพิเศษปลอดภัย
    let safeTodos = encodeURIComponent(JSON.stringify(todos));
    document.cookie = "todos=" + safeTodos + "; path=/";
}

function loadTodos() {
    let cookies = document.cookie.split("; ");
    let todoCookie = cookies.find(row => row.startsWith("todos="));
    
    if (todoCookie) {
        let todoList = JSON.parse(decodeURIComponent(todoCookie.split("=")[1]));
        todoList.reverse().forEach(todo => addTodo(todo)); // ให้ลำดับเหมือนเดิม
    }
}
