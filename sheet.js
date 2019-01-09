var THIS_SPREADSHEET_ID = "1K2wFgg6U-UDWjKsTkb2M3uo8LikLEFkL8oYzl_jHGAU",
    BASE_COL = "A",
    BASE_ROW = "2";

var BOOK_LIST_TAB = '一覧',
    BOOK_LIST_TITLE_COL = "B",
    BOOK_LIST_DEADLINE_COL = "E";

var BOOK_SAVE_TAB = '登録',
    BOOK_SAVE_RESULT_COL = "B",
    MAX_SAVE_ROW = "42";


var AMAZON_LINK = "https://www.amazon.co.jp"
/*
指定列(ex."B")の最終行を求める
*/
function getLastRowWithValue(sheet, col) {
    var columnBVals = sheet.getRange(col+":"+col).getValues();
    return columnBVals.filter(String).length;
}

/*
シートオブジェクトを取得する
*/
function getSheetByTab(tab) {
    // TODO: キャッシュで高速化
    var spreadsheet = SpreadsheetApp.openById(THIS_SPREADSHEET_ID);
    return spreadsheet.getSheetByName(tab);
}

/*
登録エリアにある値を取得
*/
function getRangeByColWithSaveArea() {
    return getRangeByColWith(BOOK_SAVE_TAB, BASE_COL);
}

/*
一覧エリアにある値(ISBN)を取得
*/
function getRangeIsbnByColWithListArea() {
    return getRangeByColWith(BOOK_LIST_TAB, BASE_COL);
}

/*
一覧エリアにある値(返却予定日)を取得
*/
function getRangeIsbnByColWithListArea() {
    return getRangeByColWith(BOOK_LIST_TAB, BOOK_LIST_DEADLINE_COL);
}

/*
任意のエリアにある値を取得
*/
function getRangeByColWith(tab, COL) {
    var sheet = getSheetByTab(tab);
    var lastRow = getLastRowWithValue(sheet, COL);
    var rangeCell = COL+BASE_ROW+":"+COL+lastRow;
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
    var rangeCell = BASE_COL+BASE_ROW+":"+BASE_COL+MAX_SAVE_ROW;
    sheet.getRange(rangeCell).clearContent()
}

/*
登録エリア(結果)をクリアする
*/
function clearResultWithSaveArea() {
    var sheet = getSheetByTab(BOOK_SAVE_TAB);
    var rangeCell = BOOK_SAVE_RESULT_COL+BASE_ROW+":"+BOOK_SAVE_RESULT_COL+MAX_SAVE_ROW;
    sheet.getRange(rangeCell).clearContent()
}

/*
書籍を登録する
*/
function saveCell(data) {
    var sheet = getSheetByTab(BOOK_LIST_TAB);
    var lastRow = getLastRowWithValue(sheet, BASE_COL);
    var title = data[0]['summary']['title'];
    var isbn13 = data['isbn'];
    var isbn10 = isbn13to10(isbn13);
    var amazonItemLink = AMAZON_LINK + "/dp/"+ isbn10;
    sheet.getRange(BASE_COL+(lastRow+1)).setValue(isbn13);
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
        var rangeCell = BOOK_SAVE_RESULT_COL+(parseInt(BASE_ROW)+index);
        sheet.getRange(rangeCell).setValue(message);
    }
}