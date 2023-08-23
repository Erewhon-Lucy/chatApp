$(() => {
    console.log('jquery loaded');
    $("#show-register-form").on("click", function() {
        $(".login-form").hide();
        $(".register-form").show();
    });
})