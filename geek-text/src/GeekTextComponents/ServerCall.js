var httpRequest;
var response;

const alertContents = () => {
    if (httpRequest.readyState === XMLHttpRequest.DONE) 
    {
        if (httpRequest.status === 200) 
        {
            if (httpRequest.responseText !== "0 results")
            {
                response = JSON.parse(httpRequest.responseText);
            }
            else
            {
                response = "0 results";
            }
        } 
        else 
        {
          alert('There was a problem with the request.');
        }
    }
}

const ServerCall = (method, params) => {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }

    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('POST', 'http://localhost/server.php/', false);
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequest.send('method=' + encodeURIComponent(method) + '&params=' + encodeURIComponent(params));
    return response;
}

export default ServerCall