from parse import parse
from decimal import Decimal


LOG = '[2018-05-06T12:58:00.714611] - SALE - PRODUCT: 1345 - PRICE:$09.99'


FORMAT = '[{date:ti}] - SALE - PRODUCT: {product:d} - PRICE:${price:05.2f}'

result = parse(FORMAT, LOG)

print(result)

# Define a custom type for the price to avoid issues with the float type


def price(string):
    return Decimal(string)


