scores = []
total = 0
count = 0
average = 0

while True:
    try:
        user_response = input("Enter number: ")

        if user_response == "done":
            break

        else:
            scores.append(float(user_response))

    except ValueError:
        print("Invalid input")

total = sum(scores)

count = len(scores)

average = total / count

print("{} {} {}".format(total, count, average))