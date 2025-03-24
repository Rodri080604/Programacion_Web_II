document.addEventListener('DOMContentLoaded', () => {
    const messageList = document.getElementById('messageList');
    const addMessageBtn = document.getElementById('addMessageBtn');
    const messageModal = document.getElementById('messageModal');
    const submitMessage = document.getElementById('submitMessage');
    const closeModal = document.getElementById('closeModal');
    const messageText = document.getElementById('messageText');
    const profileSelect = document.getElementById('profileSelect');

    // Show modal when clicking "Añadir Mensaje"
    addMessageBtn.addEventListener('click', () => {
        messageModal.style.display = 'flex';
        messageText.value = '';
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        messageModal.style.display = 'none';
    });

    // Add new message
    submitMessage.addEventListener('click', () => {
        if (messageText.value.trim() === '') return;

        const newMessage = document.createElement('li');
        newMessage.className = 'mensaje__item mensaje__logo';
        
        const form = document.createElement('form');
        const img = document.createElement('img');
        img.src = profileSelect.value;
        img.alt = 'profile';
        form.appendChild(img);

        const title = document.createElement('h2');
        title.className = 'mensaje__item__titulo';
        title.textContent = `mensaje ${messageList.children.length + 1}`;

        const text = document.createElement('p');
        text.className = 'mensaje__item__texto';
        text.textContent = messageText.value;

        newMessage.appendChild(form);
        newMessage.appendChild(title);
        newMessage.appendChild(text);

        newMessage.style.opacity = '0';
        messageList.insertBefore(newMessage, messageList.firstChild);

        setTimeout(() => {
            newMessage.style.transition = 'opacity 0.5s ease';
            newMessage.style.opacity = '1';
            messageList.scrollTop = 0;
        }, 10);

        messageModal.style.display = 'none';
    });

    // Close modal when clicking outside
    messageModal.addEventListener('click', (e) => {
        if (e.target === messageModal) {
            messageModal.style.display = 'none';
        }
    });
});