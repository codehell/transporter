namespace Transporter {
    //Todo: Implementar initByToken.

    // Espera a cargar la pagina
    window.onload = function () {

        // Oculta el registro del personaje
        let inp = document.getElementById('register');
        inp.style.display = "none";

        //Muestra el registro si no existen las cookies
        if (document.cookie.length == 0) {
            inp.style.display = "block";
        } else {

            // Inicializa los datos del personaje a traves del contenido de las cookies
            // e inicia el juego
            getGameData(parseInt(getIdFromCookies()));
        }
    };

    function createCharacter() {
        let name: HTMLInputElement = <HTMLInputElement>document.getElementById('input');
        if (validateName(name.value)) {
            register(name.value);
        } else {
            // Todo: Mostrar errores de validación.
        }
    }

    function initByToken() {
        // Todo: Buscar personaje por su nombre y el token validar si existe, generar cookies e iniciar el juego.
    }

    export function initGame(data) {

        //ToDo: Implementar una clase GameData que permita añadir una region nueva y quizas una clase Region
        // y dentro de la clase GameData un array de regiones, que pueda ir creciendo con cada peticion.
        let gameData = <GameData>{'regions': []};
        console.log(gameData);
        gameData.character = data.character;
        gameData.regions.push(data.region);

        let loc = new Location(gameData);
        const HISTORY_PANEL = document.getElementById('history');
        let iAmIn: Place;
        let locationElement = document.createElement('div');
        let historyParagraph;

        iAmIn = gameData.regions[loc.getIAmIn()[2]].bodies[loc.getIAmIn()[1]].places[loc.getIAmIn()[0]];

        locationElement.appendChild(
            document.createTextNode(
                'You are in ' +
                iAmIn.properties.name +
                ' (' + gameData.regions[loc.getIAmIn()[2]].bodies[loc.getIAmIn()[1]].properties.name + ')'
            )
        );
        HISTORY_PANEL.appendChild(locationElement);
        for (let p of iAmIn.properties.description) {
            historyParagraph = document.createElement('p');
            historyParagraph.appendChild(document.createTextNode(p));
            HISTORY_PANEL.appendChild(historyParagraph);
        }
    }
}
