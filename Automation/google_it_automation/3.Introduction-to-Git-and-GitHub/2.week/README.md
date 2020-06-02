# Git Merges 

## Introduction

In this lab, you'll use your knowledge of Git and Git commit history to check out an existing repo and make some changes to it. You'll also test what you learned about rolling back commits after bad changes in order to fix a script in the repo and run it to produce the correct output.
What you'll do

- Check the status and history of an existing Git repo
- Create a branch
- Modify content on the branch
- Make rollback changes
- Merge the branch



## Explore repository

There is a Git repository named food-scripts consisting of a couple of food-related Python scripts.

Navigate to the repository using the following command:

    cd ~/food-scripts

Now, list the files using the ls command. There are three files named favorite_foods.log, food_count.py, and food_question.py.

1. favorite_foods.log: This file consists of a list of food items.
2. food_count.py: This script returns a list of each food and the number of times the food appeared in the favorite_foods.log file.
3. food_question.py: This prints a list of foods and prompts the user to enter one of those foods as their favorite. It then returns an answer of how many others in the list like that same food.


Run the following command to see the output of food_question.py script:

    ./food_question.py

Output:

Uh oh , this gives us an error. One of your colleagues reports that this script was working fine until the most recent commit. We'll be fixing this error later during the lab.



## Understanding the repository

Let's use the following Git operations to understand the workflow of the repository:

- git status
- git log
- git branch

Git status: This displays paths that have differences between the index file and the current HEAD commit; paths that have differences between the working tree and the index file; and paths in the working tree that are not tracked by Git. You can view the status of the working tree using the command: [git status]

    git status


Git log: This lists the commits done in the repository in reverse chronological order; that is, the most recent commits show up first. This command lists each commit with its SHA-1 checksum, the author's name and email, date, and the commit message.

You can see logs by using the following command:

    git log


Git branch: Branches are a part of the everyday development process on the master branch. Git branches effectively function as a pointer to a snapshot of your changes. When you want to add a new feature or fix a bug, no matter how big or small, you spawn a new branch to encapsulate your changes. This makes it difficult for unstable code to get merged into the main codebase.


## Configure Git

Before we move forward with the lab, let's configure Git. Git uses a username to associate commits with an identity. It does this by using the git config command. Set the Git username with the following command:

    git config user.name "Name"


Let's set your email address to associate them with your Git commits.

    git config user.email "user@example.com"



## Add a new feature

In this section, we'll be modifying the repository to add a new feature, without affecting the current iteration. This new feature is designed to improve the food count (from the file food_count.py) output. So, create a branch named improve-output using the following command:

    git branch improve-output

Move to the improve-output branch from the master branch.

    git checkout improve-output

Here, you can modify the script file without disturbing the existing code. Once modified and tested, you can update the master branch with a working code.

Now, open food_count.py in the nano editor using the following command:

    nano food_count.py

Add the line below before printing for loop in the food_count.py script:

    print("Favourite foods, from most popular to least popular")




After running the food_count.py script successfully, commit the changes from the improve-output branch by adding this script to the staging area using the following command:

    git add food_count.py

Now, commit the changes you've done in the improve-output branch.

    git commit -m "Adding a line in the output describing the utility of food_count.py script"


## Fix the script

In this section, we'll fix the script food_question.py, which displayed an error when executing it. You can run the file again to view the error.

    ./food_question.py


This script gives us the error: "NameError: name 'item' is not defined" but your colleague says that the file was running fine before the most recent commit they did.

In this case, we'll revert back the previous commit.

For this, check the git log history so that you can revert back to the commit where it was working fine.

    git log



To revert, use the following command:

    git revert [commit-ID]

Replace [commit-ID] with the commit ID you noted earlier.

This creates a new commit again. You can continue with the default commit message on the screen or add your own commit message.

Then continue by clicking Ctrl-o, the Enter key, and Ctrl-x.

Now, run food_question.py again and verify that it's working as intended.

    ./food_question.py


## Merge operation

Before merging the branch improve-output, switch to the master branch from the current branch improve-output branch using the command below:

    git checkout master

Merge the branch improve-output into the master branch.

    git merge improve-output


## Congratulations!

In this lab, you successfully created a branch from the master branch to add a new feature. You also rolled back a commit to where the script worked fine, and then merged it to the master branch. This will help as you work with colleagues who are simultaneously on the same repository.