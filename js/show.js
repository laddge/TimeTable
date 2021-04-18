var classId = getClassId();
var className = getClassName(classId);
var mainReq = new XMLHttpRequest();
mainReq.open('get', 'lists/' + classId + '/main.csv?ver=' + ver, false);
mainReq.send(null);
var mainCsv = convertCSVtoArray(mainReq.responseText);
var defaultReq = new XMLHttpRequest();
defaultReq.open('get', 'lists/' + classId + '/default.csv?ver=' + ver, false);
defaultReq.send(null);
var defaultCsv = convertCSVtoArray(defaultReq.responseText);

function getClassId() {
  var urlParam = location.search.substring(1);

  if (urlParam) {
    var param = urlParam.split('&');
    var paramArray = [];

    for (i = 0; i < param.length; i++) {
      var paramItem = param[i].split('=');
      paramArray[paramItem[0]] = paramItem[1];
    }

    return paramArray.class;
  }
  return '21-2-1-RA'
}

function getClassName(classId) {
  var req = new XMLHttpRequest();
  req.open('get', 'lists/' + classId + '/name.txt?ver=' + ver, false);
  req.send(null);
  return req.responseText;
}

function show(date) {
  var output = document.getElementById('output');
  var showDate = document.getElementById('showDate');
  var showName = document.getElementById('showName');
  showName.innerHTML = '時間割';
  var getMainList = mainList(date);
  var day = getMainList[0];
  var specialList = getMainList[1];
  if (day == 'NotFound') {
    output.innerHTML = 'クラスが<br>登録されて<br>いません';
    return
  }
  showName.innerHTML = className;
  document.getElementById('back').style.display = 'table';
  document.getElementById('forward').style.display = 'table';
  if (day == '') {
    output.innerHTML = 'データが<br>ありません';
    showDate.innerHTML = date;
    return;
  }
  showDate.innerHTML = date + '(' + day + ')';
  if (day == '休日') {
    output.innerHTML = '休日です！';
    return;
  }
  if (specialList.length != 0) {
    var list = specialList;
  } else {
    var list = defaultList(day);
    if (list.length == 0) {
      output.innerHTML = 'データが<br>ありません';
      showDate.innerHTML = date;
      return;
    }
  }
  output.innerHTML = '';
  list.some((content, num) => {
    output.innerHTML = output.innerHTML + '<tr><td width=1em>' + (num + 1) + '</td><td>' + content + '</td></tr>';
  });
}

function mainList(date) {
  if (mainReq.status == 404) {
    return ['NotFound', []]
  }
  var cnt;
  var onList = 0;
  mainCsv.some((row, i) => {
    row.some((element, j) => {
      if (element == date) {
        cnt = i;
        onList = 1;
        return true;
      }
    });
  });
  if (onList == 0) {
    return ['', []];
  }
  if (mainCsv[cnt].length > 2) {
    return [mainCsv[cnt][1], mainCsv[cnt].slice(2)];
  } else {
    return [mainCsv[cnt][1], []];
  }
}

function defaultList(day) {
  var cnt;
  var onList = 0;
  defaultCsv.some((row, i) => {
    row.some((element, j) => {
      if (element == day) {
        cnt = i;
        onList = 1;
        return true;
      }
    });
  });
  if (onList == 1) {
    return defaultCsv[cnt].slice(1);
  } else {
    return [];
  }
}

function convertCSVtoArray(str) {
  var result = [];
  var tmp = str.split("\n");
  for (var i = 0; i < tmp.length; ++i) {
    result[i] = tmp[i].split(',');
  }
  return result;
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

var forwardDate = function() {
  var currentDate = ('20' + document.getElementById('showDate').innerHTML).substr(0, 10); // Only 20XX
  var date = new Date(currentDate);
  date.setDate(date.getDate() + 1);
  var theDay = getFormatedDate(date);
  show(theDay);
}

var backDate = function() {
  var currentDate = ('20' + document.getElementById('showDate').innerHTML).substr(0, 10); // Only 20XX
  var date = new Date(currentDate);
  date.setDate(date.getDate() - 1);
  var theDay = getFormatedDate(date);
  show(theDay);
}

var showToday = function () {
  var today = getFormatedDate(new Date());
  show(today);
}

showToday();
