/**
 * Created by alihassan on 20/06/2016.
 */

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    $("#back_arrow").click(onBackArrowPressed);
    $("#setting_button").click(onSettingBtnClicked);

    document.addEventListener('backbutton', onBackButtonPressed, false);

    updateAppLanguage();
}

function updateAppLanguage(){
    if (window.localStorage.getItem(storage_key+"language") != undefined) {
        var storedLanguage = window.localStorage.getItem(storage_key + "language");

        if (storedLanguage == "russian") {
            currentPage = lang_russian.restore_ok_page;
            toastMessages = lang_russian.toast_messages;
        }
        else {
            currentPage = lang_english.restore_ok_page;
            toastMessages = lang_english.toast_messages;
        }
    }

    $(".title").html(currentPage.title);

    $("#message").html(currentPage.message);

    $(".first-layer").fadeIn();
}

function onSettingBtnClicked(event) {
    event.preventDefault();

    window.location = "settings.html";
}

function onBackArrowPressed(event) {
    event.preventDefault();

    window.location = "advance_settings.html";
}

function onBackButtonPressed(){
    window.location = "advance_settings.html";
}