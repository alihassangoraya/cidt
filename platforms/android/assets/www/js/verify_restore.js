/**
 * Created by alihassan on 20/06/2016.
 */

var email;

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    $("#verify").click(onVerifyClicked);
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
            currentPage = lang_russian.verify_restore_page;
            toastMessages = lang_russian.toast_messages;
        }
        else {
            currentPage = lang_english.verify_restore_page;
            toastMessages = lang_english.toast_messages;
        }
    }

    $(".title").html(currentPage.title);

    $("#message").html(currentPage.message);
    $("#verify").html(currentPage.verify_btn);

    $(".first-layer").fadeIn();
}

function onOffline() {
    // Handle the offline event
    showToast(toastMessages.internet_connection_error);
}

function onBackArrowPressed(event) {
    event.preventDefault();

    window.location = "restore.html";
}

function onSettingBtnClicked(event) {
    event.preventDefault();

    window.location = "settings.html";
}

function onBackButtonPressed() {
    window.location = "restore.html";
}

function onVerifyClicked(event) {
    event.preventDefault();

    var verification_code = "", saved_code = "";
    if (window.localStorage.getItem(storage_key + "verification_code") != undefined) {
        saved_code = window.localStorage.getItem(storage_key + "verification_code");
    }
    else {
        showToast(toastMessages.something_wrong, "long");

        window.location = "restore.html";

        return;
    }

    verification_code = $("#verification_code").val();

    if (verification_code != "") {

        if (verification_code == saved_code) {
            if (!($('#restore').hasClass('disabled-btn'))) {
                if (isInternetConnected()) {
                    email = window.localStorage.getItem(storage_key + "email");
                    $("#restore").addClass('disabled-btn').removeClass('btn2');
                    readFromServer();
                }
                else {
                    showToast(toastMessages.internet_connection_error);
                }
            }
        }
        else {
            showToast(toastMessages.incorrect_code, "long");
        }
    }
    else {
        showToast(toastMessages.code_required, "long");
    }
}

function readFromServer() {

    var sendData = "email=" + email;

    $.ajax({
        url: "http://cidt.club/apis/readBackup.php",
        type: "POST",
        dataType: "json",
        data: sendData,
        // Work with the response
        success: function (data) {
            var result = data.result;

            if (result[0].response == "success") {
                restoreContent(result[1].message);
            }
            else {
                if (result[1].message == "email was invalid") {
                    showToast(toastMessages.invalid_email, "long");
                    $("#restore").addClass('btn2').removeClass('disabled-btn');
                }
                else if (result[1].message == "no backup") {
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

var len = 0, count = 0;

function restoreContent(data) {
    data = JSON.parse(data);

    var settingsTableData = data[0].settings;
    var statsTableData = data[1].stats;

    openDB();
    dbHandler.transaction(function (transaction) {

        var executeQuery = "UPDATE " + settingsTable + " SET " + settingsTableColumns.language + " =?, " + settingsTableColumns.drinkDays + " =?, " + settingsTableColumns.startDate + " =?";
        transaction.executeSql(executeQuery, [settingsTableData.language, settingsTableData.allowedTime, settingsTableData.startDate]
            , function (tx, result) {

                window.localStorage.setItem(storage_key + "language", settingsTableData.language);

                var executeQuery = "DELETE FROM " + statsTable ;
                transaction.executeSql(executeQuery, [], function (tx, result) {
                        var executeQuery = "DELETE FROM SQLITE_SEQUENCE WHERE name='" + statsTable +"'";
                        transaction.executeSql(executeQuery, [], function (tx, result) {
                            len = statsTableData.length; var i;
                            for (i = 0; i < len; i++) {
                                var item = statsTableData[i];

                                var executeQuery = "INSERT INTO " + statsTable + " (" + statsTableColumns.date + ", " + statsTableColumns.color + ") VALUES (?,?)";
                                transaction.executeSql(executeQuery, [item.date, item.color],
                                    function (tx, result) {
                                        callback();
                                    },
                                    function (error) {
                                        callback();
                                    }
                                );
                            }
                        }, function (error) {
                            callback();
                        });
                    },
                    function (error) {
                        callback();
                    }
                );
            },
            function (error) {
                $("#restore").addClass('btn2').removeClass('disabled-btn');
                showToast(toastMessages.restore_error, "long");
            }
        );
    });
}

function callback() {

    count++;

    if (count >- len) {
        window.localStorage.removeItem(storage_key + "email");
        window.localStorage.removeItem(storage_key + "verification_code");

        window.location = "restore_ok.html";
    }
}