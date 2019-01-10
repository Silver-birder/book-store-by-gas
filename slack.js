var username = 'Book-Store-Bot',
    icon = ':notebook_with_decorative_cover:',
    channel = '#general';

/*
slackに通知する
*/
function sendSlack(message) {
    var prop = PropertiesService.getScriptProperties().getProperties();
    var slackApp = SlackApp.create(prop.slack_token);
    var Message = slackApp.postMessage(
        channel, message, {
            username : username,
            icon_emoji: icon
        }
    );
};

/*
返却期限が過ぎているユーザーに通知する
*/
function announceDeadline(user, bookTitle) {
    sendSlack("<@"+ user+"> 「"+ bookTitle+"」の返却期限が過ぎています。返却しスプレットシートを更新して下さい。");
}