#!/usr/bin
import sys
print(sys.path)

import math
import matplotlib.pyplot as plt

#import codeskulptor
#codeskulptor.set_timeout(20)

STANDARD = True
LOGLOG = False

# constants for simulation
INITIAL_SALARY = 100
SALARY_INCREMENT = 100
INITIAL_BRIBE_COST = 1000


def greedy_boss(days_in_simulation, bribe_cost_increment, plot_type = STANDARD):
    """
    Simulation of greedy boss
    """

    # initialize necessary local variables
    current_day = 0
    current_bank_balance = 0
    total_earnings = 0
    current_bribe_cost = INITIAL_BRIBE_COST
    current_salary = INITIAL_SALARY

    # initialize list consisting of days vs. total salary earned for analysis
    days_vs_earnings = [(0, 0)]

    # Each iteration of this while loop simulates one bribe
    while current_day < days_in_simulation: #i changed this to less than from equal to
        # advance current_day to day of next bribe (DO NOT INCREMENT BY ONE DAY)
        if current_bank_balance < current_bribe_cost:
            days_until_bribe = int(math.ceil((current_bribe_cost - current_bank_balance) / float(current_salary)))
            current_day += days_until_bribe
            current_bank_balance += (current_salary * days_until_bribe)
            total_earnings += (current_salary * days_until_bribe)

        '''while current_bank_balance < current_bribe_cost:
            current_day += 1
            current_bank_balance += current_salary
            total_earnings += current_salary'''

        # check whether we have enough savings to bribe without waiting
        while current_bank_balance >= current_bribe_cost:
        # update state of simulation to reflect bribe
            current_bank_balance -= current_bribe_cost
            current_salary += SALARY_INCREMENT
            current_bribe_cost += bribe_cost_increment
        # update list with days vs total salary earned for most recent bribe
            days_vs_earnings.append((current_day, total_earnings))
            '''cd = math.log(current_day)
            te = math.log(total_earnings)
            days_vs_earnings.append((cd, te))'''

        '''print days_until_bribe, 'dub' #0 should be 1
        print current_day, 'day'
        print current_salary, 'salary'
        print current_bribe_cost, 'bribe cost'
        print total_earnings, 'total earnings'
        print current_bank_balance, 'cur bank bal'''
        # use plot_type to control whether regular or log/log plot



    return days_vs_earnings


def run_simulations():
    """
    Run simulations for several possible bribe increments
    """
    plot_type = STANDARD
    days = 70
    inc_0 = greedy_boss(days, 0, plot_type)
    inc_0x, inc_0y = zip(*inc_0)
    inc_500 = greedy_boss(days, 500, plot_type)
    inc_500x, inc_500y = zip(*inc_500)
    inc_1000 = greedy_boss(days, 1000, plot_type)
    inc_1000x, inc_1000y = zip(*inc_1000)
    inc_2000 = greedy_boss(days, 2000, plot_type)
    inc_2000x, inc_2000y = zip(*inc_2000)
    # simpleplot.plot_lines("Greedy boss", 600, 600, "days", "total earnings",
    #                       [inc_0, inc_500, inc_1000, inc_2000], False,
    #                      ["Bribe increment = 0", "Bribe increment = 500",
    #                       "Bribe increment = 1000", "Bribe increment = 2000"])

    plt.plot(inc_0x, inc_0y, lw=2)
    plt.plot(inc_500x, inc_500y, lw=2)
    plt.plot(inc_1000x, inc_1000y, lw=2)
    plt.plot(inc_2000x, inc_2000y, lw=2)
    plt.xlim(1, 70)
    plt.title('Greedy Boss')
    plt.xlabel('Days')
    plt.ylabel('Total Earnings')
    #plt.legend(['Bribe increment = 0', 'Bribe increment = 500', 'Bribe increment = 1000', 'Bribe increment = 2000'])
    plt.show()


#run_simulations()


zzz = greedy_boss(50,1000)
aaa = []

for value in zzz:
    print(value)

for x in range(10,101, 10):
    my_formula = (0.1 * x * (0.1 * x+1)) / 2 * 1000
    print(x, my_formula)
    aaa.append([x, my_formula])

xxx, yyy = zip(*zzz)
bbb, ccc = zip(*aaa)
plt.plot(xxx, yyy, lw=2)
plt.plot(bbb, ccc, lw=2)
plt.show()