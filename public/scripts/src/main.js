var Transporter;
(function (Transporter) {
    //Todo: Implementar initByToken.

    var HISTORY_PANEL = document.getElementById('history');
    // Espera a cargar la pagina
    window.onload = function () {
        // Oculta el registro del personaje
        var inp = document.getElementById('register');
        inp.style.display = "none";
        //Muestra el registro si no existen las cookies
        if (document.cookie.length == 0) {
            inp.style.display = "block";
        }
        else {
            // Inicializa los datos del personaje a traves del contenido de las cookies
            // e inicia el juego
            getGameData(parseInt(getIdFromCookies()));
        }
    };
    function createCharacter() {
        var name = document.getElementById('input');
        if (validateName(name.value)) {
            register(name.value);
        }
        else {
        }
    }
    function initByToken() {
        // Todo: Buscar personaje por su nombre y el token validar si existe, generar cookies e iniciar el juego.
    }
    // Obtiene los datos del juego.
    function getGameData(id) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', './storyteller.php?id=' + id);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (xhr.status === 200) {
                createCookies(JSON.parse(xhr.responseText));
            }
        };
        xhr.send();
    }
    function register(name) {
        var form = new FormData();
        form.append('name', String(name));
        var xhr = new XMLHttpRequest();
        xhr.open('POST', './register.php');
        xhr.send(form);
        xhr.onload = function () {
            createCookies(JSON.parse(xhr.responseText));
        };
    }
    // Crea las cookies inicializa los datos del juego y lo inicia.
    function createCookies(data) {
        var i = 0, aux;
        var date = new Date;
        //Todo: cambiar a fecha de la cookie dinamica, que expire 3 meses despues de la ultima generación.
        date.setFullYear(2100);
        document.cookie = "id=" + data.character.id + "; expires=" + date + "; path=/";
        document.cookie = "name=" + data.character.name + "; expires=" + date + "; path=/";
        document.cookie = "token=" + data.character.name + "; expires=" + date + "; path=/";
        if (validateGameData(data)) {
            gameData = data;
            initGame();
        }
        else {
        }
    }
    function initGame() {
        var location = gameData.character.location.slice(6);
        var iAmIn;
        var locationElement = document.createElement('div');
        var historyParagraph;
        var region = gameData.region;
        var historyText = '';
        for (var p in region.places) {
            if (region.places[p].location == location) {
                iAmIn = region.places[p];
            }
        }
        locationElement.appendChild(document.createTextNode('You are in ' + iAmIn.name + '(' + region.properties.name + ')'));
        HISTORY_PANEL.appendChild(locationElement);
        for (var _i = 0, _a = iAmIn.description; _i < _a.length; _i++) {
            var p = _a[_i];
            historyParagraph = document.createElement('p');
            historyParagraph.appendChild(document.createTextNode(p));
            HISTORY_PANEL.appendChild(historyParagraph);
        }
        console.log(iAmIn);
    }
    function validateGameData(data) {
        //Todo: Validar los datos del juego.
        return true;
    }
    function validateName(name) {
        //Todo: Validar el nombre del personaje.
        return true;
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
        document.cookie = "token=; expires=" + date + "; path=/";
    }
})(Transporter || (Transporter = {}));
//# sourceMappingURL=main.js.map