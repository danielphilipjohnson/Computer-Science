hours = float(input("Enter Hours: "))
rate_of_pay = float(input("Enter Rate: "))
if hours > 40:
	print("Pay: ", hours * (rate_of_pay * 1.5))
else:
	print("Pay: ", hours * rate_of_pay)
#40 * (2 * 1.5)