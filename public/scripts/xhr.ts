let xhr = new XMLHttpRequest();
xhr.open('GET', './storyteller.php');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function () {
    if (xhr.status === 200) {
        let userInfo = JSON.parse(xhr.responseText);
        console.log(userInfo);
    }
};
xhr.send(JSON.stringify({
    name: 'Daniel'
}));
