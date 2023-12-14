# URL Shortener

A webservice to generate and host shortened urls.

## Environment variables

This project uses [dotenv](https://www.npmjs.com/package/dotenv) to load environment variables and can be configured in the `.env` file.

| Name                | Description                         | Default                                        |
| ------------------- | ----------------------------------- | ---------------------------------------------- |
| `PORT`              | Port the website will listen on.    | `80` when using HTTP or `443` when using HTTPS |
| `CERT_PATH`         | File path to SSL certificate.       | `cert.pem`                                     |
| `KEY_PATH`          | File path to SSL private key.       | `key.pem`                                      |
| `SECRET`            | Used as a global salt when hashing. | `secret`                                            |
| `ENCRYPTION_IV`     | The [initialization vector](https://wikipedia.org/wiki/Initialization_vector) used for encryption. | ` ` |
| `IDENTIFIER_LENGTH` | Length of the random identifier for shortened URLs. | `6`                            |
