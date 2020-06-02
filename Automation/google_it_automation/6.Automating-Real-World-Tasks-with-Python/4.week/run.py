#! /usr/bin/env python3
import os
import requests
import json
dir_path = "supplier-data/descriptions/"



dirs = os.listdir( dir_path )

abs_path =  os.path.abspath(dir_path)

for file in dirs:
    #print(file)
    file_path = os.path.splitext(file)
    if file_path[1] == ".txt":
            #print("Found text file")
            #print("\t" + file)
            abs_file_path = abs_path+"/"+file
            #print(abs_file_path)
            image_path = os.path.splitext(file)[0] + ".jpeg"
            with open(abs_file_path, "r") as f:
                p = {}


                txt = f.read()
                txt_arr = txt.split( "\n" )
                #print(image_name)
                p["name"] = txt_arr[0]
                p["weight"] = int(txt_arr[1].strip("lbs"))
                p["description"] = txt_arr[2]
                p["image_name"] = image_path

                #print(p)
                app_json = json.dumps(p)
                #print("image_path {}".format(image_path))
                print(app_json)
                response = requests.post("http://35.232.87.255/fruits/", data=json.dumps(p))
                #response = requests.get("http://104.155.166.219/fruits")
                #print(response.status_code)
                #response.raise_for_status()
                if response.ok:
                    print("Review Posted")
                else:
                    print("Review failed to post")
                    #print(response.request.url)
                    #print(response.request.body)
