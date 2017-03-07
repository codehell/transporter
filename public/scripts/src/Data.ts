namespace Transporter {
    export class Data {
        public static xhrGet(id: number, func) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', './storyteller.php?id=' + id);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = func;
            xhr.send();
        }
    }
}
