<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Transporter</title>
    <link rel="stylesheet" href="./styles/style.css">

</head>
<body>
    <div id="content" class="content">
        <div id="register" class="panel blur">
            <p>No se han encontrado los datos de tu personaje.</p>
            <p>Introduce el nombre de un nuevo personaje o el token de identificación</p>
            <input id="input" type="text">
            <button id="create-character" type="button">Envia</button>
        </div>
        <div id="stage" class="panel"></div>
        <div class="panel">
            <button id="delete-cookies" type="button">Borrar Cookies</button>
        </div>
    </div>

    <script src="./scripts/trans.js"></script>
</body>
</html>