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
        domain_loc = message_sender.find("@")
        domain = message_sender[domain_loc+1:]
        if domain not in email_histogram:
            email_histogram[domain] = 1
        else:
            email_histogram[domain] = email_histogram[domain] + 1
    
  # print out the sender
print(email_histogram)
