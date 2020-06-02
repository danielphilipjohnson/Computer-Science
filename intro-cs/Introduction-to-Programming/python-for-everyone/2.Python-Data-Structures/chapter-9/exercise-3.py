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
    
  # print out the sender
print(email_histogram)
