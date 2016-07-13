var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },

    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        //document.addEventListener("backbutton", BackKeyDown, true);
    },

    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {

        $("#cidt").click(onCheckQuotaClicked);
        $("#already_drunk").click(onAlreadyDrunkClicked);
        $("#stats").click(onStatsClicked);
        $("#setting_button").click(onSettingBtnClicked);

        document.addEventListener('backbutton', onBackButtonPressed, false);
        document.addEventListener("resume", onResume, false);

        openDB();
        if (window.localStorage.getItem(storage_key+"installed") == undefined) {

            window.localStorage.setItem(storage_key+"language", "russian");

            updateAppLanguage();
            initializeDB();

            window.localStorage.setItem(storage_key+"installed", true);
        }
        else {
            updateAppLanguage();
        }
        checkDrinkStatus();
    }
};

function updateAppLanguage(){
    if (window.localStorage.getItem(storage_key+"language") != undefined) {
        var storedLanguage = window.localStorage.getItem(storage_key + "language");

        if (storedLanguage == "russian") {
            currentPage = lang_russian.index_page;
            toastMessages = lang_russian.toast_messages;
        }
        else {
            currentPage = lang_english.index_page;
            toastMessages = lang_english.toast_messages;
        }
    }

    $(".title").html(currentPage.title);

    $("#cidt").html(currentPage.quota_btn);
    $("#already_drunk").html(currentPage.already_drunk_btn);
    $("#stats").html(currentPage.stats_btn);

}

function checkDrinkStatus(){
    dbHandler.transaction(function (transaction) {
        var todayDate = formatDate();
        transaction.executeSql('SELECT ' + statsTableColumns.date + ' FROM ' + statsTable + ' WHERE ' + statsTableColumns.date + ' =?', [todayDate], function (tx, results) {
            var len = results.rows.length;
            if(len > 0){
                $("#already_drunk").addClass('disabled-btn').removeClass('btn2');

                callback();
            }
            else {
                transaction.executeSql('SELECT ' + statsTableColumns.date + ' FROM ' + statsTable + ' ORDER BY ' + statsTableColumns.date + ' DESC LIMIT 1', [], function (tx, results) {
                    var len = results.rows.length;
                    if (len > 0) {
                        var drinkDate = results.rows.item(0).drinkdate;

                        var lastDrinkDate = new XDate(drinkDate);
                        todayDate = formatDate();

                        if (lastDrinkDate.diffDays(todayDate) == 0) {
                            $("#already_drunk").addClass('disabled-btn').removeClass('btn2');
                        }
                    }
                    callback();
                }, null);
            }
        }, null);
    });
}

function callback(){
    $(".first-layer").fadeIn();
}

function onSettingBtnClicked(event) {
    event.preventDefault();

    window.location = "screens/settings.html";
}

function onResume() {
    window.location.reload();
}

function onBackButtonPressed(){
    navigator.app.exitApp();
}

function onCheckQuotaClicked(event) {
    event.preventDefault();

    window.location = "screens/cidt.html";
}

function onAlreadyDrunkClicked(event) {
    event.preventDefault();

    if (!($('#already_drunk').hasClass('disabled-btn'))) {
        window.location = "screens/verify_already_drunk.html";
    }
    else{
        showToast(toastMessages.already_updated_status, "long");
    }
}

function onStatsClicked(event) {
    event.preventDefault();

    window.location = "screens/stats.html";
}

