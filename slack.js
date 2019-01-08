var postUrl = 'https://hooks.slack.com/services/hogehoge', // incoming webhook
    username = 'Book-Store-Bot',
    icon = ':notebook_with_decorative_cover:';

/*
slackに通知する
*/
function sendSlack(message) {
    var jsonData = {
        "username" : username,
        "icon_emoji": icon,
        "text" : message,
        "channel": "#general",
    };
    var payload = JSON.stringify(jsonData);

    var options = {
        "method" : "post",
        "contentType" : "application/json",
        "payload" : payload
    };
    UrlFetchApp.fetch(postUrl, options);
};

/*
返却期限が過ぎているユーザーに通知する
*/
function announceDeadline(bookTitle, user) {
    sendSlack(user+" "+ bookTitle+"の返却期限が過ぎています。返却しスプレットシートを更新して下さい。");
}