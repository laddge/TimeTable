function getGlobalList(date) {
  var req = new XMLHttpRequest();
  req.open("get", "lists/global.csv", true);
  req.send(null);
  req.onload = function(){
  	var result = convertCSVtoArray(req.responseText);
  	result.forEach((row, i) => {
  	  row.forEach((element, j) => {
  	    if (element === date) {
  	      alert(result[i][1]);
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
          alert(result[i]);
          result[i].forEach(function (content) {
            show(content);
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

function show(content) {
  output = document.getElementById('output');
  output.innerHTML = output.innerHTML + '<br>' + content;
}

getGlobalList('21/01/22');