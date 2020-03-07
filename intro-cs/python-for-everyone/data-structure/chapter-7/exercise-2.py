import math
#filepath = input("Enter a file name: ")
#file = open(filepath)
file_text = open("mbox-short.txt")


confidence_scores = []
for line in file_text:
    if "X-DSPAM-Confidence:" in line:
        colon_loc = line.find(":")
        
        #print(line[colon_loc+1:])

        confidence_score = float(line[colon_loc+1:])
        
        confidence_scores.append(confidence_score)

# compute total
confidence_total = sum(confidence_scores)
# avg spam confidence
avg = confidence_total / len(confidence_scores)
print("Average spam confidence:", avg)
file_text.close()
