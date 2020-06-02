# Create VM template and Automate deployment 

## Introduction

You're an IT Administrator for your company and you're assigned to work on a project that requires you to deploy eight virtual machines (VMs) as web servers. Each of them should have the same configuration. You'll create a VM, set up an auto-enabled service, and make it a template. Then you'll use the template to create seven more VMs.
What you'll do

- Create a VM using GCP web UI and make a template out of it

- Use a command-line interface to interact with VMs

- Learn how to configure an auto-enabled service

- Learn to use gcloud to deploy VMs with a template


Now, you'll create new VM instances with the template named vm1-template from your local computer using gcloud command-line interface. To do this, return back to the command line interface on your local computer, and enter the following command:

    gcloud compute instances create --zone us-west1-b --source-instance-template vm1-template vm2 vm3 vm4 vm5 vm6 vm7 vm8

Wait for the command to finish. Once it's done, you can view the instances through the Console or by using the following gcloud command on your local terminal:

    gcloud compute instances list

Now, open the external links for vm2 and vm8 to check if all the configuration set up properly as vm1.