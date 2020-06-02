 # Introduction to Git 


## Introduction

In this scenario, you are a project lead in an IT company. You and your team are working on a huge project, which consists of multiple functionalities and modules. This project is evolving over time and so your team is expecting a lot of code revisions. In this lab, you'll learn how to use a distributed version control system called Git. You'll also discover how to connect to a VM instance, install Git, and configure your Git user information. Next, you'll create a local Git repository, add a file to the repository, and do some basic operations like adding a file, editing files, and making commits.
What you'll do

- Create a git repository.
- Add files to this repository
- Edit the files
- Commit the changes to the repository.


## Install Git

Before you install Git on your Linux VM, you need to first make sure that you have a fresh index of the packages available to you. To do that, run:

    sudo apt update

Now, you can install Git on your Linux host using apt by running the following command:

    s udo apt install git

For any prompts, continue by clicking Y.

Check the installed version of git by using the command below:

    git --version



## Initialize a new repository

Create a directory to store your project in. To do this, use the following command:

    mkdir my-git-repo

Now navigate to the directory you created.

    cd my-git-repo

Next, initialize a new repository by using the following command:

    git init


## Configure Git

Git uses a username to associate commits with an identity. It does this by using the git config command. To set Git username use the following command:

    git config --global user.name "Name"


Let's set your email address to associate it with your Git commits.

    git config --global user.email "user@example.com"



## Git Operations

Let's now create a text file named README. We will be using the nano editor for this.

    nano README

Type any text within the file, or you can use the following text:

This is my first repository.


Git is now aware of the files in the project. We can check the status using the following command:

    git status


git add doesn't affect the repository in any serious way because changes are not actually recorded until you commit them.

Let's now commit the changes. A Git commit is equivalent to the term "Save".

Commit the changes using the following command:

    git commit



This now opens an editor, asking you to type a commit message. Every commit has an associated commit message. A commit message is a log message from the user describing the changes.

Enter the commit message of your choice or you can use the following text:

    This is my first commit!


You have successfully committed your file!


Let's now re-edit the file again to understand the process better. Open the file README using nano editor.

    nano README

Now add another line of description for your repository below the earlier entered line. Add the description of your choice or you can use the following text:

A repository is a location where all the files of a particular project are stored.


Now, let's repeat the previous process. As mentioned earlier, you can always check the status of your repository by using:

    git status


Git tracks the changes and displays that the file has been modified. You can view the changes made to file using the following command:

    git diff README


Now, we will add these changes to the staging area.

    git add README

View the status of the repository using the following command:

    git status


Let's commit the file now by entering the commit message with the command itself, unlike the previous commit.

    git commit -m "This is my second commit."

The command git commit with -m flag takes the commit message, too. This is different to the command without flag, where you had to type the commit message within the editor. If multiple -m flags are given to the command, it concatenates the values as separate paragraphs.

To view all the commits use the following command:

    git log


Git log command shows the commit history of the repository. It shows all the commits on the repository represented by a unique commit ID at the top of each commit. It also shows the author, date, and time and the commit message associated with the commits.

You also have various options to limit the output of this command. The output can be filtered based on the last number of commits, author, commit message, etc.

## Congratulations!

Congrats! You've successfully installed the Git, initialized a repository, and performed basic Git operations. Now that you know how to do this, it will be easier for you and your team to work on a huge project with multiple functionalities and modules.
