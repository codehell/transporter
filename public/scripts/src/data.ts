namespace Transporter {

    // Obtiene los datos del juego.
    export function getGameData(id: number) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', './storyteller.php?id=' + id);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (xhr.status === 200) {
                createCookies(JSON.parse(xhr.responseText));
            }
        };
        xhr.send();
    }

    export function register(name: string) {
        let form: FormData = new FormData();
        form.append('name', String(name));
        let xhr = new XMLHttpRequest();
        xhr.open('POST', './register.php');
        xhr.send(form);
        xhr.onload = function () {
            createCookies(JSON.parse(xhr.responseText));
        }
    }

    export function validateGameData(data: GameData) {
        //Todo: Validar los datos del juego.
        return true;
    }

    export function validateName(name: string) {
        //Todo: Validar el nombre del personaje.
        return true;
    }
}