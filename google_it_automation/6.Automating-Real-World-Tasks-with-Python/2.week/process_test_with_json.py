#! /usr/bin/env python3
# Navigate to /data/feedback directory, where you'll find a few .txt files
import os
import requests
import json

def upload_reviews(dir_path):
    dirs = os.listdir(dir_path)

    abs_path = os.path.abspath(dir_path)

    for file in dirs:
        print("\n")
        print("Filepath")
        print("--------")
        print(abs_path+"/"+file)
        print("-----------------------------")
        print("\n")

        file_path = os.path.splitext(file)
        # print(file_path)

        if file_path[1] == ".txt":
            print("Found text file")
            print("\t" + file)
            print("---------------")

            abs_file_path = abs_path+"/"+file

            with open(abs_file_path, "r") as f:
                p = {}

                txt = f.read()

                txt_arr = txt.split("\n")

                p["title"] = txt_arr[0]
                p["name"] = txt_arr[1]
                p["date"] = txt_arr[2]
                p["feedback"] = txt_arr[3]

                print(p)
                print("\n")

                try:
                    jsonD = json.dumps(p)
                    print(jsonD)
                    response = requests.post("http://34.72.164.23/feedback", json=jsonD)
                    print(response.status_code)


                    if response.ok:
                        print("Review Posted")
                    else:
                        print("Review failed to post")
                        print(response.request.url)
                        print(response.request.body)
                except Exception as e:
                    print("failed")
                    print(e)
                    
upload_reviews("/data/feedback")