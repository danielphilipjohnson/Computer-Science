import socket
import psutil
import requests


def check_cpu_usage():
    usage = psutil.cpu_percent(1)
    print(usage)

def check_localhost():
    localhost = socket.gethostbyname('localhost')
    return localhost



def check_connectivity():
    request = requests.get("http://www.google.com")
    return request.status_code

def health_check():

    if check_localhost() and check_connectivity():
        print("Everything ok")
    else:
        print("Network checks failed")
check_cpu_usage()
#health_check()