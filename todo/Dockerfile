FROM python:3.9-slim-buster

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY ./src /app
WORKDIR /app
RUN pip install --upgrade pip
RUN pip install -r  requirements.txt
WORKDIR /app/service
RUN python manage.py makemigrations && python manage.py migrate
EXPOSE 8000
ENTRYPOINT [ "python", "manage.py", "runserver",  "0.0.0.0:8000" ]
