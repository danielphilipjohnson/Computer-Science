hours = float(input("Enter Hours: "))
rate_of_pay = float(input("Enter Rate: "))

if hours > 40:
	pay = 40 * rate_of_pay
	overtime_hours = hours - 40
	overtime = rate_of_pay * 1.5 * overtime_hours
    
	print(pay + overtime)
    
else:
	pay = hours * rate_of_pay
    
	print(pay)