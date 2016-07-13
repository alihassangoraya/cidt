/**
 * Created by alihassan on 20/06/2016.
 */

var email = "";

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    $("#restore").click(onRestoreClicked);
    $("#back_arrow").click(onBackArrowPressed);
    $("#setting_button").click(onSettingBtnClicked);

    updateAppLanguage();

    document.addEventListener('backbutton', onBackButtonPressed, false);
    document.addEventListener("offline", onOffline, false);
}

function updateAppLanguage() {
    if (window.localStorage.getItem(storage_key + "language") != undefined) {
        var storedLanguage = window.localStorage.getItem(storage_key + "language");

        if (storedLanguage == "russian") {
            currentPage = lang_russian.restore_page;
            toastMessages = lang_russian.toast_messages;
        }
        else {
            currentPage = lang_english.restore_page;
            toastMessages = lang_english.toast_messages;
        }
    }

    $(".title").html(currentPage.title);

    $("#heading").html(currentPage.heading);
    $("#restore").html(currentPage.restore_btn);

    $(".first-layer").fadeIn();
}

function onOffline() {
    // Handle the offline event
    showToast(toastMessages.internet_connection_error);
}

function onBackArrowPressed(event) {
    event.preventDefault();

    window.location = "advance_settings.html";
}

function onSettingBtnClicked(event) {
    event.preventDefault();

    window.location = "settings.html";
}

function onBackButtonPressed() {
    window.location = "advance_settings.html";
}

function onRestoreClicked(event) {
    event.preventDefault();

    email = $("#email").val();

    if (email != "") {
        if (!($('#restore').hasClass('disabled-btn'))) {
            navigator.notification.confirm(currentPage.notification_message, onConfirmRestore, currentPage.notification_title, currentPage.start_btn + ',' + currentPage.cancel_btn);
        }
    }
    else {
        showToast(toastMessages.email_required, "long");
    }
}

// restore confirmed
function onConfirmRestore(button) {
    if (button == 1) {
        if(isInternetConnected()) {
            $("#restore").addClass('disabled-btn').removeClass('btn2');
            readFromServer();
        }
        else{
            showToast(toastMessages.internet_connection_error);
        }
    }
}

function readFromServer() {

    var sendData = "email=" + email;

    $.ajax({
        url: "http://cidt.club/apis/emailVerification.php",
        type: "POST",
        dataType: "json",
        data: sendData,
        // Work with the response
        success: function (data) {
            var result = data.result;

            if (result[0].response == "success") {
                var code = result[1].message;

                window.localStorage.setItem(storage_key+"verification_code", code);
                window.localStorage.setItem(storage_key+"email", email);

                window.location = "verify_restore.html";
            }
            else {
                if (result[1].message == "email was invalid") {
                    showToast(toastMessages.invalid_email, "long");
                    $("#restore").addClass('btn2').removeClass('disabled-btn');
                }
                else if (result[1].message == "no email") {
                    showToast(toastMessages.no_backup, "long");
                    $("#restore").addClass('btn2').removeClass('disabled-btn');
                }
                else {
                    showToast(toastMessages.server_error, "long");
                    $("#restore").addClass('btn2').removeClass('disabled-btn');
                }
            }
        },
        error: function (e) {
            showToast(toastMessages.server_error, "long");
            $("#restore").addClass('btn2').removeClass('disabled-btn');
        }
    });
}