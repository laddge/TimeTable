function getGlobalList(date) {
  var req = new XMLHttpRequest();
  req.open("get", "lists/global.csv", true);
  req.send(null);
  req.onload = function(){
  	var result = convertCSVtoArray(req.responseText);
  	result.forEach((row, i) => {
  	  row.forEach((element, j) => {
  	    if (element === date) {
  	      document.getElementById('date').append(date + '(' + result[i][1] + ')');
  	      getClassList(result[i][1]);
  	    }
  	  })
  	});
  }
}

function getClassList(day) {
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

getGlobalList('21/01/22');