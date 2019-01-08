var GOOGLE_BOOK_API = "https://www.googleapis.com/books/v1/volumes";

/*
書籍情報を取得する(複数)
*/
function fetchBooks(isbnList) {
    var result = [];
    for(var i=0;i<isbnList.length;i++) {
        var isbn = isbnList[i];
        var book = fetchBook(isbn);
        result.push(book);
    };
    return result;
}

/*
書籍情報を取得する(単数)
*/
function fetchBook(isbn) {
    var extUrl = "?q=isbn:"+isbn;
    var res = UrlFetchApp.fetch(GOOGLE_BOOK_API + extUrl),
        data = JSON.parse(res.getContentText());
    data['isbn'] = isbn;
    return {
        'res': res,
        'data': data,
    }
}