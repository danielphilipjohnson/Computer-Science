# Use the file name mbox-short.txt as the file name
# without sum
fname = input("Enter file name: ")
fh = open(fname)
count_len = 0
confidence_total = 0
for line in fh:
    if not line.startswith("X-DSPAM-Confidence:") : continue
    colon_loc = line.find(":")
    confidence_score = float(line[colon_loc+1:])
    count_len = count_len + 1
    # compute total
    confidence_total = confidence_total + confidence_score


# avg spam confidence
avg = confidence_total / count_len
print("Average spam confidence:", avg)
fh.close()