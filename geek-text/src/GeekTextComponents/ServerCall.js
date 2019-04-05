var httpRequest;
var changeState;
var response;

const alertContents = () => {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
            if (httpRequest.responseText !== "0 results") {
                response = JSON.parse(httpRequest.responseText);
                changeState(response);
            }
            else {
                response = "0 results";
                changeState(response);
            }
        }
        else {
            alert('There was a problem with the request.');
        }
    }
}

const ServerCall = (method, params, changeStateFunctionCall) => {
    httpRequest = new XMLHttpRequest();
    changeState = changeStateFunctionCall;

    if (!httpRequest) {
        alert('Giving up :( Cannot create an XMLHTTP instance');
        return false;
    }
    console.log("SERVER CALL: method: " + method + " params: " + params);
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('POST', 'http://localhost:82/server.php/');
    httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    httpRequest.send('method=' + encodeURIComponent(method) + '&params=' + encodeURIComponent(params));
}

export default ServerCall