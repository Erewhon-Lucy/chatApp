var socket = io();

const chatMessages = $('.chat-messages');
const messageInput = $('#message');
const postButton = $('#post-button');

socket.on('connect', () => {
    console.log('Client Socket.io version:', socket.version);
});

$(() => {
    console.log('chat page loaded');

    var usernamestorage = sessionStorage.getItem("username");
    console.log("usernamestorage: " + usernamestorage);

    getMessages();

    postButton.on('click', () => {
        var content = messageInput.val();
        // console.log("content: " + content);
        if (content.length > 0) {
            var messageData = {
                username: usernamestorage,
                message: content,
                timestamp: new Date().toISOString()
            }
            socket.emit('add-message', messageData);
            console.log("client event emitted");
            postMessage(messageData);
            // addMessageToPage(messageData);
        }
    });

    $("#logout-button").on("click", function() {
        sessionStorage.removeItem("username");
        window.location.href = "/";
    });
})

socket.on('add-message', (message) => {
    console.log('message received');
    addMessageToPage(message);
    messageInput.val('');
    scrollToBottom();
});

function postMessage(message) {
    $.post('http://localhost:3010/chat/send', message);
}

function getMessages() {
    $.get('http://localhost:3010/chat/messages', (chatMessages) => {
        chatMessages.forEach(message => {
            addMessageToPage(message);
        })
    
    })
}

function addMessageToPage(message) {
    const userTimeDiv = $('<div>').addClass('user-time');
    const userHeading = $('<h3>').text(message.username);
    const timeSpan = $('<span>').text(message.timestamp);
    userTimeDiv.append(userHeading, timeSpan);
    const messageParagraph = $('<p>').addClass('message-text').text(message.message);
    const chatMessageDiv = $('<div>').addClass('chat-message').append(userTimeDiv, messageParagraph);
    chatMessages.append(chatMessageDiv);
}

function scrollToBottom() {
    chatMessages.scrollTop(chatMessages[0].scrollHeight);
}