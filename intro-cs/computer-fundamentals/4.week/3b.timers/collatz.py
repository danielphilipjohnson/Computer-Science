def run(number):
    print(number)
    if number == 1:
        return 1
    elif number % 2 == 0:
        #print(number  // 2)
        return run(number  // 2)
    else:
        #print(number * 3  + 1)
        return run(number * 3  + 1)


run(217)