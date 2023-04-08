// Get elements
const form = document.querySelector('.form-submit');
const input = document.querySelector('.input-text');
const addButton = document.querySelector('#add-btn');
const todoList = document.querySelector('#todo-list');

// Create a list to store the todo items
let todos = [];

// Add todo item
function addTodo() {
  const todo = {
    id: Date.now(),
    text: input.value,
  };
  todos.push(todo);
  renderTodos();
  input.value = '';
}

// Render all todo items
function renderTodos() {
  // Clear the todo list first
  todoList.innerHTML = '';
  // Loop through the todos array and create a list item for each todo item
  todos.forEach(todo => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${todo.text}</span>
      <button class="edit-btn btn btn-primary" data-id="${todo.id}">Edit</button>
      <button class="delete-btn btn btn-danger" data-id="${todo.id}">Delete</button>
    `;
    todoList.appendChild(li);

    // Add event listeners to the edit and delete buttons
    const editButton = li.querySelector('.edit-btn');
    const deleteButton = li.querySelector('.delete-btn');
    editButton.addEventListener('click', editTodo);
    deleteButton.addEventListener('click', () => deleteTodo(todo.id));
  });
}

// Delete a todo item
function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
}

// Edit a todo item
function editTodo() {
  const id = Number(this.dataset.id);
  const todo = todos.find(todo => todo.id === id);
  const newText = prompt('Enter new text', todo.text);
  if (newText) {
    todo.text = newText;
    renderTodos();
  }
}

// Add event listeners
addButton.addEventListener('click', addTodo);
