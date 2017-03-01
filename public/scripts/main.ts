
interface GamerData {
    id: number;
    name: string;
    purse: number;
    location: string;
}

window.onload = function() {
    //getData(20);
    let inp = document.getElementById('username');
    inp.style.display = "none";

    if (document.cookie.length == 0) {
        inp.style.display = "block";
    } else {
        console.log(document.cookie);
    }
};

function createCharacter() {
    let date: Date = new Date();
    let name: HTMLInputElement = <HTMLInputElement>document.getElementById('input');

    register(name.value);
    //*********************************//
}

// Obtiene los datos del personaje.
function getData(id: number) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', './storyteller.php?id=' + id);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status === 200) {
            createCookiesObject(JSON.parse(xhr.responseText));
        }
    };
    xhr.send();
}

function register(name) {
    let form = new FormData();
    form.append('username', String(name));
    let xhr = new XMLHttpRequest();
    xhr.open('POST', './register.php');
    xhr.send(form);
    xhr.onload = function () {
        getData(parseInt(xhr.responseText));
    }
}

function createCookiesObject(data: GamerData) {

    // Guarda las cookies en un objeto
    // Muestra los datos y llama a la funcion de inicio del juego
    // aun sin implementar.
    let i: number = 0, aux: string[];
    let documentCookies: string;
    let date = new Date;
    date.setFullYear(2100);

    document.cookie = "id=" + data.id + "; expires=" + date + "; path=/";
    document.cookie = "name=" + data.name + "; expires=" + date + "; path=/";
    document.cookie = "purse=" + data.purse + "; expires=" + date + "; path=/";
    document.cookie = "location=" + data.location + "; expires=" + date + "; path=/";
}

// Borra las cookies
function deleteCookies() {
    let date: Date = new Date();
    date.setFullYear(2000);
    document.cookie = "id=; expires=" + date + "; path=/";
    document.cookie = "name=; expires=" + date + "; path=/";
    document.cookie = "purse=; expires=" + date + "; path=/";
    document.cookie = "location=; expires=" + date + "; path=/";
}
