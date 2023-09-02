var socket = io();
const chatMessages = $('.chat-messages');
const messageInput = $('#message');
const postButton = $('#post-button');

$(() => {
    console.log('chat page loaded');

    var usernamestorage = sessionStorage.getItem("username");
    console.log("usernamestorage: " + usernamestorage);

    getMessages();

    postButton.on('click', () => {
        var message = messageInput.val();
        if (message.length > 0) {
            var message = {
                username: usernamestorage,
                message: message,
                timestamp: new Date().toISOString()
            }
            postMessage(message);
            addMessageToPage(message);
            messageInput.val();
        }
    });

    $("#logout-button").on("click", function() {
        sessionStorage.removeItem("username");
        window.location.href = "/";
    });
})
socket.on('message', addMessage)

function postMessage(message) {
    $.post('http://localhost:3000/chat/send', message);
}

function getMessages() {
    $.get('http://localhost:3000/chat/messages', (chatMessages) => {
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