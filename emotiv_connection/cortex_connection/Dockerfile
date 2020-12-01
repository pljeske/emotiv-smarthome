FROM python:3.6.12-alpine3.12

WORKDIR ./app

COPY . .
RUN pip install -r requirements.txt

#RUN addgroup -S cortex && adduser -S cortex -G cortex
#USER cortex

ENTRYPOINT ["./run.sh"]
