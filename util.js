/*
確認ダイアログを出す
*/
function confirm(msg) {
    var yourSelections = Browser.msgBox(msg,
        Browser.Buttons.OK_CANCEL);
    return yourSelections == 'ok'
}

/*
ISBN13をISBN10に変換する
 */
function isbn13to10(isbn13) {
    isbn13 += "";
    var digits = [];
    digits = isbn13.substr(3,9).split("") ;
    var sum = 0; var chk_tmp, chk_digit;
    for(var i = 0; i < 9; i++) {
        sum += digits[i] * (10 - i);
    }
    chk_tmp= 11 - (sum % 11);
    if (chk_tmp == 10) {
        chk_digit = 'x';
    } else if (chk_tmp == 11) {
        chk_digit = 0;
    } else {
        chk_digit = chk_tmp;
    }
    digits.push(chk_digit);
    return digits.join("");
}

/*
2つの日付の差を求める
 */
function diffDay(day1, day2) {
    return Math.ceil((day2 - day1) / 86400000);
}