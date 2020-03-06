def computepay(hours, rate):
    if hours > 40:
        return hours * (rate * 1.5)
    else:
        return  hours * rate


hours = float(input("Enter Hours: "))
rate = float(input("Enter Rate: "))
print(computepay(hours, rate))
