#!/usr/bin/env python3
import shutil
import psutil
import socket
import emails
import os

#Complete the script to check the system statistics every 60 seconds, and in event of any issues detected among #the ones mentioned above

def check_cpu():
    """ CPU usage is over 80% """
    usage = psutil.cpu_percent(1)
    print(usage)
    if usage > 80.0:
        print("Error - CPU usage is over 80%")

        # send email
        sender = "automation@example.com"
        # use from connection tab
        receiver = "{}@example.com".format("student-04-fb865a9f8852")
        subject = "Error - CPU usage is over 80%"
        body = "Please check your system and resolve the issue as soon as possible."

        message = emails.generate_email(sender, receiver, subject, body, None)
        print(message)
        emails.send_email(message)

    else:
        print("Usage is normal and running at {}".format(psutil.cpu_percent(1)))


def check_disk_space(path):
    """ Report an error if available disk space is lower than 20% """
    
    disk_percent = psutil.disk_usage(path).percent
    print(disk_percent)
    
    if disk_percent > float(80):
        print("Runnin out of space")
        # send email
        sender = "automation@example.com"
        # use from connection tab
        receiver = "{}@example.com".format(os.environ.get('USER'))
        subject = "Error - Available disk space is less than 20%"
        body = "Please check your system and resolve the issue as soon as possible."

        message = emails.generate(sender, receiver, subject, body)
        print(message)
        #email.send(message)
    else:
        print("Usage is normal and running at {}".format(usage))


def check_memory():
    """ Report an error if available memory is less than 500MB """
    mem = psutil.virtual_memory()
    THRESHOLD = 500 * 1024 * 1024  # 100MB
    if mem.available <= THRESHOLD:
        print("warning")
        # send email
        sender = "automation@example.com"
        # use from connection tab
        receiver = "{}@example.com".format(os.environ.get('USER'))
        subject = "Error - Available memory is less than 500MB"
        body = "Please check your system and resolve the issue as soon as possible."

        message = emails.generate(sender, receiver, subject, body)
        print(message)
        #email.send(message)

    else:
        print(mem.available)
        print("Usage is normal and running at {}".format(mem.available))
        
        
def check_localhost():
    localhost = socket.gethostbyname('localhost')
    if localhost != "127.0.0.1":
        print("Error - localhost cannot be resolved to 127.0.0.1")
        # send email
        sender = "automation@example.com"
        # use from connection tab
        receiver = "{}@example.com".format(os.environ.get('USER'))
        subject = "Error - localhost cannot be resolved to 127.0.0.1"
        body = "Please check your system and resolve the issue as soon as possible."

        message = emails.generate(sender, receiver, subject, body)
        print(message)
        #email.send(message)
    else:
        print("localhost resolved")


if __name__ == "__main__":
    check_cpu()
    #check_disk_space("/")
    #check_memory()
    #check_localhost()

