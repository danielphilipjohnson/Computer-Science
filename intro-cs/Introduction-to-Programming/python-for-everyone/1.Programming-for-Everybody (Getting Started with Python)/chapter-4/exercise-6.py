def computepay(hours, rate):
    overtime_hours = 0 
    if hours > 40:
        pay = 40 * rate
        overtime_hours = hours - 40
        overtime = rate * 1.5 * overtime_hours
        return pay + overtime

    else:
        pay = hours * rate_of_pay
        return pay


hours = float(input("Enter Hours: "))
rate = float(input("Enter Rate: "))
print("Pay", computepay(hours, rate))