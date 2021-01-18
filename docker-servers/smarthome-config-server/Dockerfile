FROM python:3

RUN mkdir /app
ADD ./app.py /app
ADD ./requirements.txt /app
ADD ./start.sh /app
ADD ./rooms.db /app
WORKDIR /app

RUN pip install -r requirements.txt

ENTRYPOINT ["./start.sh"]
