var characterData; //Variable Global
// Espera a cargar la pagina
window.onload = function () {
    // Oculta el registro del personaje
    var inp = document.getElementById('username');
    inp.style.display = "none";
    //Muestra el registro si no existen las cookies
    if (document.cookie.length == 0) {
        inp.style.display = "block";
    }
    else {
        // Inicializa los datos del personaje a traves del contenido de las cookies
        // e inicia el juego a traves de getData
        getData(parseInt(getIdFromCookies()));
    }
};
function createCharacter() {
    var date = new Date();
    var name = document.getElementById('input');
    register(name.value);
    //*********************************//
}
// Obtiene los datos del personaje de la BD.
function getData(id) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './storyteller.php?id=' + id);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status === 200) {
            if (document.cookie.length == 0) {
                createCookies(JSON.parse(xhr.responseText));
            }
            else {
                characterData = JSON.parse(xhr.responseText);
                if (validateCharacterData(characterData)) {
                    initGame();
                }
                else {
                    showWarning();
                }
            }
        }
    };
    xhr.send();
}
function register(name) {
    var form = new FormData();
    form.append('username', String(name));
    var xhr = new XMLHttpRequest();
    xhr.open('POST', './register.php');
    xhr.send(form);
    xhr.onload = function () {
        getData(parseInt(xhr.responseText));
    };
}
// Crea las cookies obtiene los datos de la bd e inicia a traves de getData
function createCookies(data) {
    var i = 0, aux;
    var date = new Date;
    date.setFullYear(2100);
    document.cookie = "id=" + data.id + "; expires=" + date + "; path=/";
    document.cookie = "name=" + data.name + "; expires=" + date + "; path=/";
    if (validateCharacterData(data)) {
        characterData = data;
        getData(data.id);
    }
    else {
        showWarning();
    }
}
function initGame() {
    console.log(characterData);
}
function validateCharacterData(data) {
    return true;
}
function showWarning() {
}
//Obtiene el id del personaje desde las cookies
function getIdFromCookies() {
    var cookiesString = document.cookie;
    var cookie = cookiesString.split(';');
    var pos = cookie[0].indexOf('=');
    return cookie[0].slice(pos + 1);
}
// Borra las cookies
function deleteCookies() {
    var date = new Date();
    date.setFullYear(2000);
    document.cookie = "id=; expires=" + date + "; path=/";
    document.cookie = "name=; expires=" + date + "; path=/";
}
