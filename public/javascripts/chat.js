var socket = io();
$(document).ready(function() {
    console.log('chat page loaded');
    const chatMessages = $('.chat-messages');
    const messageInput = $('#message');
    const postButton = $('#post-button');
    var username = sessionStorage.getItem("username");

    router.get('/history', async (req, res) => {
        try {
            const history = await ChatMessage.find().sort({ timestamp: 1 });
            res.json(history);
        } catch (error) {
            console.error("Error fetching chat history:", error);
            res.status(500).json({ message: "Error fetching chat history" });
        }
    });

    postButton.on('click', () => {
        const message = messageInput.val().trim();
        if (message !== '') {
            $.post('/chat/send', { username: 'User', message }, (data) => {
                if (data.success) {
                    messageInput.val('');
                    fetchChatHistory();
                }
            });
        }
    });

    $("#logout-button").on("click", function() {
        sessionStorage.removeItem("username");
        window.location.href = "/";
    });
})
// $(() => {
//     console.log('chat page loaded');
//     const chatMessages = $('.chat-messages');
//     const messageInput = $('#message');
//     const postButton = $('#post-button');
//     var username = sessionStorage.getItem("username");

//     router.get('/history', async (req, res) => {
//         try {
//             const history = await ChatMessage.find().sort({ timestamp: 1 });
//             res.json(history);
//         } catch (error) {
//             console.error("Error fetching chat history:", error);
//             res.status(500).json({ message: "Error fetching chat history" });
//         }
//     });

//     postButton.on('click', () => {
//         const message = messageInput.val().trim();
//         if (message !== '') {
//             $.post('/chat/send', { username: 'User', message }, (data) => {
//                 if (data.success) {
//                     messageInput.val('');
//                     fetchChatHistory();
//                 }
//             });
//         }
//     });

//     $("#logout-button").on("click", function() {
//         sessionStorage.removeItem("username");
//         window.location.href = "/";
//     });
// })
