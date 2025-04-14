const form = document.querySelector('[data-form]');
const inputTask = document.querySelector('[data-input-task]');
const taskList = document.querySelector('.taskList');


const getInputValue = () => inputTask.value.trim();


const addTaskToList = (task) => {
    const li = document.createElement('li');
    li.classList.add('item');
    li.textContent = task;
    taskList.appendChild(li);
};


const clearInput = () => {
    inputTask.value = '';
};

const handleFormSubmit = (event) => {
    event.preventDefault();

    const task = getInputValue();

    if (task === '') {
        alert('Por favor, ingresa una tarea.');
        return;
    }

    addTaskToList(task);
    clearInput();
};
console.log(inputTask);

form.addEventListener('submit', (event) => handleFormSubmit(event));