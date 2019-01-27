var Transporter;
(function (Transporter) {
    var Data = (function () {
        function Data() {
        }
        Data.xhrGet = function (parameter, value) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', "./storyteller.php?" + parameter + "=" + value);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send();
            return xhr;
        };
        Data.xhrPost = function (params, url) {
            var form = new FormData();
            for (var _i = 0, params_1 = params; _i < params_1.length; _i++) {
                var par = params_1[_i];
                form.append(par.index, String(par.value));
                console.log(par);
            }
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.send(form);
            return xhr;
        };
        return Data;
    }());
    Transporter.Data = Data;
})(Transporter || (Transporter = {}));
var Transporter;
(function (Transporter) {
    var Game = (function () {
        function Game(data, printer) {
            this.character = data.character;
            this.regions = [];
            this.ships = data.ships;
            this.setRegion(data.region);
            this.printer = printer;
        }
        Game.prototype.setRegion = function (region) {
            this.regions.push(region);
        };
        Game.prototype.init = function () {
            // Obtengo la posicion del personaje
            var loc = new Transporter.Location(this);
            var iAmIn;
            var whereAmI = loc.getIAmIn;
            // Obtiene los datos del lugar donde se encuentra el personaje.
            // Todo: Meter este valor en la clase Location ?
            iAmIn = this.regions[loc.getIAmIn[2]].bodies[loc.getIAmIn[1]].places[loc.getIAmIn[0]];
            this.printer.printStage(iAmIn, whereAmI, this);
            loc = null;
        };
        return Game;
    }());
    Transporter.Game = Game;
})(Transporter || (Transporter = {}));
var Transporter;
(function (Transporter) {
    // Gestiona la localización del personaje.
    var Location = (function () {
        function Location(game) {
            this.gameData = game;
            this.characterLocation = game.character.location.split(',').map(function (value) { return parseInt(value, 10); });
            this.characterRegionLocation = this.characterLocation.slice(4);
            this.characterBodyLocation = this.characterLocation.slice(2, 4);
            this.characterPlaceLocation = this.characterLocation.slice(0, 2);
            this.setIAmIn();
        }
        // Establece la propiedad iAmIn, fuera del constructor por organización.
        Location.prototype.setIAmIn = function () {
            var i = 0;
            var match = false;
            var location;
            //Busca la región actual del personaje y establece su posicion dentro del array
            while (i < this.gameData.regions.length && !match) {
                location = this.gameData.regions[i].properties.location;
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
            while (i < this.gameData.regions[this.region].bodies.length && !match) {
                location = this.gameData.regions[this.region].bodies[i].properties.location;
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
            while (i < this.gameData.regions[this.region].bodies[this.body].places.length && !match) {
                location = this.gameData.regions[this.region].bodies[this.body].places[i].properties.location;
                if (this.characterPlaceLocation[0] == location[0] &&
                    this.characterPlaceLocation[1] == location[1]) {
                    this.place = i;
                    match = true;
                }
                i++;
            }
            this.iAmIn = [this.place, this.body, this.region];
        };
        Object.defineProperty(Location.prototype, "getIAmIn", {
            // Obtiene los datos de la posición del personaje.
            get: function () {
                return this.iAmIn;
            },
            enumerable: true,
            configurable: true
        });
        // Obtener los lugares donde puedo ir
        Location.whereCanIGo = function () {
            var coordinates = [10, 100];
            var maxRange = [100, 0, 0];
            return maxRange[0] > Math.sqrt(coordinates[0] * coordinates[0] + coordinates[1] * coordinates[1]);
        };
        return Location;
    }());
    Transporter.Location = Location;
})(Transporter || (Transporter = {}));
var Transporter;
(function (Transporter) {
    var Print = (function () {
        function Print() {
        }
        Print.printStage = function (iAmIn, whereAmI, gameData) {
            var historyPanel = document.getElementById('stage'), charInfo = document.createElement('div'), name = document.createElement('p'), location = document.createElement('p'), purse = document.createElement('p'), historyParagraph;
            charInfo.className = "char_info";
            name.textContent = gameData.character.name;
            location.textContent = iAmIn.properties.name +
                ' (' + gameData.regions[whereAmI[2]].bodies[whereAmI[1]].properties.name + ')';
            purse.textContent = gameData.character.purse;
            charInfo.appendChild(name);
            charInfo.appendChild(location);
            charInfo.appendChild(purse);
            historyPanel.appendChild(charInfo);
            for (var _i = 0, _a = iAmIn.properties.description; _i < _a.length; _i++) {
                var p = _a[_i];
                historyParagraph = document.createElement('p');
                historyParagraph.textContent = p;
                historyPanel.appendChild(historyParagraph);
            }
            gameData.regions.forEach(function (value) {
                console.log(value);
            });
            //console.log(Location.whereCanIGo());
            console.log(gameData);
        };
        return Print;
    }());
    Transporter.Print = Print;
})(Transporter || (Transporter = {}));
var Transporter;
(function (Transporter) {
    // Crea las cookies
    function createCookies(data) {
        var i = 0, aux;
        var date = new Date;
        //Todo: cambiar a fecha de la cookie dinamica, que expire 3 meses despues de la ultima generación.
        date.setFullYear(2100);
        document.cookie = "id=" + data.character.id + "; expires=" + date + "; path=/";
        document.cookie = "name=" + data.character.name + "; expires=" + date + "; path=/";
        document.cookie = "token=" + data.character.token + "; expires=" + date + "; path=/";
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
    Transporter.deleteCookies = function () {
        var date = new Date();
        date.setFullYear(2000);
        document.cookie = "id=; expires=" + date + "; path=/";
        document.cookie = "name=; expires=" + date + "; path=/";
        document.cookie = "token=; expires=" + date + "; path=/";
        //Todo: ustilizar esta funcion para borrar un personaje incluso de la BD
    };
})(Transporter || (Transporter = {}));
var Transporter;
(function (Transporter) {
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
    var ShipType;
    (function (ShipType) {
        ShipType[ShipType["local"] = 0] = "local";
        ShipType[ShipType["body"] = 1] = "body";
        ShipType[ShipType["region"] = 2] = "region";
    })(ShipType || (ShipType = {}));
})(Transporter || (Transporter = {}));
var Transporter;
(function (Transporter) {
    //Todo: Implementar initByToken.
    // Espera a cargar la pagina
    window.onload = function () {
        // Asocia los eventos de la pagina del registro
        var deleteCookiesButton = document.getElementById('delete-cookies');
        deleteCookiesButton.addEventListener('click', Transporter.deleteCookies, false);
        var createCharacterButton = document.getElementById('create-character');
        createCharacterButton.addEventListener('click', Transporter.createCharacter, false);
        console.log(document.cookie);
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
            var xhr = Transporter.Data.xhrGet('id', Transporter.getIdFromCookies());
            initGameAndCookies(xhr);
        }
    };
    // Registra un nuevo personaje
    Transporter.createCharacter = function () {
        var name = document.getElementById('input');
        if (Transporter.validateName(name.value)) {
            // Oculta el registro del personaje
            var inp = document.getElementById('register');
            inp.style.display = "none";
            var par = [{ 'index': 'name', 'value': name.value }];
            var post = Transporter.Data.xhrPost(par, './register.php');
            initGameAndCookies(post);
        }
        else {
            // Todo: Mostrar errores de validación.
        }
    };
    // Obtiene los datos del juego por el nombre y el token, y lo inicia
    function initByToken() {
        // Todo: Buscar personaje por su nombre y el token validar si existe, generar cookies e iniciar el juego.
    }
    function initGameAndCookies(xhr) {
        xhr.onload = function () {
            Transporter.globalGameData = new Transporter.Game(JSON.parse(xhr.responseText), Transporter.Print);
            Transporter.createCookies(JSON.parse(xhr.responseText));
            if (Transporter.validateGameData(Transporter.globalGameData)) {
                Transporter.globalGameData.init();
            }
            else {
                //Todo: mostrar error de validacion
            }
        };
    }
    Transporter.initGameAndCookies = initGameAndCookies;
})(Transporter || (Transporter = {}));
//# sourceMappingURL=trans.js.map