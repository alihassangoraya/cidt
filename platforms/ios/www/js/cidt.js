/**
 * Created by alihassan on 20/06/2016.
 */

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    $("#glass_full").click(onKeepGlassFullClicked);
    $("#no_care").click(onDontCareClicked);
    $("#back_arrow").click(onBackArrowPressed);
    $("#setting_button").click(onSettingBtnClicked);

    document.addEventListener('backbutton', onBackButtonPressed, false);
    document.addEventListener("resume", onResume, false);

    updateAppLanguage();

    openDB();
    checkQuota();
}

function updateAppLanguage() {
    if (window.localStorage.getItem(storage_key + "language") != undefined) {
        var storedLanguage = window.localStorage.getItem(storage_key + "language");

        if (storedLanguage == "russian") {
            currentPage = lang_russian.cidt_page;
            toastMessages = lang_russian.toast_messages;
        }
        else {
            currentPage = lang_english.cidt_page;
            toastMessages = lang_english.toast_messages;
        }
    }

    $(".title").html(currentPage.title);

    $("#yes_message").html(currentPage.yes_message);
    $("#no_message").html(currentPage.no_message);
    $("#glass_full").html(currentPage.glass_full_btn);
    $("#no_care").html(currentPage.no_care_btn);

}

function checkQuota() {
    dbHandler.transaction(function (transaction) {
        var todayDate = formatDate();
        todayDate = formatDate();
        transaction.executeSql('SELECT ' + statsTableColumns.date + ' FROM ' + statsTable + ' WHERE ' + statsTableColumns.date + ' =?', [todayDate], function (tx, results) {
            var len = results.rows.length, mark = false;
            if (len > 0) {
                $("#no_care").addClass('disabled-btn').removeClass('btn2');
                mark = true;
            }
            transaction.executeSql('SELECT * FROM ' + settingsTable + '', [], function (tx, results) {
                var len = results.rows.length;
                if (len > 0) {
                    var startDate = results.rows.item(0).startdate;

                    if(startDate != "") {
                        var allowedTime = results.rows.item(0).drinkdays, totalTime = 0, differenceToShow = -1, message = "";

                        var lastDrinkDate = new XDate(startDate);
                        todayDate = formatDate();

                        var difference;

                        var number = allowedTime.split("-")[0];
                        var duration = allowedTime.split("-")[1];

                        if (duration == "d") {
                            totalTime = number;
                            difference = lastDrinkDate.diffDays(todayDate);
                        }
                        else if (duration == "w") {
                            totalTime = number * 7;
                            difference = lastDrinkDate.diffDays(todayDate);
                        }
                        else if (duration == "m") {
                            totalTime = number;

                            difference = lastDrinkDate.diffMonths(todayDate);

                            lastDrinkDate.addMonths(Math.floor(difference)+1);

                            differenceToShow = -1 * lastDrinkDate.diffDays(todayDate);

                            if(number != 1) {
                                if (totalTime - (Math.floor(difference) + 1) > 0) {
                                    message = toastMessages.drink_after + " " + (totalTime - (Math.floor(difference) + 1)) + " " + toastMessages.months + " & " + (differenceToShow) + " " + toastMessages.days;
                                }
                            }

                        }
                        else {
                            totalTime = number;

                            difference = lastDrinkDate.diffYears(todayDate);

                            lastDrinkDate.addYears(Math.floor(difference)+1);

                            var months = -1 * Math.floor(lastDrinkDate.diffMonths(todayDate));

                            lastDrinkDate.addMonths(-1 * (Math.floor(months)-1));

                            differenceToShow = -1 * lastDrinkDate.diffDays(todayDate);

                            if ( months-1 > 0) {
                                message = toastMessages.drink_after + " " + (months-1) + " " + toastMessages.months + " & " + (differenceToShow) + " " + toastMessages.days;
                            }

                        }

                        if (difference != 0 && (difference % totalTime) == 0 && !mark) {
                            $('#quota_yes').fadeIn();
                        }
                        else {
                            $('#quota_no').fadeIn();

                            if(differenceToShow == -1) {
                                differenceToShow = totalTime - parseInt(difference % totalTime);
                            }

                            if (differenceToShow == 1) {
                                showToast(toastMessages.drink_tomorrow);
                            }
                            else {
                                if (message == "") {
                                    showToast(toastMessages.drink_after + " " + (differenceToShow) + " " + toastMessages.days);
                                }
                                else{
                                    showToast(message);
                                }
                            }
                        }
                    }
                    else{
                        $('#quota_yes').fadeIn();
                    }
                }
            }, null);
        }, null);
    });
}

function onSettingBtnClicked(event) {
    event.preventDefault();

    window.location = "settings.html";
}

function onBackArrowPressed(event) {
    event.preventDefault();

    window.location = "../index.html";
}

function onResume() {
    window.location.reload();
}

function onBackButtonPressed() {
    window.location = "../index.html";
}

function onKeepGlassFullClicked(event) {
    event.preventDefault();

    window.localStorage.setItem(storage_key + "color", "green");

    window.location = "hiad.html";
}

function onDontCareClicked(event) {
    event.preventDefault();

    if (!($('#no_care').hasClass('disabled-btn'))) {
        window.localStorage.setItem(storage_key + "color", "red");

        window.location = "hiad.html";
    }
    else {
        showToast(toastMessages.already_updated_status, "long");
    }
}