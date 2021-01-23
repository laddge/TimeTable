function getGlobalList(date) {
  var req = new XMLHttpRequest();
  req.open("get", "lists/global.csv", true);
  req.send(null);
  req.onload = function(){
  	var result = convertCSVtoArray(req.responseText);
  	var day = '休日';
  	result.forEach((row, i) => {
  	  row.forEach((element, j) => {
  	    if (element === date) {
  	      day = result[i][1];
  	    }
  	  });
  	});
  	document.getElementById('date').append(date + '(' + day + ')');
  	getClassList(day);
  }
}

function getClassList(day) {
  if (day == '休日') {
    show('休日です。', '');
    return 0;
  }
  var myclass = '1-1';
  var req = new XMLHttpRequest();
  req.open("get", "lists/" + myclass + ".csv", true);
  req.send(null);
  req.onload = function() {
    var result = convertCSVtoArray(req.responseText);
    result.forEach((row, i) => {
      row.forEach((element, j) => {
        if (element === day) {
          result[i].forEach((content, cnt) => {
            if (cnt != 0) {
              show(content, cnt);
            }
          })
        }
      })
    });
  }
}

function convertCSVtoArray(str){
  var result = [];
  var tmp = str.split("\n");
  for(var i=0;i<tmp.length;++i){
    result[i] = tmp[i].split(',');
  }
  return result;
}

function show(content, cnt) {
  output = document.getElementById('output');
  output.innerHTML = output.innerHTML + '<tr><td width=1em>' + cnt + '</td><td>' + content + '</td></tr>';
}

function getFormatedDate(date) {
  var yy = date.getFullYear();
  yy = ('0' + yy).slice(-2);
  var mm = date.getMonth() + 1;
  mm = ('0' + mm).slice(-2);
  var dd = date.getDate();
  dd = ('0' + dd).slice(-2);
  return yy + '/' + mm + '/' + dd;
}

var date = new Date();
today = getFormatedDate(date);
getGlobalList(today);