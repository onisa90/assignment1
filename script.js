let todos = [];

const input = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('todolist');

addBtn.addEventListener('click', addTodo);

function addTodo() {
  const todoText = input.value.trim();

  if (todoText) {
    todos.push({ text: todoText, completed: false });
    input.value = '';
    renderTodos();
  }
}

function renderTodos() {
  list.innerHTML = '';

  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.textContent = todo.text;

    if (todo.completed) {
      li.style.textDecoration = "line-through";
    }

    li.addEventListener('click', () => toggleComplete(index));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';

    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteTodo(index);
    });

    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

function toggleComplete(index) {
  todos[index].completed = !todos[index].completed;
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  renderTodos();
}