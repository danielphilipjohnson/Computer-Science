# sample log
# [2018-05-05T10:58:41.504054] - SALE - PRODUCT: 1345 - PRICE: $09.99
import delorean
from decimal import Decimal

log = '[2018-05-05T11:07:12.267897] - SALE - PRODUCT: 1345 - PRICE: $09.99'

divide_it = log.split(' - ')
timestamp_string, _, product_string, price_string = divide_it


timestamp = delorean.parse(timestamp_string.strip('[]'))

product_id = int(product_string.split(':')[-1])

price = Decimal(price_string.split('$')[-1])

#print( timestamp, product_id, price)



class PriceLog(object):
    def __init__(self, timestamp, product_id, price):
        self.timestamp = timestamp
        self.product_id = product_id
        self.price = price
    
    def __repr__(self):
        return '<PriceLog ({}, {}, {})>'.format(self.timestamp,
        self.product_id,
        self.price)
    @classmethod
    def parse(cls, text_log):
        '''
            Parse from a text log with the format
            [<Timestamp>] - SALE - PRODUCT: <product id> - PRICE: $<price>
            to a PriceLog object
        '''
        divide_it = text_log.split(' - ')
        tmp_string, _, product_string, price_string = divide_it
        timestamp = delorean.parse(tmp_string.strip('[]'))
        product_id = int(product_string.split(':')[-1])
        price = Decimal(price_string.split('$')[-1])
        return cls(timestamp=timestamp, product_id=product_id, price=price)


log = '[2018-05-05T12:58:59.998903] - SALE - PRODUCT: 897 - PRICE: $17.99'
print(PriceLog.parse(log))


