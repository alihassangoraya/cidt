/**
 * Created by alihassan on 20/06/2016.
 */

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    $("#backup").click(onBackupClicked);
    $("#restore").click(onRestoreClicked);
    $("#back_arrow").click(onBackArrowPressed);
    $("#setting_button").click(onSettingBtnClicked);

    document.addEventListener('backbutton', onBackButtonPressed, false);

    updateAppLanguage();
}

function updateAppLanguage(){
    if (window.localStorage.getItem(storage_key+"language") != undefined) {
        var storedLanguage = window.localStorage.getItem(storage_key + "language");

        if (storedLanguage == "russian") {
            currentPage = lang_russian.advance_settings_page;
            toastMessages = lang_russian.toast_messages;
        }
        else {
            currentPage = lang_english.advance_settings_page;
            toastMessages = lang_english.toast_messages;
        }
    }

    $(".title").html(currentPage.title);

    $("#backup").html(currentPage.backup_btn);
    $("#restore").html(currentPage.restore_btn);

    $(".first-layer").fadeIn();
}

function onBackButtonPressed(){
    window.location = "settings.html";
}

function onSettingBtnClicked(event) {
    event.preventDefault();

    window.location = "settings.html";
}

function onBackArrowPressed(event) {
    event.preventDefault();

    window.location = "settings.html";
}

function onBackupClicked(event) {
    event.preventDefault();

    window.location = "backup.html";
}

function onRestoreClicked(event) {
    event.preventDefault();

    window.location = "restore.html";
}