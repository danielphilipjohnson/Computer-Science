name = input("Enter file:")
if len(name) < 1 : name = "mbox-short.txt"
fh = open(name)
email_histogram = {}



for line in fh:
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

mst_message = tuple
lst_message = tuple
least_messages = {}

for email in email_histogram:
    if email_histogram[email] > highest_count:
        highest_count = email_histogram[email]
        mst_message = (email, highest_count)

    if email_histogram[email] < lowest_count:
        lowest_count = email_histogram[email]
        lst_message = (email, lowest_count)

print(mst_message[0], mst_message[1])