const SECRET_KEY = "MySecretKey123"; // ใช้สำหรับเข้ารหัสและถอดรหัส

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
            todoDiv.textContent = text; // ป้องกัน XSS
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

            let jsonData = JSON.stringify(todos);
            let encryptedData = CryptoJS.AES.encrypt(jsonData, SECRET_KEY).toString();
            document.cookie = "todos=" + encodeURIComponent(encryptedData) + "; path=/";
        }

        function loadTodos() {
            let cookies = document.cookie.split("; ");
            let todoCookie = cookies.find(row => row.startsWith("todos="));

            if (todoCookie) {
                let encryptedData = decodeURIComponent(todoCookie.split("=")[1]);

                try {
                    let decryptedData = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY).toString(CryptoJS.enc.Utf8);
                    let todoList = JSON.parse(decryptedData);
                    todoList.reverse().forEach(todo => addTodo(todo)); // ให้ลำดับเหมือนเดิม
                } catch (e) {
                    console.error("Failed to decrypt data:", e);
                }
            }
        }