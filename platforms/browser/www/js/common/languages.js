/**
 * Created by alihassan on 22/06/2016.
 */

var defaultLanguage = "russian";

var lang_english = {
    index_page : {
        title : "Can I Drink Today?",
        quota_btn : "Check quota",
        already_drunk_btn : "Already Drunk!",
        stats_btn : "View Stats"
    },

    cidt_page : {
        title : "Check Quota?",
        yes_message : "You can drink today.",
        glass_full_btn : "Keep My Glass Full",
        no_message : "No quota. You drink too much!",
        no_care_btn : "I don't Care!"
    },

    hiad_page : {
        title : "Update Stats",
        message : "Stats updated!",
        view_stats_btn : "View Stats"
    },

    backup_page : {
        title : "Backup",
        heading : "Enter your e-mail:",
        backup_btn : "Backup",
        notification_message : "Do you want to start the backup? This will wipe your current backup. This action cannot be undone.",
        start_btn : "Start",
        cancel_btn : "Cancel",
        notification_title : "Start Backup?"
    },

    backup_ok_page : {
        title : "Backup",
        message : "Backup Successful."
    },

    restore_page : {
        title : "Restore",
        heading : "Enter your e-mail:",
        restore_btn : "Restore",
        notification_message : "Do you want to start the restore? This will wipe your current data. This action cannot be undone.",
        start_btn : "Start",
        cancel_btn : "Cancel",
        notification_title : "Start Restore?"
    },

    restore_ok_page : {
        title : "Restore",
        message : "Restore Successful."
    },

    verify_restore_page : {
        title : "Verify Email",
        message : "Please check your e-mail and enter a 4 digit code below",
        verify_btn : "Verify"
    },

    verify_already_drunk_page : {
        title : "Verify Already Drunk",
        message : "Are you sure?",
        yes_btn : "Yes",
        no_btn : "No"
    },

    settings_page : {
        title : "Settings",
        lang_heading : "Select language:",
        drink_heading : "Allow drink after:",
        drink_time_options : ["2 day","3 day","4 day","5 day","6 day","7 day","2 weeks","1 month","6 months","1 year"],
        drink_time_options_values : ["2-d","3-d","4-d","5-d","6-d","7-d","2-w","1-m","6-m","1-y"], // do not change it for any language
        update_settings_btn : "Update",
        advance_settings_link : "Advanced Settings"
    },

    advance_settings_page : {
        title : "Advance Settings",
        backup_btn : "Backup Data",
        restore_btn : "Restore"
    },

    stats_page : {
        title : "Stats",

        month_names: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
        day_names: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        day_names_short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        start_week: "sunday", // this should be written in English for every language
        default_date_title : "today"
    },

    toast_messages : {
        closing_db_error : "Error closing DB:",
        creating_table_error : "Error occurred while creating the table.",
        app_install_error : "App was not installed correctly.",
        app_ready_message : "App is ready to use.",
        drink_tomorrow : "you can drink tomorrow",
        drink_after : "You can drink after",
        days : "day(s)",
        months : "month(s)",
        already_updated_status : "Stats were updated already for today",
        updating_settings : "Updating Settings....",
        updated_settings : "Settings updated",
        update_settings_error : "Error in updating Settings",
        toast_error : "Toast error: ",
        nothing_to_backup : "There is nothing to backup",
        nothing_to_restore : "There is nothing to restore",
        email_required : "Email is required",
        code_required : "Verification code is required",
        incorrect_code : "Code is incorrect",
        server_error : "Error on server side, please contact support",
        invalid_email : "Email was invalid",
        no_backup : "No Backup was found against this email",
        restore_error : "Error on restoring data, please try later again",
        internet_connection_error: "You are not connected to Internet",
        something_wrong : "Something went wrong. Please try again!"
    }
};


var lang_russian = {
    index_page : {
        title : "АлкоЖена",
        quota_btn : "Можно выпить?",
        already_drunk_btn : "Уже пьяный!",
        stats_btn : "Статистика"
    },

    cidt_page : {
        title : "Можно выпить?",
        yes_message : "Сегодня можно",
        glass_full_btn : "Разрешить выпить",
        no_message : "Сегодня выпивать нельзя. Вы пьете слишком много!",
        no_care_btn : "Все равно выпью!"
    },

    hiad_page : {
        title : "Обновить статистику",
        message : "Статистика обновлена!",
        view_stats_btn : "Статистика"
    },

    backup_page : {
        title : "Архивировать",
        heading : "Введите свой e-mail:",
        backup_btn : "Архивировать",
        notification_message : "Хотите архивировать данные? Это удалит старые архивы. Данные нельзя будет вернуть.",
        start_btn : "Да",
        cancel_btn : "Нет",
        notification_title : "Начать архивацию?"
    },

    backup_ok_page : {
        title : "Архивация",
        message : "Архив успешно создан."
    },

    restore_page : {
        title : "Восстановление",
        heading : "Введите свой e-mail:",
        restore_btn : "Восстановить",
        notification_message : "Хотите начать процесс восстановление данных? Это удалит старые архивы. Данные нельзя будет вернуть.",
        start_btn : "Да",
        cancel_btn : "Нет",
        notification_title : "Начнем?"
    },

    restore_ok_page : {
        title : "Восстановление",
        message : "Ура! Данные восстановлены."
    },

    verify_restore_page : {
        title : "Код в почте",
        message : "Зайдите в почту и посмотрите в письме 4-значный код",
        verify_btn : "Ввести код"
    },

    verify_already_drunk_page : {
        title : "Подтвердите",
        message : "Вы уверены?",
        yes_btn : "Да",
        no_btn : "Нет"
    },

    settings_page : {
        title : "Настройки",
        lang_heading : "Выбор языка:",
        drink_heading : "Разрешить выпить через:",
        drink_time_options : ["2 дня","3 дня","4 дня","5 дней","6 дней","7 дней","2 недели","1 месяц","6 мес","1 год"],
        drink_time_options_values : ["2-d","3-d","4-d","5-d","6-d","7-d","2-w","1-m","6-m","1-y"], // do not change it for any language
        update_settings_btn : "Обновить",
        advance_settings_link : "Доп. настройки"
    },

    advance_settings_page : {
        title : "Доп. настройки",
        backup_btn : "Архивировать данные",
        restore_btn : "Восстановить данные"
    },

    stats_page : {
        title : "Статистика",

        month_names: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        month_names_short: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        day_names: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        day_names_short: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        start_week: "monday", // this should be written in English for every language
        default_date_title : "сегодня"
    },

    toast_messages : {
        closing_db_error : "Ошибка закрытия БД:",
        creating_table_error : "Ошибка создания траблицы.",
        app_install_error : "Приложение не было корректно установлено.",
        app_ready_message : "Все готово, можно использовать",
        drink_tomorrow : "Можно выпить завтра",
        drink_after : "Можно выпить через",
        days : "день(дней)",
        months : "месяц(ы)",
        already_updated_status : "На сегодня статистика уже обновлена",
        updating_settings : "Обновляем настройки....",
        updated_settings : "Настройки обновлены",
        update_settings_error : "Ошибка обновления настроек",
        toast_error : "Toast error: ",
        nothing_to_backup : "Нечего сохранять",
        nothing_to_restore : "Нечего восстанавливать",
        email_required : "Нужен Email",
        code_required : "Нужно ввести 4-значный код",
        incorrect_code : "Неправильный код",
        server_error : "Ошибка сервера, напишите в техподдержку",
        invalid_email : "Неправильный Email",
        no_backup : "Для этой почты нет архива",
        restore_error : "Ошибка восстановления данных, попробуйте снова",
        internet_connection_error: "У вас не работает интернет",
        something_wrong : "Что-то не то. Попробуйте еще раз!"
    }
};
