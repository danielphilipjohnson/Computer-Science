#filepath = input("Enter a file name: ")
#file = open(filepath)
file = open("mbox.txt")

email_histogram = {}

for line in file:
    # ﬁnd line that starts with “From”
    if line.startswith("From "):
        words = line.split()
        # who sent the message
        # words = [0]From [1] stephen.marquard@uct.ac.za Sat Jan 5 09:14:16 2008
        message_sender = words[1]
        if message_sender not in email_histogram:
            email_histogram[message_sender] = 1
        else:
            email_histogram[message_sender] = email_histogram[message_sender] + 1

 
highest_count = 0
lowest_count = float("inf")
most_messages = {}
least_messages = {}
for email in email_histogram:
    if email_histogram[email] > highest_count:
        most_messages.clear()
        highest_count = email_histogram[email]
        most_messages[email] = highest_count

    if email_histogram[email] < lowest_count:
        least_messages.clear()
        lowest_count = email_histogram[email]
        least_messages[email] = lowest_count

print(most_messages)
print(least_messages)