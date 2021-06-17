FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD [ "python", "./submission.py" ]
# pull the base python image

#set working directory

#compile for java
#any single commands are done under RUN
#RUN javac main.java

#run executable
#to implement do CMD
# CMD ["java", "Main"]