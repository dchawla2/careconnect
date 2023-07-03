FROM ubuntu:latest

WORKDIR /back-end

RUN apt-get update -y
RUN apt-get install -y python3
RUN apt-get install -y python3-pip python3-dev build-essential vim



COPY . .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

CMD bash