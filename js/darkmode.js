var urlParam = location.search.substring(1);

if(urlParam) {
  var param = urlParam.split('&');
  var paramArray = [];

  for (i = 0; i < param.length; i++) {
    var paramItem = param[i].split('=');
    paramArray[paramItem[0]] = paramItem[1];
  }

  if (paramArray.theme == 'dark') {
    var docbody = document.body;
    docbody.classList.add('darkmode');
  }
}