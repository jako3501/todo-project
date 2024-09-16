import './style.css'

// Step 1: Interface for Todo types
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// step 2: Initialize the todos array
let todos: Todo[] = []

// Step 3: Create a reference to the HTML elements
const todoInput = document.getElementById('todo-input') as HTMLInputElement
const todoList = document.getElementById('todo-list') as HTMLUListElement
const todoForm = document.querySelector('.todo-form') as HTMLFormElement

// Step 4: Create a function to add new todos
const addTodo = (text: string): void => {
  const newTodo: Todo = {
    id: Date.now(),
    title: text,
    completed: false
  }

  todos.push(newTodo) // Add the new todo to the todos array
  console.log('todo added', todos);
  renderTodos() // Renders the todos when new todo is added (refreshing the list every time a new todo is added)
}

// Step 5: Create a function to render the todos
const renderTodos = (): void => {
  todoList.innerHTML = ''

  todos.forEach(todo => {
    const li = document.createElement('li')
    li.className = 'todo-item'
    li.innerHTML = `
    <span>${todo.title}</span>
    <button>Remove</button>
    <button id="editBtn">Edit</button>`;
    
    addRemoveButtonListener(li, todo.id)
    addEditButtonListener(li, todo.id)
    todoList.appendChild(li)
  })
}

renderTodos()

// Step 6: Create event listener
todoForm.addEventListener('submit', (e) => {
  e.preventDefault() // preventDefault stops the whole page from reloading every time we add a new todo
  const text = todoInput.value.trim() // Trim removes any white spaces in the input field
  if (text !== '') {
    addTodo(text)
  }
})

const addRemoveButtonListener = (li: HTMLLIElement, id: number) => {
  const removeButton = li.querySelector('button')
  removeButton?.addEventListener('click', () => removeTodo(id))
}

// removeTodo function
const removeTodo = (id: number) => {
  todos = todos.filter(todo => todo.id !== id)
  renderTodos()
}


// Add edit buttion

const addEditButtonListener = (li: HTMLLIElement, id: number) => {
  const editButton = li.querySelector('#editBtn')
  editButton?.addEventListener('click', () => editTodo(id))
}

const editTodo = (id: number) => {
  const todo = todos.find(todo => todo.id === id)
  if (todo) {
    const text = prompt('edit todo text', todo.title)
    if (text) {
      todo.title = text
      renderTodos()
    }
  }
}

// Create a function for choosing background color for the body with a colorpicker

const initializeColorPicker = (): void => {
  const colorPicker = document.getElementById('colorPicker') as HTMLInputElement
  if(colorPicker) {
    colorPicker.addEventListener('input', (event: Event) => {
      const target = event.target as HTMLInputElement;
      changeBackgroundColor(target.value)
    })
  }
  else {
    console.error('Color picker not found')
  }
}

const changeBackgroundColor = (color: string): void => {
  document.body.style.backgroundColor = color
}

document.addEventListener('DOMContentLoaded', () => {
  initializeColorPicker()
})