/**
 * Created by alihassan on 20/06/2016.
 */

var savedTime, savedLanguage, selectedTime, selectedLanguage;
var isUpdating = false;

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {

    $("#update_settings").click(updateSettings);
    $("#back_arrow").click(onBackArrowPressed);
    $("#drinks_time").on("change", onDrinkTimeChanged);
    $("#language").on("change", onLanguageChanged);
    $("#advance_Settings").click(onAdvanceSettingBtnClicked);

    document.addEventListener('backbutton', onBackButtonPressed, false);

    updateAppLanguage();
}

function updateAppLanguage(){
    savedTime = "", savedLanguage = "", selectedTime = "", selectedLanguage = "";
    isUpdating = false;

    if (window.localStorage.getItem(storage_key+"language") != undefined) {
        var storedLanguage = window.localStorage.getItem(storage_key + "language");

        if (storedLanguage == "russian") {
            currentPage = lang_russian.settings_page;
            toastMessages = lang_russian.toast_messages;
        }
        else {
            currentPage = lang_english.settings_page;
            toastMessages = lang_english.toast_messages;
        }
    }

    $(".title").html(currentPage.title);

    $("#lang_heading").html(currentPage.lang_heading);
    $("#drink_heading").html(currentPage.drink_heading);
    $("#update_settings").html(currentPage.update_settings_btn);
    $("#advance_Settings").html(currentPage.advance_settings_link);

    $('#drinks_time').html("");

    var i, options = currentPage.drink_time_options, values = currentPage.drink_time_options_values;
    for (i = 0; i < options.length; i++) {

        var newOption = $('<option>');
        newOption.attr('value', values[i]).text(options[i]);

        $('#drinks_time').append(newOption);
    }

    openDB();
    setDefaultSettings();

    $(".first-layer").fadeIn();
}

function setDefaultSettings() {
    dbHandler.transaction(function (transaction) {
        transaction.executeSql('SELECT * FROM ' + settingsTable + '', [], function (tx, results) {
            var len = results.rows.length;
            if (len > 0) {
                savedLanguage = results.rows.item(0).language;
                savedTime = results.rows.item(0).drinkdays;

                selectedLanguage = savedLanguage;
                selectedTime = savedTime;

                $('#language option[value=' + savedLanguage + ']').prop('selected', true);
                $('#drinks_time option[value=' + savedTime + ']').prop('selected', true);

            }
        }, null);
    });
}

function onAdvanceSettingBtnClicked(event) {
    event.preventDefault();

    window.location = "advance_settings.html";
}

function onBackButtonPressed() {
    if(!isUpdating) {
        window.location = "../index.html";
    }
}

function onBackArrowPressed(event) {
    event.preventDefault();

    if(!isUpdating) {
        window.location = "../index.html";
    }
}

function toggleUpdateButton() {

    if (selectedTime != savedTime || selectedLanguage != savedLanguage) {
        $('#update_settings').addClass('btn').removeClass('disabled-btn');
    }
    else {
        $('#update_settings').addClass('disabled-btn').removeClass('btn');
    }

}

function onLanguageChanged() {
    selectedLanguage = $(this).val();

    toggleUpdateButton();
}

function onDrinkTimeChanged() {
    selectedTime = $(this).val();

    toggleUpdateButton();
}

function updateSettings(event) {
    event.preventDefault();

    if (!($('#update_settings').hasClass('disabled-btn'))) {

        isUpdating = true;

        if (selectedLanguage == "russian") {
            toastMessages = lang_russian.toast_messages;
        }
        else {
            toastMessages = lang_english.toast_messages;
        }

        showToast(toastMessages.updating_settings);
        dbHandler.transaction(function (transaction) {
            var executeQuery = "UPDATE " + settingsTable + " SET " + settingsTableColumns.language + " =?, " + settingsTableColumns.drinkDays + " =?";
            transaction.executeSql(executeQuery, [selectedLanguage, selectedTime],
                //On Success
                function (tx, result) {
                    showToast(toastMessages.updated_settings, "long");

                    isUpdating = false;
                    $('#update_settings').addClass('disabled-btn').removeClass('btn');

                    window.localStorage.setItem(storage_key+"language", selectedLanguage);

                    updateAppLanguage();
                },
                //On Error
                function (error) {
                    showToast(toastMessages.update_settings_error, "long")
                }
            );
        });
    }
}