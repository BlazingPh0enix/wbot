const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

function addMessages(message, isUser){
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function handleUserInput(){
    const message = userInput.value.trim();
    if (message){
        addMessages(message, true);
        userInput.value = '';

        setTimeout(() => {
            addMessages("Thanks for your message!", false);
        }, 1000)
    }
}

sendButton.addEventListener('click', handleUserInput);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter'){
        handleUserInput();
    }
});

addMessages("Welcome to Jessup Cellars! How can I help you today?", false);