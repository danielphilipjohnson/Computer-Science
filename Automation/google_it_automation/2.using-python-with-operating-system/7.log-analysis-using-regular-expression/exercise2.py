import operator
fruit = {"oranges": 3, "apples": 5, "bananas": 7, "pears": 2}
print("Fruit Before: {}".format(fruit))

# Sorts by Name
print("Fruit After: {}".format(sorted(fruit.items(), key=operator.itemgetter(0))))
# Sort by values
print("Fruit After: {}".format(sorted(fruit.items(), key=operator.itemgetter(1))))
print("Fruit After: {}"
      .format(sorted(
          fruit.items(), 
          key = operator.itemgetter(1), 
          reverse=True))
      )
      
# You can further practice this by sorting the logs that you would fetch using regular expressions from the previous section.
