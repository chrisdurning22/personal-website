## Testing
Not able to setup CI pipeline to run tests as a result of https://status.heroku.com/incidents/2413.

Workaround to run tests on heroko db. Go to settings.py -> database settings, add this (use name of actual heroku db):

'TEST': {
  'NAME': 'test_db',
},

Now if I go to the command line, I use this command to run the test scripts on the test db:
python manage.py test --keepdb