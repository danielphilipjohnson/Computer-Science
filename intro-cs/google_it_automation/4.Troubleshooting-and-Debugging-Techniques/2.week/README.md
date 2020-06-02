# Fix a slow system with Python 


## Introduction

You're an IT administrator for a media production company that uses Network-Attached Storage (NAS) to store all data generated daily (e.g., videos, photos). One of your daily tasks is to back up the data in the production NAS (mounted at /data/prod on the server) to the backup NAS (mounted at /data/prod_backup on the server). A former member of the team developed a Python script (full path /scripts/dailysync.py) that backs up data daily. But recently, there's been a lot of data generated and the script isn't catching up to the speed. As a result, the backup process now takes more than 20 hours to finish, which isn't efficient at all for a daily backup.


## What you'll do

- Identify what limits the system performance: I/O, Network, CPU, or Memory
- Use rsync command instead of cp to transfer data
- Get system standard output and manipulate the output
- Find differences between threading and multiprocessing



### CPU bound

CPU bound means the program is bottlenecked by the CPU (Central Processing Unit). When your program is waiting for I/O (e.g., disk read/write, network read/write), the CPU is free to do other tasks, even if your program is stopped. The speed of your program will mostly depend on how fast that I/O can happen; if you want to speed it up, you'll need to speed up the I/O. If your program is running lots of program instructions and not waiting for I/O, then it's CPU bound. Speeding up the CPU will make the program run faster.


In either case, the key to speeding up the program might not be to speed up the hardware but to optimize the program to reduce the amount of I/O or CPU it needs. Or you can have it do I/O while it also does CPU-intensive work. CPU bound implies that upgrading the CPU or optimizing code will improve the overall computing performance.

In order to check how much your program utilizes CPU, you first need to install the pip3
    sudo apt install python3-pip
    pip3 install psutil


Import psutil python3 module for checking CPU usage as well as the I/O and network bandwidth.

    import psutil
    psutil.cpu_percent()




Now, using psutil.disk_io_counters() and psutil.net_io_counters() you'll get byte read and byte write for disk I/O and byte received and byte sent for the network I/O bandwidth. For checking disk I/O, you can use the following command:

    psutil.disk_io_counters()




For checking the network I/O bandwidth:

    psutil.net_io_counters()



Basics rsync command

rsync(remote sync) is a utility for efficiently transferring and synchronizing files between a computer and an external hard drive and across networked computers by comparing the modification time and size of files. One of the important features of rsync is that it works on the delta transfer algorithm, which means it'll only sync or copy the changes from the source to the destination instead of copying the whole file. This ultimately reduces the amount of data sent over the network.

The basic syntax of the rsync command is below:

rsync [Options] [Source-Files-Dir] [Destination]



1. Copy or sync files locally:

    rsync -zvh [Source-Files-Dir] [Destination]


2. Copy or sync directory locally:

    r sync -zavh [Source-Files-Dir] [Destination]

3. Copy files and directories recursively locally:

    rsync -zrvh [Source-Files-Dir] [Destination]


#### Example 

    import subprocess
    src = "<source-path>" # replace <source-path> with the source directory
    dest = "<destination-path>" # replace <destination-path> with the destination directory
    subprocess.call(["rsync", "-arq", src, dest])

### Multiprocessing

Now, when you go through the hierarchy of the subfolders of /data/prod, data is from different projects (e.g., , beta, gamma, kappa) and they're independent of each other. So, in order to efficiently back up parallelly, use multiprocessing to take advantage of the idle CPU cores. Initially, because of CPU bound, the backup process takes more than 20 hours to finish, which isn't efficient for a daily backup. Now, by using multiprocessing, you can back up your data from the source to the destination parallelly by utilizing the multiple cores of the CPU.


Open the dailysync.py Python script in the nano editor that needs to be modified. It's similar to multisync.py that utilizes idle CPU cores for the backup.

nano ~/scripts/dailysync.py

#### Code 

    #!/usr/bin/env python
    import subprocess
    import os
    from multiprocessing import Pool


    def run(src):
        dest = "./data/prod_backup/"
        subprocess.call(["rsync", "-arq", src, dest])
        # Do something with task here
        print("Handling {}".format(src))

    jobs = []


    for root, dirs, files in os.walk("./data/prod", topdown=False):
        for name in files:
            jobs.append((os.path.join(root, name)))
        print(jobs)

    tasks = ['task1', 'task2', 'task3']



    src = "./data/prod/"
    dest = "./data/prod_backup/"
    p = Pool(len(jobs))





    # Start each task within the pool
    p.map(run, jobs)
    subprocess.call(["rsync", "-arqv", src, dest])


Now, grant the executable permission to the dailysync.py Python script for running this file.

    sudo chmod +x ~/scripts/dailysync.py


Run the dailysync.py Python script:

    ./scripts/dailysync.py


## Congratulations!

You've successfully synced or copied data from different multimedia projects from the source location to the destination using rsync command used in the Python script. And you've reduced the backup time by taking advantage of the idle CPU cores for parallel processing using multiprocessing. Backing up a large amount of data from one place to another place will definitely help you in the field of IT.