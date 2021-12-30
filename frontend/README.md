# personal-website
A site which displays my CV.

## Frontend
SPA built with React.

## Backend
API built with Django & Django REST Framework.

#### Credit: https://github.com/scalablescripts/django-auth helped with setting up JWT authentication.

### Useful Django Commands: 

#### Activate Environment Mac
. env/bin/activate

#### Create SSL Certificate for local
mkcert -cert-file cert.pem -key-file key.pem localhost 127.0.0.1

#### Runs Server with SSL Certificate
python manage.py runserver_plus --cert-file cert.pem --key-file key.pem

#### List Dependancies
pip list

### Useful Node commands

#### Turn on HTTPS and run app in dev mode
export HTTPS=true&&npm start