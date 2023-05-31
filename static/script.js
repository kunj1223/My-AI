$(document).ready(function () {
    $('#user-input').keydown(function (e) {
        if (e.keyCode === 13) {
            sendMessage();
        }
    });

    $('#send-btn').click(function () {
        sendMessage();
    });

    function sendMessage() {
        var userInput = $('#user-input').val();
        if (!userInput) return;

        $('#user-input').val('');
        $('#message-container').append('<div class="message user-message">' + userInput + '</div>');
        scrollToBottom();

        $('#message-container').append('<div class="message bot-message"><span class="typing-indicator"></span></div>');
        scrollToBottom();

        $.ajax({
            type: 'POST',
            url: '/get-response',
            contentType: 'application/json',
            data: JSON.stringify({ 'message': userInput }),
            success: function (data) {
                var botResponse = data.response;
                $('.typing-indicator').remove();
                $('#message-container').append('<div class="message bot-message">' + botResponse + '</div>');
                scrollToBottom();
            }
        });
    }

    function scrollToBottom() {
        $('#message-container').scrollTop($('#message-container')[0].scrollHeight);
    }
});

