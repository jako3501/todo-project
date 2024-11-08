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

  // Filter todos based on cuurrent filter state
  const filteredTodos = todos.filter(todo => {
    if (filter === 'all') return true
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })

  filteredTodos.forEach(todo => {
    const li = document.createElement('li')
    li.className = `todo-item`
    li.innerHTML = `
    <span>${todo.title}</span>
    <button id="removeBtn">Remove</button>
    <button id="editBtn">Edit</button>
    <button id="completeBtn">Complete</button>`;

    addRemoveButtonListener(li, todo.id);
    addEditButtonListener(li, todo.id);
    addCompletedButtonListener(li, todo.id);
    todoList.appendChild(li);

    if (todo.completed === true) {
      li.style.color = 'lightgreen'
    }
    
  })

  const deleteCompletedBtn = document.getElementById('delete-completed-btn') as HTMLButtonElement
  if (deleteCompletedBtn) {
    // Check if any todos are completed and toggle the button's visibility
    deleteCompletedBtn.style.display = todos.some(todo => todo.completed) ? 'block' : 'none'
  }
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


// Add button to change completed state of todo
const addCompletedButtonListener = (li: HTMLLIElement, id: number) => {
  const completeButton = li.querySelector('#completeBtn')
  completeButton?.addEventListener('click', () => completeTodo(id))
}

const completeTodo = (id: number) => {
  const todo = todos.find(todo => todo.id === id)
  

  if (todo) {
    todo.completed = !todo.completed
    renderTodos()
  }
}

renderTodos()

// Add a button to clear all completed todos

// Function to filter out todos with status "completed" and return the ones not completed
const deleteCompletedTodos = () => {
  todos = todos.filter(todo => !todo.completed)
  renderTodos()
}

// Connect function to button
const addDeleteCompletedButton = (): void => {
  const button = document.createElement('button')
  button.id = 'delete-completed-btn'
  button.textContent = 'Clear all completed'
  button.style.display = 'none'
  button.addEventListener('click', deleteCompletedTodos)

  const container = document.getElementById('todo-container')
  container?.appendChild(button)
}

addDeleteCompletedButton()

renderTodos()


// Create a function for filtering todos by status
let filter: 'all' | 'active' | 'completed' = 'all'

// Event listeners for filter buttons
const filterAllButton = document.getElementById('filter-all') as HTMLButtonElement
const filterActiveButton = document.getElementById('filter-active') as HTMLButtonElement
const filterCompletedButton = document.getElementById('filter-completed') as HTMLButtonElement

filterAllButton?.addEventListener('click', () => changeFilter('all'))
filterActiveButton?.addEventListener('click', () => changeFilter('active'))
filterCompletedButton?.addEventListener('click', () => changeFilter('completed'))

const changeFilter = (newFilter: 'all' | 'active' | 'completed') => {
  filter = newFilter
  renderTodos()
}

// Toggle dark mode function
const themeToggleButton = document.getElementById('theme-toggle') as HTMLButtonElement

const toggleTheme = () => {
  document.body.classList.toggle('dark-mode')
  
  if (document.body.classList.contains('dark-mode')) {
    themeToggleButton.textContent = 'Switch to Light Mode';
  } else {
    themeToggleButton.textContent = 'Switch to Dark Mode';
  }
}

themeToggleButton?.addEventListener('click', toggleTheme)


// Create a function for choosing background color for the body with a colorpicker

const initializeColorPicker = (): void => {
  const colorPicker = document.getElementById('colorPicker') as HTMLInputElement
  if (colorPicker) {
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

