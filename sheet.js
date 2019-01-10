var THIS_SPREADSHEET_ID = "1K2wFgg6U-UDWjKsTkb2M3uo8LikLEFkL8oYzl_jHGAU";

var BOOK_LIST_TAB = "sample",
    BOOK_LIST_TITLE_COL = "C",
    BOOK_LIST_DEADLINE_COL = "G",
    BOOK_LIST_BASE_COL = "B",
    BOOK_LIST_USER_COL = "F",
    BOOK_LIST_BASE_ROW = "10",
    MAX_BOOK_LIST_ROW = "209";

var BOOK_SAVE_TAB = "登録",
    BOOK_SAVE_RESULT_COL = "B",
    BOOK_SAVE_BASE_COL = "A",
    BOOK_SAVE_BASE_ROW = "2",
    MAX_SAVE_ROW = "41";

var USER_TAB = "ユーザーリスト",
    USER_BASE_ROW = "2",
    USER_NAME_COL = "A",
    USER_ID_COL = "B",
    MAX_USER_ROW = "200";

var AMAZON_LINK = "https://www.amazon.co.jp"
/*
指定列(ex."B")の最終行を求める
*/
function getLastRowWithValue(sheet, rangeCell) {
    var columnBVals = sheet.getRange(rangeCell).getValues();
    return columnBVals.filter(function(value){
        return value != ""
    }).length;
}

/*
シートオブジェクトを取得する
*/
function getSheetByTab(tab) {
    var spreadsheet = SpreadsheetApp.openById(THIS_SPREADSHEET_ID);
    return spreadsheet.getSheetByName(tab);
}

/*
登録エリアにある値を取得
*/
function getRangeByColWithSaveArea() {
    return getRangeByColWith(BOOK_SAVE_TAB, BOOK_SAVE_BASE_COL, BOOK_SAVE_BASE_ROW, MAX_SAVE_ROW);
}

/*
一覧エリアにある値(ISBN)を取得
*/
function getRangeIsbnByColWithListArea() {
    return getRangeByColWith(BOOK_LIST_TAB, BOOK_LIST_BASE_COL, BOOK_LIST_BASE_ROW, MAX_BOOK_LIST_ROW);
}

/*
任意のエリアにある値を取得
*/
function getRangeByColWith(tab, Col, HighRow, LowRow) {
    var sheet = getSheetByTab(tab);
    var rangeCell = Col+HighRow+":"+Col;
    var lastRow = parseInt(HighRow) + getLastRowWithValue(sheet, rangeCell) - 1;
    rangeCell = Col+HighRow+":"+Col+lastRow;
    var range = sheet.getRange(rangeCell).getValues();
    return range;
}

/*
登録エリアをクリアする
*/
function clearWithSaveArea() {
    clearIsbnWithSaveArea();
    clearResultWithSaveArea();
}

/*
登録エリア(ISBN)をクリアする
*/
function clearIsbnWithSaveArea() {
    var sheet = getSheetByTab(BOOK_SAVE_TAB);
    var rangeCell = BOOK_SAVE_BASE_COL+BOOK_SAVE_BASE_ROW+":"+BOOK_SAVE_BASE_COL+MAX_SAVE_ROW;
    sheet.getRange(rangeCell).clearContent()
}

/*
登録エリア(結果)をクリアする
*/
function clearResultWithSaveArea() {
    var sheet = getSheetByTab(BOOK_SAVE_TAB);
    var rangeCell = BOOK_SAVE_RESULT_COL+BOOK_SAVE_BASE_ROW+":"+BOOK_SAVE_RESULT_COL+MAX_SAVE_ROW;
    sheet.getRange(rangeCell).clearContent()
}

/*
書籍を登録する
*/
function saveCell(data) {
    var sheet = getSheetByTab(BOOK_LIST_TAB);
    var rangeCell = BOOK_LIST_BASE_COL+BOOK_LIST_BASE_ROW+":"+BOOK_LIST_BASE_COL
    var lastRow = parseInt(BOOK_LIST_BASE_ROW) + getLastRowWithValue(sheet, rangeCell) - 1;
    var title = data[0]['summary']['title'];
    var isbn13 = data['isbn'];
    var isbn10 = isbn13to10(isbn13);
    var amazonItemLink = AMAZON_LINK + "/dp/"+ isbn10;
    sheet.getRange(BOOK_LIST_BASE_COL+(lastRow+1)).setValue(isbn13);
    sheet.getRange(BOOK_LIST_TITLE_COL+(lastRow+1)).setValue('=HYPERLINK("' + amazonItemLink + '","' + title + '")');
}

/*
結果を表示する
*/
function outPut(data) {
    var sheet = getSheetByTab(BOOK_SAVE_TAB);
    for (var i=0; i<data.length;i++) {
        var index = data[i]['index'];
        var message = data[i]['message'];
        var rangeCell = BOOK_SAVE_RESULT_COL+(parseInt(BOOK_SAVE_BASE_ROW)+index);
        sheet.getRange(rangeCell).setValue(message);
    }
}

/*
指定レンジの値を取る
*/
function getCellValue(sheet, range) {
    return sheet.getRange(range).getValues()[0][0];
}