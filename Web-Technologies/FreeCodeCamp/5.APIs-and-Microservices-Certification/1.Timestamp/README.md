## Timestamp
### Whats used 
| Languages Usage | Package Manager | Packages | 
| --------------- | --------- | ------- |
|  JS             | Node      |   "body-parser": "^1.17.2", "connect-flash": "^0.1.1", "express": "^4.15.3", "pug": "^2.0.0-rc.2"  |


## User Stories

- It should handle a valid date, and return the correct unix timestamp
- It should handle a valid date, and return the correct UTC string
- It should handle a valid unix date, and return the correct unix timestamp
- It should return the expected error message for an invalid date
- It should handle an empty date parameter, and return the current time in unix format
- It should handle an empty date parameter, and return the current time in UTC format