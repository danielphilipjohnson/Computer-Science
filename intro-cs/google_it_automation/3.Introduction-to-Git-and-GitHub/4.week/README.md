# Pushing Local Commits to Github 

## Introduction

For this project, you'll need to fork an existing repository, fix a bug in a script, push your commit to GitHub, and create a pull request with your commit.
What you'll do

    Fork another repository
    Commit changes to your own fork and create pull requests to the upstream repository
    Gain familiarity with code reviews, and ensure that your fix runs fine on your system before creating the pull request
    Describe your pull request

## Configure Git

Git uses a username to associate commits with an identity. It does this by using the git config command. Set the Git username with the following command:

    git config --global user.name "Name"

Replace Name with your name. Any future commits you push to GitHub from the command line will now be represented by this name. You can even use git config to change the name associated with your Git commits. This will only affect future commits and won't change the name used for past commits.

Let's set your email address to associate them with your Git commits.

    git config --global user.email "user@example.com"

Replace user@example.com with your email-id. Any future commits you now push to GitHub will be associated with this email address. You can also use git config to change the user email associated with your Git commits.



## Fix the script

In this section we are going to fix an issue that has been filed. Navigate to the issue, and have a look at it.

Branches allow you to add new features or test out ideas without putting your main project at risk. In order to add new changes into the repo directory it-cert-automation-practice/Course3/Lab4/, create a new branch named improve-username-behavior in your forked repository using the following command:

    git branch improve-username-behavior

Go to the improve-username-behavior branch from the master branch.

    git checkout improve-username-behavior

Now, navigate to the working directory Lab4/.

    cd ~/it-cert-automation-practice/Course3/Lab4

List the files in directory Lab4.

    ls


Now, open the validations.py script.

    cat validations.py


This script should validate usernames if they start with an letter only.

Here, you can check the validate_user function's behavior by calling the function. To edit the validations.py Python script, open it in a nano editor using the following command:

    nano validations.py

Now, add the following lines of code at the end of the script:

    print(validate_user("blue.kale", 3)) # True
    print(validate_user(".blue.kale", 3)) # Currently True, should be False
    print(validate_user("red_quinoa", 4)) # True
    print(validate_user("_red_quinoa", 4)) # Currently True, should be False


Now, run the validations.py on the python3 interpreter.

    python3 validations.py


Here, as we see the output, it function returns true even if the username doesnot start with an letter. Here we need to change the check of the first character as only letters are allowed in the first character of the username.

Continue by opening validations.py in the nano editor using the following command:

    nano validations.py

There are lots of ways to fix the code; ultimately, you'll want to add additional conditional checks to validate the first character doesn't start with either of the forbidden characters. You can choose whichever way you'd like to implement this



## Commit the changes

Once the issue is fixed and verified, create a new commit by adding the file to the staging area. You can check the status using the following command:

    git status

The git status command shows the different states of the files in your working directory and staging area, like files that are modified but unstaged and files that are staged but not yet committed.

You can now see that the validations.py has been modified.


Now, let's add the file to the staging area using the following command:

    git add validations.py

Use the git add command to add content from the working directory into the staging area for the next commit.

    git status


Let's now commit the changes. A git commit is like saving your work.

Commit the changes using the following command:

    git commit

This now opens up an editor that asks you to type a commit message. Every commit has an associated commit message, which is a log message from the user describing the changes.

Enter a commit message of your choice and append a line: "Closes: #1" at the beginning to indicate that you're closing the issue. Adding this keyword has an additional effect when using Github to manage your repos, which will automatically close the issue for you (for more information, please see the documentation here).

    Closes: #1
    Updated validations.py python script.
    Fixed the behavior of validate_user function in validations.py.

## Push changes

You forked a repository and made changes to the fork. Now you can ask that the upstream repository accept your changes by creating a pull request. Now, let's push the changes.

    git push origin improve-username-behavior


Then, from GitHub, create a pull request from your forked repository [git-username]/it-cert-automation-practice that includes a description of your change. Your branch improve-username-behavior is now able to merge into the master branch.


After initializing a pull request, you'll see a review page that shows a high-level overview of the changes between your branch (the compare branch) and the repository's base branch. You can add a summary of the proposed changes, review the changes made by commits, add labels, milestones, and assignees, and @mention individual contributors or teams.

Once you've created a pull request, you can push commits from your topic branch to add them to your existing pull request. These commits will appear in chronological order within your pull request and the changes will be visible in the "Files changed" tab.

Other contributors can review your proposed changes, add review comments, contribute to the pull request discussion, and even add commits to the pull request.

You can see information about the branch's current deployment status and past deployment activity on the "Conversation" tab.


## Congratulations!

In this lab, you successfully forked a repository, committed changes to your own fork, and created a pull request to the upstream. Well done!