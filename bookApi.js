var BOOK_API = "https://api.openbd.jp/v1/get";

/*
書籍情報を取得する(複数)
*/
function fetchBooks(isbnList) {
    var result = [];
    var message = [];
    for(var i=0;i<isbnList.length;i++) {
        var isbn = isbnList[i]['value'];
        var book = fetchBook(isbn);
        if(book['data'][0]) {
            message.push({
                'index': isbnList[i]['index'],
                'message': '登録しました。',
            })
            result.push(book);
        } else {
            message.push({
                'index': isbnList[i]['index'],
                'message': 'データがありませんでした。',
            })
        }
    };
    return {
        'result': result,
        'message': message,
    };
}

/*
書籍情報を取得する(単数)
*/
function fetchBook(isbn) {
    var extUrl = "?isbn="+isbn;
    var res = UrlFetchApp.fetch(BOOK_API + extUrl),
        data = JSON.parse(res.getContentText());
    data['isbn'] = isbn;
    return {
        'res': res.getResponseCode(),
        'data': data,
    }
}