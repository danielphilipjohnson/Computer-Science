scores = []

while True:
    try:
        user_response = input("Enter number: ")

        if user_response == "done":
            break

        else:

            scores.append(float(user_response))

    except ValueError:
        print("Invalid input")

max_num = max(scores)

min_num = min(scores)


print("{} {}".format(min_num, max_num))