/**
 * Created by alihassan on 20/06/2016.
 */
var currentPage, toastMessages;

var storage_key = "cidt_", defaultDrinkDays = "7-d";

var dbHandler, databaseName = "cidt_db.db", settingsTable = "settings", statsTable = "stats";

var settingsTableColumns = {
    'drinkDays': 'drinkdays',
    'language': 'language',
    'startDate': 'startdate'
};

var statsTableColumns = {
    'id': 'id',
    'date': 'drinkdate',
    'color': 'color'
};

function openDB() {
    dbHandler = window.sqlitePlugin.openDatabase({name: databaseName, location: 'default'});
}

function closeDB() {
    dbHandler.close(function () {
        //console.log("DB closed!");
    }, function (error) {
        showToast(toastMessages.closing_db_error + error.message);
    });
}

function initializeDB() {

    dbHandler.transaction(function (transaction) {
        transaction.executeSql('CREATE TABLE IF NOT EXISTS ' + settingsTable + ' (' + settingsTableColumns.drinkDays + ' TEXT, ' + settingsTableColumns.language + ' TEXT, '+ settingsTableColumns.startDate +' DATE)', [],
            function (tx, result) {
                // success

                insertDefaultRecord();
            },
            function (error) {
                showToast(toastMessages.creating_table_error);
            }
        );
        transaction.executeSql('CREATE TABLE IF NOT EXISTS ' + statsTable + ' (' + statsTableColumns.id + ' INTEGER PRIMARY KEY AUTOINCREMENT, ' + statsTableColumns.color + ' TEXT, ' + statsTableColumns.date + ' DATE UNIQUE)', [],
            function (tx, result) {
                // success
            },
            function (error) {
                showToast(toastMessages.creating_table_error);
            }
        );
    });
}

function getDefaultLanguage(){
    dbHandler.transaction(function (transaction) {
        transaction.executeSql('SELECT * FROM ' + settingsTable + '', [], function (tx, results) {
            var len = results.rows.length;
            if (len > 0) {
                defaultLanguage = results.rows.item(0).language;
            }
        }, null);
    });
}

function insertDefaultRecord() {
    dbHandler.transaction(function (transaction) {
        transaction.executeSql('SELECT * FROM ' + settingsTable + '', [], function (tx, results) {
            var len = results.rows.length;
            if (len < 1) {
                var executeQuery = "INSERT INTO " + settingsTable + " (" + settingsTableColumns.drinkDays + ", " + settingsTableColumns.language + ", " + settingsTableColumns.startDate + ") VALUES (?,?,?)";
                transaction.executeSql(executeQuery, [defaultDrinkDays, defaultLanguage, '']
                    , function (tx, result) {
                        showToast(toastMessages.app_ready_message, "long");
                    },
                    function (error) {
                        showToast(toastMessages.app_install_error, "long");
                    });
            }
        }, null);
    });
}

function showToast(message, length, position) {
    if (cordova.platformId != "browser") {

        if (!length)
            length = "short";
        if (!position)
            position = "bottom";

        window.plugins.toast.show(message, length, position,
            function (a) {
                // success
            },
            function (b) {
                alert(toastMessages.toast_error + b)
            }
        );
    }
}

function formatDate(date) {
    var d;

    if(date)
        d = new Date(date);
    else
        d = new Date();

    var month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

function isInternetConnected(){
    var networkState = navigator.connection.type;

    if (networkState !== Connection.NONE) {
        return true;
    }

    return false;
}