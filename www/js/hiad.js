/**
 * Created by alihassan on 20/06/2016.
 */
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    $("#view_stats").click(onViewStatsClicked);
    $("#back_arrow").click(onBackArrowPressed);
    $("#setting_button").click(onSettingBtnClicked);

    document.addEventListener('backbutton', onBackButtonPressed, false);

    updateAppLanguage();

    openDB();
    updateStats();
}

function updateAppLanguage() {
    if (window.localStorage.getItem(storage_key + "language") != undefined) {
        var storedLanguage = window.localStorage.getItem(storage_key + "language");

        if (storedLanguage == "russian") {
            currentPage = lang_russian.hiad_page;
            toastMessages = lang_russian.toast_messages;
        }
        else {
            currentPage = lang_english.hiad_page;
            toastMessages = lang_english.toast_messages;
        }
    }

    $(".title").html(currentPage.title);

    $("#message").html(currentPage.message);
    $("#view_stats").html(currentPage.view_stats_btn);
}

function updateStats() {
    var todayDate = formatDate();

    var color = "";

    if (window.localStorage.getItem(storage_key + "color") === null) {
        dbHandler.transaction(function (transaction) {
            transaction.executeSql('SELECT * FROM ' + settingsTable + '', [], function (tx, results) {
                var len = results.rows.length;
                if (len > 0) {
                    var startDate = results.rows.item(0).startdate;

                    if (startDate != "") {
                        var allowedTime = results.rows.item(0).drinkdays, totalTime = 0;

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
                        }
                        else {
                            totalTime = number;
                            difference = lastDrinkDate.diffYears(todayDate);
                        }

                        if (difference != 0 && (difference % totalTime) == 0) {
                            color = "green";
                            updateStatvalues(color, todayDate);
                        }
                        else {
                            color = "red";
                            updateStatvalues(color, todayDate);
                        }
                    }
                    else {
                        color = "green";
                        updateStatvalues(color, todayDate);
                    }
                }
            }, null);

        });
    }
    else {
        color = window.localStorage.getItem(storage_key + "color");
        window.localStorage.removeItem(storage_key + "color");

        updateStatvalues(color, todayDate);
    }
}

function updateStatvalues(color, date) {
    dbHandler.transaction(function (transaction) {
        var executeQuery = "INSERT INTO " + statsTable + " (" + statsTableColumns.date + ", " + statsTableColumns.color + ") VALUES (?,?)";
        transaction.executeSql(executeQuery, [date, color]
            , function (tx, result) {
                // success
                if (result.insertId == 1) {

                    date = formatDate();
                    var executeQuery = "UPDATE " + settingsTable + " SET " + settingsTableColumns.startDate + " =?";
                    transaction.executeSql(executeQuery, [date]
                        , function (tx, result) {
                            $(".first-layer").fadeIn();
                        }, function (error) {
                            showToast(toastMessages.something_wrong, "long");
                        });
                }
                else {
                    $(".first-layer").fadeIn();
                }
            },
            function (error) {
                showToast(toastMessages.already_updated_status, "long");
            }
        );
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

function onBackButtonPressed() {
    window.location = "../index.html";
}

function onViewStatsClicked(event) {
    event.preventDefault();

    window.location = "stats.html";
}