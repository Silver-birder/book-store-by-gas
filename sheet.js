var THIS_SPREADSHEET_ID = "1K2wFgg6U-UDWjKsTkb2M3uo8LikLEFkL8oYzl_jHGAU",
    BASE_COL = "A",
    BASE_ROW = "2";

var BOOK_LIST_TAB = '一覧',
    BOOK_TITLE_COL = "B";

var BOOK_SAVE_TAB = '登録';


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
    return getRangeByColWith(BOOK_SAVE_TAB);
}

/*
任意のエリアにある値を取得
*/
function getRangeByColWith(tab) {
    var sheet = getSheetByTab(tab);
    var lastRow = getLastRowWithValue(sheet, BASE_COL);
    var rangeCell = BASE_COL+BASE_ROW+":"+BASE_COL+lastRow;
    var range = sheet.getRange(rangeCell).getValues();
    return range;
}

/*
書籍を登録する
*/
function saveCell(data) {
    var sheet = getSheetByTab(BOOK_LIST_TAB);
    var lastRow = getLastRowWithValue(sheet, BASE_COL);
    var title = data['items'][0]['volumeInfo']['title'];
    var isbn = data['isbn'];
    sheet.getRange(BASE_COL+(lastRow+1)).setValue(isbn);
    sheet.getRange(BOOK_TITLE_COL+(lastRow+1)).setValue(title);
}