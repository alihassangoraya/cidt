/**
 * Created by alihassan on 20/06/2016.
 */
var datesArray = [];
var colorsArray = [];

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    $("#back_arrow").click(onBackArrowPressed);
    $("#setting_button").click(onSettingBtnClicked);

    document.addEventListener('backbutton', onBackButtonPressed, false);
    document.addEventListener('resume', onResume, false);

    updateAppLanguage();

    openDB();
    readStatsDates();
}

function updateAppLanguage(){
    if (window.localStorage.getItem(storage_key+"language") != undefined) {
        var storedLanguage = window.localStorage.getItem(storage_key + "language");

        if (storedLanguage == "russian") {
            currentPage = lang_russian.stats_page;
            toastMessages = lang_russian.toast_messages;
        }
        else {
            currentPage = lang_english.stats_page;
            toastMessages = lang_english.toast_messages;
        }
    }

    $(".title").html(currentPage.title);

    $("#cidt").html(currentPage.quota_btn);
    $("#already_drunk").html(currentPage.already_drunk_btn);
    $("#stats").html(currentPage.stats_btn);

    $(".first-layer").fadeIn();
}

function readStatsDates(){

    dbHandler.transaction(function (transaction) {
        transaction.executeSql('SELECT * FROM ' + statsTable + '', [], function (tx, results) {
            var len = results.rows.length, i;

            if (len > 0) {
                for (i = 0; i < len; i++) {
                    datesArray[i] = results.rows.item(i).drinkdate;
                    colorsArray[i] = results.rows.item(i).color;
                }
            }

            populateCalender();
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

function onBackButtonPressed(){
    window.location = "../index.html";
}

function populateCalender() {
    var my_calendar = $("#dncalendar-container").dnCalendar({
        minDate: "1980-01-15",
        maxDate: "2216-12-02",
        defaultDate: formatDate(),
        monthNames: currentPage.month_names,
        monthNamesShort: currentPage.month_names_short,
        dayNames: currentPage.day_names,
        dayNamesShort: currentPage.day_names_short,
        dataTitles: {defaultDate: currentPage.default_date_title, today: currentPage.default_date_title},
        startWeek: currentPage.start_week,

        dayClick: function (date, view) {
            //alert(date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear());
        }
    });

    my_calendar.build();
}

function onResume(){
    window.location.reload();
}