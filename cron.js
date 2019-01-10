/*
返却予定日をチェックし、期限を過ぎていたら通知する
*/
function checkDeadLine() {
    var sheet = getSheetByTab(BOOK_LIST_TAB);
    for (var i=BOOK_LIST_BASE_ROW;i<=MAX_BOOK_LIST_ROW;i++) {
        var cellDeadLineDate = getCellValue(sheet, BOOK_LIST_DEADLINE_COL+i);
        if (cellDeadLineDate == "") {
            continue;
        }
        var diff = diffDay(new Date(), cellDeadLineDate);
        if (diff >= 0) {
            continue;
        }
        var userName = getCellValue(sheet, BOOK_LIST_USER_COL+i);
        var userSheet = getSheetByTab(USER_TAB);
        for(var j=USER_BASE_ROW;j<=MAX_USER_ROW;j++) {
            var userNameByUserTab = getCellValue(userSheet, USER_NAME_COL+j);
            if (userName != userNameByUserTab) {
                continue;
            };
            var userId = getCellValue(userSheet, USER_ID_COL+j);
            var bookTitle = getCellValue(sheet, BOOK_LIST_TITLE_COL+i);
            announceDeadline(userId, bookTitle);
            break;
        }
    }
}

function checkNextAnnounce() {

}