document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const tasksRemaining = document.getElementById('tasks-remaining');
    const clearCompletedBtn = document.getElementById('clear-completed');
    
    // Initialize tasks array from localStorage
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let currentFilter = 'all';
    
    // Render tasks based on current filter
    function renderTasks() {
        taskList.innerHTML = '';
        
        const filteredTasks = tasks.filter(task => {
            if (currentFilter === 'active') return !task.completed;
            if (currentFilter === 'completed') return task.completed;
            return true;
        });
        
        if (filteredTasks.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.textContent = currentFilter === 'all' ? 
                'No tasks yet. Add one above!' : 
                currentFilter === 'active' ? 
                'No active tasks!' : 
                'No completed tasks!';
            taskList.appendChild(emptyState);
            return;
        }
        
        filteredTasks.forEach((task, index) => {
            const taskElement = document.createElement('li');
            taskElement.className = 'task';
            if (task.completed) {
                taskElement.classList.add('completed');
            }
            
            taskElement.innerHTML = `
                <input type="checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}">
                <span>${task.text}</span>
                <button class="delete-btn" data-id="${task.id}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            
            taskList.appendChild(taskElement);
        });
        
        updateStats();
    }
    
    // Update task statistics
    function updateStats() {
        const activeTasks = tasks.filter(task => !task.completed).length;
        tasksRemaining.textContent = `${activeTasks} ${activeTasks === 1 ? 'task' : 'tasks'} left`;
    }
    
    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
        updateStats();
    }
    
    // Generate unique ID for tasks
    function generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    
    // Add new task
    function addTask() {
        const text = taskInput.value.trim();
        if (!text) {
            showError('Please enter a task');
            return;
        }
        
        const newTask = {
            id: generateId(),
            text,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        tasks.unshift(newTask);
        saveTasks();
        renderTasks();
        taskInput.value = '';
        taskInput.focus();
    }
    
    // Show error message
    function showError(message) {
        taskInput.placeholder = message;
        taskInput.style.borderColor = 'var(--danger-color)';
        
        setTimeout(() => {
            taskInput.placeholder = 'Add a new task...';
            taskInput.style.borderColor = '#e1e5ea';
        }, 2000);
    }
    
    // Toggle task completion status
    function toggleTask(id) {
        const task = tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        }
    }
    
    // Delete task
    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    }
    
    // Clear all completed tasks
    function clearCompleted() {
        tasks = tasks.filter(task => !task.completed);
        saveTasks();
        renderTasks();
    }
    
    // Set active filter
    function setFilter(filter) {
        currentFilter = filter;
        filterBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        renderTasks();
    }
    
    // Event Listeners
    addTaskBtn.addEventListener('click', addTask);
    
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });
    
    taskList.addEventListener('click', (e) => {
        const target = e.target;
        
        if (target.matches('input[type="checkbox"]')) {
            toggleTask(target.dataset.id);
        } else if (target.matches('.delete-btn') || target.matches('.delete-btn *')) {
            const btn = target.closest('.delete-btn');
            deleteTask(btn.dataset.id);
        }
    });
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => setFilter(btn.dataset.filter));
    });
    
    clearCompletedBtn.addEventListener('click', clearCompleted);
    
    // Initial render
    renderTasks();
});