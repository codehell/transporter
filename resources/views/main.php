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
        <div id="username" class="panel">
            <input id="input" type="text">
            <button onclick="createCharacter()" type="button">Envia</button>
        </div>
        <div class="panel">
            <button onclick="deleteCookies()" type="button">Borrar Cookies</button>
            <form action="register.php" method="post">
                <input id="prueba" name="prueba" type="hidden" value="myPrueba">
                <button type="submit">Enviar</button>
            </form>
        </div>

    </div>

    <script src="./scripts/main.js"></script>
</body>
</html>