/*
確認ダイアログを出す
*/
function confirm(msg) {
    var yourSelections = Browser.msgBox(msg,
        Browser.Buttons.OK_CANCEL);
    return yourSelections == 'ok'
}