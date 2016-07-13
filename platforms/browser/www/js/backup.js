/**
 * Created by alihassan on 20/06/2016.
 */

var email = "";

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    $("#backup").click(onBackupClicked);
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
            currentPage = lang_russian.backup_page;
            toastMessages = lang_russian.toast_messages;
        }
        else {
            currentPage = lang_english.backup_page;
            toastMessages = lang_english.toast_messages;
        }
    }

    $(".title").html(currentPage.title);

    $("#heading").html(currentPage.heading);
    $("#backup").html(currentPage.backup_btn);

    $(".first-layer").fadeIn();
}

function onSettingBtnClicked(event) {
    event.preventDefault();

    window.location = "settings.html";
}

function onOffline() {
    // Handle the offline event
    showToast(toastMessages.internet_connection_error);
}

function onBackArrowPressed(event) {
    event.preventDefault();

    window.location = "advance_settings.html";
}

function onBackButtonPressed() {
    window.location = "advance_settings.html";
}

function onBackupClicked(event) {
    event.preventDefault();

    email = $("#email").val();

    if(email != "") {
        if (!($('#backup').hasClass('disabled-btn'))) {
            navigator.notification.confirm(currentPage.notification_message, onConfirmBackup, currentPage.notification_title, currentPage.start_btn + ',' + currentPage.cancel_btn);
        }
    }
    else{
        showToast(toastMessages.email_required, "long");
    }
}

// backup confirmed
function onConfirmBackup(button) {
    if (button == 1) {
        if(isInternetConnected()) {
            $("#backup").addClass('disabled-btn').removeClass('btn2');
            backupContent();
        }
        else{
            showToast(toastMessages.internet_connection_error);
        }
    }
}

function backupContent() {
    openDB()

    dbHandler.transaction(function (transaction) {
        transaction.executeSql('SELECT * FROM ' + settingsTable + '', [], function (tx, results) {
            var len = results.rows.length;
            if (len > 0) {
                var json = '[{"settings":{"language":"';

                var settingsLanguage = results.rows.item(0).language;
                var allowedDrinkTime = results.rows.item(0).drinkdays;
                var startDate = results.rows.item(0).startdate;

                json = json + settingsLanguage + '","allowedTime":"' + allowedDrinkTime + '","startDate":"' + startDate + '"}},{"stats":[';

                readStats(transaction, json);
            }
            else {
                $("#backup").addClass('btn2').removeClass('disabled-btn');
                showToast(toastMessages.nothing_to_backup, "long");
            }
        }, null);
    });
}

function readStats(transaction, json) {
    transaction.executeSql('SELECT * FROM ' + statsTable + '', [], function (tx, results) {
        var len = results.rows.length, i;
        if (len > 0) {
            for (i = 0; i < len; i++) {
                var row = results.rows.item(i);

                json = json + '{"date":"' + row.drinkdate + '","color":"' + row.color + '"}';

                if (i + 1 < len) {
                    json = json + ',';
                }
            }
        }

        json = json + ']}]';

        sendToServer(json)

    }, null);
}

function sendToServer(json) {

    var sendData = "data=" + json + "&email=" + email;

    $.ajax({
        url: "http://cidt.club/apis/writeBackup.php",
        type: "POST",
        dataType: "json",
        data: sendData,
        // Work with the response
        success: function (data) {
            var result = data.result;

            if(result[0].response == "success") {
                window.location = "backup_ok.html";
            }
            else{
                if(result[1].message == "email was invalid") {
                    showToast(toastMessages.invalid_email, "long");
                    $("#backup").addClass('btn2').removeClass('disabled-btn');
                }
                else {
                    showToast(toastMessages.server_error, "long");
                    $("#backup").addClass('btn2').removeClass('disabled-btn');
                }
            }
        },
        error: function (e) {
            alert(JSON.stringify(e));
            showToast(toastMessages.server_error, "long");
            $("#backup").addClass('btn2').removeClass('disabled-btn');
        }

    });
}