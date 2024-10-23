<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Evitar que cualquier salida anterior cause un error con header()
    ob_start(); // Inicia el almacenamiento en buffer de salida

    // Obtener datos del formulario
    $nombre = $_POST['nombre'];
    $telefono = $_POST['telefono'];
    $correo = $_POST['correo'];
    $mensaje = $_POST['mensaje'];

    // Destinatario (tu correo)
    $destinatario = 'onassismartinez6@gmail.com'; // Cambia esto a tu dirección de correo
    $asunto = 'Nuevo mensaje de contacto';
    $cuerpo = "Nombre: $nombre\n";
    $cuerpo .= "Teléfono: $telefono\n";
    $cuerpo .= "Correo: $correo\n";
    $cuerpo .= "Mensaje: $mensaje\n";

    // Cabeceras para el correo
    $headers = "From: $nombre <$correo>" . "\r\n" .
               "Reply-To: $correo" . "\r\n" .
               "X-Mailer: PHP/" . phpversion();

    // Enviar correo a ti
    if (mail($destinatario, $asunto, $cuerpo, $headers)) {
        // Enviar correo de confirmación al usuario
        $asunto_usuario = 'Confirmación de envío de mensaje';
        $cuerpo_usuario = "Hola $nombre,\n\nTu mensaje ha sido enviado correctamente.\n\nDetalles:\n\nNombre: $nombre\nTeléfono: $telefono\nCorreo: $correo\nMensaje: $mensaje\n\nGracias por contactarnos.";
        
        $headers_usuario = "From: $destinatario" . "\r\n" .
                          "Reply-To: $destinatario" . "\r\n" .
                          "X-Mailer: PHP/" . phpversion();
        
        mail($correo, $asunto_usuario, $cuerpo_usuario, $headers_usuario);

        // Redirigir a la página de agradecimiento
        header("Location: ppp.html");
        exit(); // Importante para detener la ejecución del script después de la redirección
    } else {
        echo "Error al enviar el mensaje.";
    }

    ob_end_flush(); // Envía el buffer de salida al navegador
}
?>
