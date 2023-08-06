# DED_AI_Model_Server

For deployment of Flask server, [Gunicorn](https://gunicorn.org/) has been used. If you are working on a Windows environment, please use [Waitress](https://pypi.org/project/waitress/)

## Project setup
```
pip install -r requirements.txt
```

## Run server
```
gunicorn app:app
```