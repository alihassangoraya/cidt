/**
 * Created by alihassan on 20/06/2016.
 */

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    $("#back_arrow").click(onBackArrowPressed);
    $("#setting_button").click(onSettingBtnClicked);
    $("#yes").click(onYesBtnClicked);
    $("#no").click(onNoBtnClicked);

    document.addEventListener('backbutton', onBackButtonPressed, false);

    updateAppLanguage();
}

function updateAppLanguage(){
    if (window.localStorage.getItem(storage_key+"language") != undefined) {
        var storedLanguage = window.localStorage.getItem(storage_key + "language");

        if (storedLanguage == "russian") {
            currentPage = lang_russian.verify_already_drunk_page;
            toastMessages = lang_russian.toast_messages;
        }
        else {
            currentPage = lang_english.verify_already_drunk_page;
            toastMessages = lang_english.toast_messages;
        }
    }

    $(".title").html(currentPage.title);

    $("#message").html(currentPage.message);
    $("#yes").html(currentPage.yes_btn);
    $("#no").html(currentPage.no_btn);

    $(".first-layer").fadeIn();
}

function onSettingBtnClicked(event) {
    event.preventDefault();

    window.location = "settings.html";
}

function onBackArrowPressed(event) {
    event.preventDefault();

    window.location = "../index.html";
}

function onBackButtonPressed(){
    window.location = "../index.html";
}

function onYesBtnClicked(){
    window.location = "hiad.html";
}

function onNoBtnClicked(){
    window.location = "../index.html";
}