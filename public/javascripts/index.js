$(() => {
    console.log('page loaded');

    $("#show-register-form").on("click", function() {
        $(".login-form").hide();
        $(".register-form").show();
    });

    $("form.login-form").on("submit", function(event) {
        event.preventDefault();// add it to prevent the page from reloading!!

        console.log('login form submitted');
        var username = $("#username").val();
        var password = $("#password").val();

        // error in handling
        // $.post("/login", { username, password }, function(data) {
        //     console.log("Server response:", data);
        //     if (data.code === 200) {
        //         alert("Login successful");
        //         window.location.href = "/chat";
        //     } else {
        //         alert("Invalid login");
        //     }
        // });
        axios.post("/login", { username, password })
            .then(function(response) {
                var data = response.data;
                console.log("Server response:", data);

                if (data.code === 200) {
                    sessionStorage.setItem("username", username);
                    console.log("username in storage:", sessionStorage.getItem("username"));
                    alert("Login successful");
                    
                    window.location.href = "/chat";
                } else {
                    alert("Invalid login");
                
                }
            })
            .catch(function(error) {
                console.error("Error logging in:", error);
                alert("Error logging in");
            })
    })

    $("form.register-form").on("submit", function(event) {
        event.preventDefault();
        const newUsername = $("#new-username").val();
        const newPassword = $("#new-password").val();
        
        $.post("/register", { newUsername, newPassword }, function(data) {
            
            if (data === "Registration successful") {
                alert("Registration successful");
                window.location.href = "/chat";
                
            } else if (data === "Username already exists") {
                alert("Username already exists");
            
            } else {
                alert("Error registering user");
            
            }
        });
    });
})