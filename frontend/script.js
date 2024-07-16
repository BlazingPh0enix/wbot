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

async function handleUserInput(){
    const message = userInput.value.trim();
    if (message){
        addMessages(message, true);
        userInput.value = '';

        try {
            const response = await fetch('https://wbot.pages.dev', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({message: message}),
            });

            if (!response.ok){
                throw new Error("Network response was not ok")
            }

            const data = await response.json();
            addMessages(data.message, false);
        } catch (error) {
            addMessages("I'm sorry, I'm having trouble connecting to the server. Please try again later.", false);
        }

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