/*
書籍を登録する
*/
function save() {
    /*
    if (!confirm("登録しますか？")) {
      Browser.msgBox("キャンセルしました。");
      return;
    }*/
    var isbnList = getIsbnList();
    var valided = validType(isbnList);
    /*
    if (valided['errorMsg']) {
      outPutErrorMsg(errorMsg);
      return;
    }
    var errorMsg = validDuplication();
    if (!errorMsg) {
      outPutErrorMsg(errorMsg);
    }*/

    var responseList = fetchBooks(valided['data']);
    for (var i=0; i< responseList.length; i++) {
        saveCell(responseList[i]['data']);
    }
    /*
    Browser.msgBox("登録しました。");
    return;*/
}

/*
ISBNのリストを取る
*/
function getIsbnList() {
    var range = getRangeByColWithSaveArea();
    return range.map(function(value) {
        return value[0];
    });
};