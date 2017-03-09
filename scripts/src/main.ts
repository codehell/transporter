namespace Transporter {

    export declare let globalGameData: GameData; /*************VARIABLE GLOBAL**********************/

    //Todo: Implementar initByToken.
    // Espera a cargar la pagina
    window.onload = function () {

        // Asocia los eventos de la pagina del registro
        let deleteCookiesButton = document.getElementById('delete-cookies');
        deleteCookiesButton.addEventListener('click', deleteCookies, false);
        let createCharacterButton = document.getElementById('create-character');
        createCharacterButton.addEventListener('click', createCharacter, false);
        console.log(document.cookie);

        // Oculta el registro del personaje
        let inp = document.getElementById('register');
        inp.style.display = "none";

        //Muestra el registro si no existen las cookies
        if (document.cookie.length == 0) {
            inp.style.display = "block";
        } else {
            // Inicializa los datos del personaje a traves del contenido de las cookies
            // e inicia el juego
            let xhr =  Data.xhrGet('id', getIdFromCookies());
            initGameAndCookies(xhr);
        }
    };

    // Registra un nuevo personaje
    export let createCharacter = function () {
        let name: HTMLInputElement = <HTMLInputElement>document.getElementById('input');

        if (validateName(name.value)) {

            // Oculta el registro del personaje
            let inp = document.getElementById('register');
            inp.style.display = "none";
            let par = [{'index': 'name', 'value': name.value}];
            let post = Data.xhrPost(par, './register.php');
            initGameAndCookies(post);

        } else {
            // Todo: Mostrar errores de validación.
        }
    };

    // Obtiene los datos del juego por el nombre y el token, y lo inicia
    function initByToken() {
        // Todo: Buscar personaje por su nombre y el token validar si existe, generar cookies e iniciar el juego.
    }

    export function initGameAndCookies(xhr){
        xhr.onload = function () {
            globalGameData = new Game(JSON.parse(xhr.responseText), Print);
            createCookies(JSON.parse(xhr.responseText));
            if (validateGameData(globalGameData)) {
                globalGameData.init();
            } else {
                //Todo: mostrar error de validacion
            }
        };
    }
}
