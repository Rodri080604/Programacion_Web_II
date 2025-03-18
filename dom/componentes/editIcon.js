const editIcon = (taskElement) => {
    if (!taskElement) return; // Verifica que la tarea existe

    const i = document.createElement('i');
    i.classList.add('fas', 'fa-edit', 'editIcon', 'icon');

    i.addEventListener('click', () => {
        let titleTask = taskElement.querySelector('.task');

        // Si no encuentra el título, detiene la ejecución
        if (!titleTask) {
            console.error("No se encontró el título de la tarea.");
            return;
        }

        const input = document.createElement('input');
        input.type = 'text';
        input.value = titleTask.innerText.trim();
        input.classList.add('edit-input');

        // Reemplazar el título con el input
        taskElement.querySelector('div').replaceChild(input, titleTask);

        input.addEventListener('blur', () => saveEdit(taskElement, input, titleTask));
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') input.blur();
        });

        input.focus();
    });

    return i;
};

const saveEdit = (taskElement, input, titleTask) => {
    const newValue = input.value.trim();

    if (!newValue) {
        alert("El nombre de la tarea no puede estar vacío.");
        input.focus();
        return;
    }

    titleTask.innerText = newValue;
    taskElement.querySelector('div').replaceChild(titleTask, input);
};

export default editIcon;
