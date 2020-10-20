class BankAccount:
  def __init__(self, initial_balance):
    """Creates an account with the given balance."""
    self.account_balance = initial_balance
    self.fees = 0

  def deposit(self, amount):
    """Deposits the amount into the account."""
    self.account_balance += amount 
    

  def withdraw(self, amount):
    """
    Withdraws the amount from the account. Each withdrawal 
    resulting in a negative balance also deducts a penalty 
    fee of 5 dollars from the balance.
    """
    if(self.account_balance - amount  < 0):
      self.fees += 5
      self.account_balance -= 5
      self.account_balance -= amount 
    else:
      self.account_balance -= amount 
      

  def get_balance(self):
    """Returns the current balance in the account."""
    return self.account_balance

  def get_fees(self):
    """Returns the total fees ever deducted from the account."""
    return self.fees



account1 = BankAccount(20)
account1.deposit(10)
account2 = BankAccount(10)
account2.deposit(10)
account2.withdraw(50)
account1.withdraw(15)
account1.withdraw(10)
account2.deposit(30)
account2.withdraw(15)
account1.deposit(5)
account1.withdraw(10)
account2.withdraw(10)
account2.deposit(25)
account2.withdraw(15)
account1.deposit(10)
account1.withdraw(50)
account2.deposit(25)
account2.deposit(25)
account1.deposit(30)
account2.deposit(10)
account1.withdraw(15)
account2.withdraw(10)
account1.withdraw(10)
account2.deposit(15)
account2.deposit(10)
account2.withdraw(15)
account1.deposit(15)
account1.withdraw(20)
account2.withdraw(10)
account2.deposit(5)
account2.withdraw(10)
account1.deposit(10)
account1.deposit(20)
account2.withdraw(10)
account2.deposit(5)
account1.withdraw(15)
account1.withdraw(20)
account1.deposit(5)
account2.deposit(10)
account2.deposit(15)
account2.deposit(20)
account1.withdraw(15)
account2.deposit(10)
account1.deposit(25)
account1.deposit(15)
account1.deposit(10)
account1.withdraw(10)
account1.deposit(10)
account2.deposit(20)
account2.withdraw(15)
account1.withdraw(20)
account1.deposit(5)
account1.deposit(10)
account2.withdraw(20)
print(account1.get_balance(), account1.get_fees(), account2.get_balance(), account2.get_fees())