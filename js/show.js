function globalList(){
    var req = new XMLHttpRequest();
    req.open("get", "../lists/global.csv", true);
    req.send(null);
    req.onload = function(){
      var str = req.responseText;
	    convertCSVtoArray(req.responseText);
    }
}
 
// 読み込んだCSVデータを二次元配列に変換する関数convertCSVtoArray()の定義
function convertCSVtoArray(str){ // 読み込んだCSVデータが文字列として渡される
    var result = []; // 最終的な二次元配列を入れるための配列
    var tmp = str.split("\n"); // 改行を区切り文字として行を要素とした配列を生成
 
    // 各行ごとにカンマで区切った文字列を要素とした二次元配列を生成
    for(var i=0;i<tmp.length;++i){
        result[i] = tmp[i].split(',');
    }
 
    alert(result[0][0]); // 300yen
}
 
globalList(); //最初に実行される