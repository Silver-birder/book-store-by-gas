/*
入力値の型をチェックする
*/
function validType(isbnList) {
    var errorMsg = [];
    var filterIsbnList = [];
    for (var i=0; i<isbnList.length;i++) {
        var value = isbnList[i]['value'];
        var int_value = parseInt(value);
        // 先頭文字が0なら縮小されるが、ISBNの規格上存在しないため考慮しない
        var str_value = String(value);
        var number_digit = str_value.length;
        if (isNaN(int_value)) {
            errorMsg.push({
                'index': isbnList[i]['index'],
                'message': '数字を入力して下さい。',
            });
            continue;
        }
        if (number_digit < 10 || number_digit > 13) {
            errorMsg.push({
                'index': isbnList[i]['index'],
                'message': '10桁以上13桁以下で入力して下さい。',
            });
            continue;
        }
        isbnList[i]['value']　= String(value);
        filterIsbnList.push(isbnList[i]);
    }
    return {
        'errorMsg': errorMsg,
        'data': filterIsbnList,
    };
}

/*
重複をチェックする
*/
function validDuplication(isbnList, savedIsbnList) {
    var errorMsg = [];
    var filterIsbnList = [];
    for (var i=0;i<isbnList.length;i++) {
        var isbn = isbnList[i]['value'];
        var str_isbn = String(isbn);
        // 既に登録済ならエラー
        if (savedIsbnList.indexOf(isbn) != -1) {
            errorMsg.push({
                'index': isbnList[i]['index'],
                'message': '既に登録済みです。',
            });
            continue;
        }
        isbnList[i]['value'] = String(isbn);
        filterIsbnList.push(isbnList[i]);
        savedIsbnList.push(str_isbn);
    };
    return {
        'errorMsg': errorMsg,
        'data': filterIsbnList,
    };
}