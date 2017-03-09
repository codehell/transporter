namespace Transporter {
    // Crea las cookies
    export function createCookies(data) {
        let i: number = 0, aux: string[];
        let date = new Date;
        //Todo: cambiar a fecha de la cookie dinamica, que expire 3 meses despues de la ultima generación.
        date.setFullYear(2100);
        document.cookie = "id=" + data.character.id + "; expires=" + date + "; path=/";
        document.cookie = "name=" + data.character.name + "; expires=" + date + "; path=/";
        document.cookie = "token=" + data.character.token + "; expires=" + date + "; path=/";
    }

    //Obtiene el id del personaje desde las cookies
    export function getIdFromCookies() {
        let cookiesString = document.cookie;
        let cookie: string[] = cookiesString.split(';');
        let pos: number = cookie[0].indexOf('=');
        return cookie[0].slice(pos + 1);
    }

    // Borra las cookies
    export let deleteCookies = function () {
        let date: Date = new Date();
        date.setFullYear(2000);
        document.cookie = "id=; expires=" + date + "; path=/";
        document.cookie = "name=; expires=" + date + "; path=/";
        document.cookie = "token=; expires=" + date + "; path=/";
        //Todo: ustilizar esta funcion para borrar un personaje incluso de la BD
    }

}