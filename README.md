# personal-website
A site which displays my CV.

## Frontend
SPA built with React.

## Backend
API built with Django & Django REST Framework.

Deployed to Heroku through Git. Not able to set up connection with github because of https://status.heroku.com/incidents/2413.

## Backend Testing
Not able to setup CI pipeline to run tests as a result of https://status.heroku.com/incidents/2413.

Workaround to run tests on heroko db. Go to settings.py -> database settings, add this (use name of actual heroku db):

'TEST': {
  'NAME': 'test_db',
},

Now if I go to the command line, I use this command to run the test scripts on the test db:
python manage.py test --keepdb


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
