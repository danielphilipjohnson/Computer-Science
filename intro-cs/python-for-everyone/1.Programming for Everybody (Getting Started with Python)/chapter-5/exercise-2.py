largest = None
smallest = None
scores = []
while True:
    try:
        num = input("Enter a number: ")
        if num == "done" : 
            break
        else:
        	scores.append(int(num))
            
    except ValueError:
        print("Invalid input")
        
largest = max(scores)

smallest = min(scores)
    
print("Maximum is", largest)
print("Minimum is", smallest)