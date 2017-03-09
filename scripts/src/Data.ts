namespace Transporter {

    export class Data {

        public static xhrGet(parameter: string, value: number | string) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', `./storyteller.php?${parameter}=${value}`);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send();
            return xhr;
        }

        public static xhrPost(params: {index: string; value: string|number}[], url: string) {
            let form: FormData = new FormData();
            for (let par of params) {
                form.append(par.index, String(par.value));
                console.log(par);
            }
            let xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.send(form);
            return xhr;
        }
    }
}
