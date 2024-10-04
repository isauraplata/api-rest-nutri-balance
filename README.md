# Nutribalance API

Pasos a seguir para ejecutar el proyecto

1. Debemos de instalar las dependencias correspondientes con el siguiente comando

    `npm install` 

2. Posteriormente debemos de crear nuestras variables de entorno con el comando `touch .env`, las cuales deben de llevar el siguiente formato

    ```ini
    
    DB_HOST=
    DB_USER=
    DB_DATABASE=
    DB_PASSWORD=
    SALT=
    PORT_SERVER=
    ACCESS_TOKEN_PRIVATE_KEY=
    CLIENT_ID_PAYPAL=
    SECRET_KEY_PAYPAL=
    APPLICATION_NAME=
    PAYMENT_CALLBACK_URLS=
    MONGODB_URI=
    REFRESH_TOKEN_PRIVATE_KEY=

    #This part is fot Whatsapp implementation

    TWILIO_SID=
    TWILIO_AUTH_TOKEN=
    TWILIO_WHATSAPP_NUMBER=
    ```

3. Crear la base de datos la cual previamente se ha colocado en el `.env` y poner en connection.ts colocar el synchronize en true.
    `synchronize: true,`
   
5. Por consiguiente una vez de haber hecho los pasos anteriores, ejecutaremos la aplicación con el comando `npm run dev` y nos creara las tablas en la base de datos que hemos creado.
6. Posteriormente regresamos synchronize a su valor original y volvemos a realizar la ejecución con el comando `npm run dev` .
    
