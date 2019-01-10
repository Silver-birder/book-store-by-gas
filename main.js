/*
書籍を登録する
*/
function save() {
    /*
    if (!confirm("登録しますか？")) {
      Browser.msgBox("キャンセルしました。");
      return;
    }*/
    clearResultWithSaveArea();

    var isbnList = getWillSaveIsbnList();
    var valided = validType(isbnList);

    if (valided['errorMsg'].length > 0) {
        outPut(valided['errorMsg']);
    }
    var savedIsbnList = getSavedIsbnList();
    valided = validDuplication(valided['data'], savedIsbnList);
    if (valided['errorMsg'].length > 0) {
        outPut(valided['errorMsg']);
    }
    if (valided['data'].length == 0) {
        Browser.msgBox("登録に失敗しました。");
        return;
    }
    var responseList = fetchBooks(valided['data']);
    for (var i=0; i< responseList['result'].length; i++) {
        saveCell(responseList['result'][i]['data']);
    }
    outPut(responseList['message']);

    Browser.msgBox("完了しました。");
    return;
}

/*
これから登録するISBNのリストを取る
*/
function getWillSaveIsbnList() {
    var range = getRangeByColWithSaveArea();
    return range.map(function(value, index) {
        return {
            'index': index,
            'value': value[0]
        }
    });
};

/*
既に登録しているISBNのリストを取る
*/
function getSavedIsbnList() {
    var range = getRangeIsbnByColWithListArea();
    return range.map(function(value) {
        return String(value[0]);
    });
};

/*
登録エリアをクリアする
*/
function clear() {
    if (!confirm("クリアしますか？(ctrl+Zで戻せません。)")) {
        Browser.msgBox("キャンセルしました。");
        return;
    }
    clearWithSaveArea();
}

