var Transporter;
(function (Transporter) {
    var Game = (function () {
        function Game(data) {
            this.character = data.character;
            this.regions = [];
            this.regions.push(data.region);
        }
        Game.prototype.setRegion = function (region) {
            this.regions.push(region);
        };
        return Game;
    }());
    Transporter.Game = Game;
})(Transporter || (Transporter = {}));
var Transporter;
(function (Transporter) {
    var Location = (function () {
        function Location(game) {
            this.characterLocation = game.character.location.split(',').map(function (value) { return parseInt(value, 10); });
            this.characterRegionLocation = this.characterLocation.slice(4);
            this.characterBodyLocation = this.characterLocation.slice(2, 4);
            this.characterPlaceLocation = this.characterLocation.slice(0, 2);
            this.setIAmIn(game);
        }
        Location.prototype.setIAmIn = function (gameData) {
            var i = 0;
            var match = false;
            var location;
            //Busca la región actual del personaje y establece su posicion dentro del array
            while (i < gameData.regions.length && !match) {
                location = gameData.regions[i].properties.location;
                if (this.characterRegionLocation.length === location.length &&
                    this.characterRegionLocation.every(function (v, i) { return v === location[i]; })) {
                    this.region = i;
                    match = true;
                }
                i++;
            }
            i = 0;
            match = false;
            //Busca el cuerpo actual del personaje y establece su posicion dentro del array
            while (i < gameData.regions[this.region].bodies.length && !match) {
                location = gameData.regions[this.region].bodies[i].properties.location;
                if (this.characterBodyLocation[0] === location[0] &&
                    this.characterBodyLocation[1] === location[1]) {
                    this.body = i;
                    match = true;
                }
                i++;
            }
            i = 0;
            match = false;
            //Busca el lugar (place) actual del personaje y establece su posicion dentro del array
            while (i < gameData.regions[this.region].bodies[this.body].places.length && !match) {
                location = gameData.regions[this.region].bodies[this.body].places[i].properties.location;
                if (this.characterPlaceLocation[0] == location[0] &&
                    this.characterPlaceLocation[1] == location[1]) {
                    this.place = i;
                    match = true;
                }
                i++;
            }
            this.iAmIn = [this.place, this.body, this.region];
        };
        Location.prototype.getIAmIn = function () {
            return this.iAmIn;
        };
        return Location;
    }());
    Transporter.Location = Location;
})(Transporter || (Transporter = {}));
var Transporter;
(function (Transporter) {
    // Crea las cookies inicializa los datos del juego y lo inicia.
    function createCookies(data) {
        var i = 0, aux;
        var date = new Date;
        //Todo: cambiar a fecha de la cookie dinamica, que expire 3 meses despues de la ultima generación.
        date.setFullYear(2100);
        document.cookie = "id=" + data.character.id + "; expires=" + date + "; path=/";
        document.cookie = "name=" + data.character.name + "; expires=" + date + "; path=/";
        document.cookie = "token=" + data.character.token + "; expires=" + date + "; path=/";
        if (Transporter.validateGameData(data)) {
            Transporter.initGame(data);
        }
        else {
        }
    }
    Transporter.createCookies = createCookies;
    //Obtiene el id del personaje desde las cookies
    function getIdFromCookies() {
        var cookiesString = document.cookie;
        var cookie = cookiesString.split(';');
        var pos = cookie[0].indexOf('=');
        return cookie[0].slice(pos + 1);
    }
    Transporter.getIdFromCookies = getIdFromCookies;
    // Borra las cookies
    function deleteCookies() {
        var date = new Date();
        date.setFullYear(2000);
        document.cookie = "id=; expires=" + date + "; path=/";
        document.cookie = "name=; expires=" + date + "; path=/";
        document.cookie = "token=; expires=" + date + "; path=/";
        //Todo: ustilizar esta funcion para borrar un personaje incluso de la BD
    }
})(Transporter || (Transporter = {}));
var Transporter;
(function (Transporter) {
    // Obtiene los datos del juego.
    function getGameData(id) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', './storyteller.php?id=' + id);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (xhr.status === 200) {
                Transporter.globalGameData = new Transporter.Game(JSON.parse(xhr.responseText));
                Transporter.createCookies(JSON.parse(xhr.responseText));
            }
        };
        xhr.send();
    }
    Transporter.getGameData = getGameData;
    function register(name) {
        var form = new FormData();
        form.append('name', String(name));
        var xhr = new XMLHttpRequest();
        xhr.open('POST', './register.php');
        xhr.send(form);
        xhr.onload = function () {
            Transporter.createCookies(JSON.parse(xhr.responseText));
        };
    }
    Transporter.register = register;
    function validateGameData(data) {
        //Todo: Validar los datos del juego.
        return true;
    }
    Transporter.validateGameData = validateGameData;
    function validateName(name) {
        //Todo: Validar el nombre del personaje.
        return true;
    }
    Transporter.validateName = validateName;
})(Transporter || (Transporter = {}));
var Transporter;
(function (Transporter) {
    //Todo: Implementar initByToken.
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
            Transporter.getGameData(parseInt(Transporter.getIdFromCookies()));
        }
    };
    function createCharacter() {
        var name = document.getElementById('input');
        if (Transporter.validateName(name.value)) {
            Transporter.register(name.value);
        }
        else {
        }
    }
    function initByToken() {
        // Todo: Buscar personaje por su nombre y el token validar si existe, generar cookies e iniciar el juego.
    }
    function initGame(data) {
        var gameData = Transporter.globalGameData;
        var loc = new Transporter.Location(Transporter.globalGameData);
        var HISTORY_PANEL = document.getElementById('history');
        var iAmIn;
        var locationElement = document.createElement('div');
        var historyParagraph;
        iAmIn = gameData.regions[loc.getIAmIn()[2]].bodies[loc.getIAmIn()[1]].places[loc.getIAmIn()[0]];
        locationElement.appendChild(document.createTextNode('You are in ' +
            iAmIn.properties.name +
            ' (' + gameData.regions[loc.getIAmIn()[2]].bodies[loc.getIAmIn()[1]].properties.name + ')'));
        HISTORY_PANEL.appendChild(locationElement);
        for (var _i = 0, _a = iAmIn.properties.description; _i < _a.length; _i++) {
            var p = _a[_i];
            historyParagraph = document.createElement('p');
            historyParagraph.appendChild(document.createTextNode(p));
            HISTORY_PANEL.appendChild(historyParagraph);
        }
    }
    Transporter.initGame = initGame;
})(Transporter || (Transporter = {}));
var Transporter;
(function (Transporter) {
    var Data = (function () {
        function Data() {
        }
        Data.xhrGet = function (id, func) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', './storyteller.php?id=' + id);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = func;
            xhr.send();
        };
        return Data;
    }());
    Transporter.Data = Data;
})(Transporter || (Transporter = {}));
//# sourceMappingURL=trans.js.map