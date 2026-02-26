let todos = [];

// wait for DOM so elements are available
window.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('todoInput');
  const addBtn = document.getElementById('addBtn');
  const list = document.getElementById('todolist');

  // load saved todos (if any)
  const stored = localStorage.getItem('todos');
  if (stored) {
    try { todos = JSON.parse(stored); } catch {}
  }

  addBtn.addEventListener('click', addTodo);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') addTodo();
  });

  renderTodos();

  function addTodo() {
    const todoText = input.value.trim();

    if (todoText) {
      todos.push({ text: todoText, completed: false });
      input.value = '';
      saveAndRender();
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
    saveAndRender();
  }

  function deleteTodo(index) {
    todos.splice(index, 1);
    saveAndRender();
  }

  function saveAndRender() {
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
  }
});

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