# Automate updating catalog information
## Introduction

You work for an online fruits store, and you need to develop a system that will update the catalog information with data provided by your suppliers. The suppliers send the data as large images with an associated description of the products in two files (.TIF for the image and .txt for the description). The images need to be converted to smaller jpeg images and the text needs to be turned into an HTML file that shows the image and the product description. The contents of the HTML file need to be uploaded to a web service that is already running using Django. You also need to gather the name and weight of all fruits from the .txt files and use a Python request to upload it to your Django server.

You will create a Python script that will process the images and descriptions and then update your company's online website to add the new products.

Once the task is complete, the supplier should be notified with an email that indicates the total weight of fruit (in lbs) that were uploaded. The email should have a PDF attached with the name of the fruit and its total weight (in lbs).

Finally, in parallel to the automation running, we want to check the health of the system and send an email if something goes wrong.
What you’ll do

- Write a script that summarizes and processes sales data into different categories
- Generate a PDF using Python
- Automatically send a PDF by email
- Write a script to check the health status of the system 


## Working with supplier images

In this section, you will write a Python script named changeImage.py to process the supplier images. You will be using the PIL library to update all images within ~/supplier-data/images directory to the following specifications:
- Size: Change image resolution from 3000x2000 to 600x400 pixel
- Format: Change image format from .TIFF to .JPEG

Create and open the file using nano editor.

    nano ~/changeImage.py


After processing the images, save them in the same path ~/supplier-data/images, with a JPEG extension.

Grant executable permissions to the changeImage.py script.

    sudo chmod +x ~/changeImage.py

Now run the changeImage.py script:

    ./changeImage.py




## Uploading images to web server

You have modified the fruit images through changeImage.py script. Now, you will have to upload these modified images to the web server that is handling the fruit catalog. To do that, you'll have to use the Python requests module to send the file contents to the [linux-instance-IP-Address]/upload URL.

Copy the external IP address of your instance from the Connection Details Panel on the left side and enter the IP address in a new web browser tab. This opens a web page displaying the text "Fruit Catalog".


In this script, we are going to upload a sample image named icon.sheet.png.

Grant executable permission to the example_upload.py script.

    sudo chmod +x ~/example_upload.py

Execute the example_upload.py script, which will upload the images.

    ./example_upload.py


Use the nano editor to create a file named supplier_image_upload.py:

    nano ~/supplier_image_upload.py

Complete the script with the same technique as used in the file example_upload.py.


Grant executable permission to the changeImage.py script.

    sudo chmod +x ~/supplier_image_upload.py

Run the changeImage.py script.

    .  /supplier_image_upload.py


## Uploading the descriptions

The Django server is already set up to show the fruit catalog for your company. You can visit the main website by entering linux-instance-IP-Address in the URL bar or by removing /media/images from the existing URL opened earlier.


Write a Python script named run.py to process the text files (001.txt, 003.txt ...) from the supplier-data/descriptions directory. The script should turn the data into a JSON dictionary by adding all the required fields, including the image associated with the fruit (image_name), and uploading it to http://[linux-instance-external-IP]/fruits using the Python requests library.

Create run.py using the nano editor:

    nano ~/run.py


Now, you'll have to process the .txt files (named 001.txt, 002.txt, ...) in the supplier-data/descriptions/ directory and save them in a data structure so that you can then upload them via JSON.


The data model in the Django application fruit has the following fields: name, weight, description and image_name. The weight field is defined as an integer field. So when you process the weight information of the fruit from the .txt file, you need to convert it into an integer. For example if the weight is "500 lbs", you need to drop "lbs" and convert "500" to an integer.

The image_name field will allow the system to find the image associated with the fruit. 

The final JSON object 
{"name": "Watermelon", "weight": 500, "description": "Watermelon is good for relieving heat, eliminating annoyance and quenching thirst. It contains a lot of water, which is good for relieving the symptoms of acute fever immediately. The sugar and salt contained in watermelon can diuretic and eliminate kidney inflammation. Watermelon also contains substances that can lower blood pressure.", "image_name": "010.jpeg"}



Grant executable permission to the run.py script.

    sudo chmod +x ~/run.py

Run the run.py script:

    ./run.py



## Generate a PDF report and send it through email

Once the images and descriptions have been uploaded to the fruit store web-server, you will have to generate a PDF file to send to the supplier, indicating that the data was correctly processed.

Processed Update on <Today's date>

[blank line]

name: Apple

weight: 500 lbs

[blank line]

name: Avocado

weight: 200 lbs

### Script to generate a PDF report

Create a script reports.py to generate PDF report to supplier using the nano editor:

    nano ~/reports.py


Create another script named report_email.py to process supplier fruit description data from supplier-data/descriptions directory. Use the following command to create report_email.py.

    nano ~/report_email.py


Import all the necessary libraries(os, datetime and reports) that will be used to process the text data from the supplier-data/descriptions directory into the format below:

    name: Apple

    weight: 500 lbs

    [blank line]

    name: Avocado

    weight: 200 lbs

    [blank line]

    ...

Once you have completed this, call the main method which will process the data and call the generate_report method from the reports module:

    if __name__ == "__main__":

You will need to pass the following arguments to the reports.generate_report method: the text description processed from the text files as the paragraph argument, the report title as the title argument, and the file path of the PDF to be generated as the attachment argument (use ‘/tmp/processed.pdf')

    reports.generate_report(attachment, title, paragraph)


## Send report through email

Once the PDF is generated, you need to send the email using the emails.generate_email() and emails.send_email() methods.

Create emails.py using the nano editor using the following command:

    nano ~/emails.py

Define generate_email and send_email methods by importing necessary libraries.


Now, open the report_email.py script using the nano editor:

    nano ~/report_email.py

Once you define the generate_email and send_email methods, call the methods under the main method after creating the PDF report:

    if __name__ == "__main__":


Use the following details to pass the parameters to emails.generate_email():

    From: automation@example.com
    To: username@example.com
        Replace username with the username given in the Connection Details Panel on the right hand side.
    Subject line: Upload Completed - Online Fruit Store
    E-mail Body: All fruits are uploaded to our website successfully. A detailed list is attached to this email.
    Attachment: Attach the path to the file processed.pdf



Grant executable permissions to the script report_email.py.

    sudo chmod +x ~/report_email.py

Run the report_email.py script.

    ./report_email.py


Now, check the webmail by visiting [linux-instance-external-IP]/webmail. Here, you'll need a login to roundcube using the username and password mentioned in the Connection Details Panel on the left hand side, followed by clicking Login.

Now you should be able to see your inbox, with one unread email. Open the mail by double clicking on it. There should be a report in PDF format attached to the mail. View the report by opening it.


## Health check

This is the last part of the lab, where you will have to write a Python script named health_check.py that will run in the background monitoring some of your system statistics: CPU usage, disk space, available memory and name resolution. Moreover, this Python script should send an email if there are problems, such as:

- Report an error if CPU usage is over 80%
- Report an error if available disk space is lower than 20%
- Report an error if available memory is less than 500MB
- Report an error if the hostname "localhost" cannot be resolved to "127.0.0.1"

Create a python script named health_check.py using the nano editor:

    nano ~/health_check.py


Complete the script to check the system statistics every 60 seconds, and in event of any issues detected among the ones mentioned above, an email should be sent with the following content:

    From: automation@example.com
    To: username@example.com
        Replace username with the username given in the Connection Details Panel on the right hand side.


### Subject line: 
| Case |  Subject line|
| -----|--------------|
| CPU usage is over 80%   |    Error - CPU usage is over 80%| 
| Available disk space is lower than 20%  | Error - Available disk space is less than 20%| 
| available memory is less than 500MB     |      Error - Available memory is less than 500MB| 
| hostname "localhost" cannot be resolved to "127.0.0.1"   |  Error - localhost cannot be resolved to 127.0.0.1| 
| E-mail Body: Please check your system and resolve the issue as soon as possible.| 
| ----------- |--------------------------- |


Grant executable permissions to the script health_check.py.

    sudo chmod +x ~/health_check.py

Run the file.

    ./health_check.py


To test out your script, you can install the stress tool.

    sudo apt install stress

Next, call the tool using a good number of CPUs to fully load our CPU resources:

    stress --cpu 8

Allow the stress test to run, as it will maximize our CPU utilization. Now run health_check.py by opening another SSH connection to the linux-instance. Navigate to Accessing the virtual machine on the navigation pane on the right-hand side to open another connection to the instance.

Now run the script:

    ./health_check.py


Now, you will be setting a cron job that executes the script health_check.py every 60 seconds and sends health status to the respective user.

To set a user cron job use the following command:

    crontab -e