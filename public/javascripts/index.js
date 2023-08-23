$(() => {
    console.log('page loaded');

    $("#show-register-form").on("click", function() {
        $(".login-form").hide();
        $(".register-form").show();
    });

    $("form.login-form").on("submit", function(event) {
        event.preventDefault();
        console.log('login form submitted');
        var username = $("#username").val();
        var password = $("#password").val();

        $.post("/login", { username, password }, function(data) {
            // 处理响应，可能需要重定向或显示消息
        });
    })

    $("form.register-form").on("submit", function(event) {
        event.preventDefault();
        const newUsername = $("#new-username").val();
        const newPassword = $("#new-password").val();
        
        $.post("/register", { newUsername, newPassword }, function(data) {
            // 处理响应，可能需要重定向或显示消息
        });
    });
})