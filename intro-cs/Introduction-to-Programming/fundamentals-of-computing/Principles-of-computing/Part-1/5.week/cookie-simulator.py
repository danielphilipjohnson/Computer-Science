"""
Cookie Clicker Simulator
"""
import simpleplot
import math
# Used to increase the timeout, if necessary
import codeskulptor
codeskulptor.set_timeout(20)
import poc_clicker_provided as provided
import poc_simpletest
# Constants
SIM_TIME = 10000000000.0
#SIM_TIME = 100000.0

class ClickerState:
    """
    Simple class to keep track of the game state.
    """
    
    def __init__(self):
        self.total_number_of_cookies = 0.0
        self.current_number_of_cookies = 0.0
        self.current_time_in_seconds = 0.0
        self.current_cps = 1.0
        self.history_list = [(0.0,None,0.0,0.0)]
        
        
    def __str__(self):
        """
        Return human readable state
        """
        
        msg_cookies = "\nTotal Cookies: %s \nCurrent cookies per second: %s" %(
            self.get_cookies(),
            self.get_cps())
        
        msg_history = "\nPurchase History:"
        for item in self.get_history():
            msg_history += "\n%s" % str(item)
            
 
        msg_time = "\nCurrent Time: %s"  %self.get_time()
      
      
 
        return msg_cookies + msg_history+ msg_time
        
    def get_cookies(self):
        """
        Return current number of cookies
        (not total number of cookies)
        
        Should return a float
        """
        return self.current_number_of_cookies
    
    def get_cps(self):
        """
        Get current CPS
        Should return a float
        """
        return self.current_cps
    
    def get_time(self):
        """
        Get current time
        Should return a float
        """
        return self.current_time_in_seconds
    
    def get_history(self):
        """
        Return history list
        History list should be a list of tuples of the form:
        (time, item, cost of item, total cookies)
        For example: [(0.0, None, 0.0, 0.0)]
        Should return a copy of any internal data structures,
        so that they will not be modified outside of the class.
        """
        cpy_history = self.history_list
        return cpy_history
    def time_until(self, cookies):
        """
        Return time until you have the given number of cookies
        (could be 0.0 if you already have enough cookies)
        Should return a float with no fractional part
        """
        if cookies > self.get_cookies():
            return math.ceil((cookies - self.get_cookies()) /self.get_cps())
        else:
            return 0.0
    
    def wait(self, time):
        """
        Wait for given amount of time and update state
        Should do nothing if time <= 0.0
        """
        
        if time > 0.0:
           
            #appropriately increase the time
            self.current_time_in_seconds += time
            #increase the current number of cookies
            cookies = time * self.current_cps
            self.current_number_of_cookies += cookies
            #and increase the total number of cookies
            self.total_number_of_cookies += cookies
        
    def buy_item(self, item_name, cost, additional_cps):
        """
        Buy an item and update state
        Should do nothing if you cannot afford the item
        """
        
        #This method should "buy" the given item.
        if self.current_number_of_cookies < cost:
            return
        
        else:
            # adjust the current_cps
            self.current_cps += additional_cps
        
            # adjust the current number of cookies
            self.current_number_of_cookies -= cost
                
            # add an entry into the history.
            self.history_list.append((self.get_time(),
                                  item_name,
                                  cost,
                                  self.total_number_of_cookies))
        
    
def simulate_clicker(build_info, duration, strategy):
    """
    Function to run a Cookie Clicker game for the given
    duration with the given strategy.  Returns a ClickerState
    object corresponding to the final state of the game.
    """
    # Replace with your code
    board_clone = build_info.clone()
    clickerState = ClickerState()
    
    # 1. Check the current time and break out of the loop if the duration has been passed.
    while clickerState.get_time() <= duration:
        
        # 2. Call the strategy function with the appropriate arguments to determine
        #        which item to purchase next. If the strategy function returns
        #        None, you should break out of the loop, as that means no more items will be purchased.
        
        item_name = strategy(clickerState.get_cookies(),
                           clickerState.get_cps(),
                           clickerState.get_history(),
                           clickerState.get_time(),
                           board_clone)
        time_left = duration - clickerState.get_time()
        
        if item_name == None:
            break
    
        # 3. Determine how much time must elapse until it is possible to purchase the item.
        # If you would have to wait past the duration of the simulation to purchase the item,
        # you should end the simulation.
        
        
    
        item_cost = build_info.get_cost(item_name)    
        
        additional_cps = build_info.get_cps(item_name)
        
        if clickerState.time_until(item_cost) > time_left:
            # If you would have to wait past the duration of the simulation to purchase the item,
            break
            
        else:
            # 4. Wait until that time.
            clickerState.wait(clickerState.time_until(item_cost))
            # 5. Buy the item.
            clickerState.buy_item(item_name, item_cost, additional_cps)
            # 6. Update the build information.
            build_info.update_item(item_name)
        
    clickerState.wait(time_left)
    return clickerState
def strategy_cursor_broken(cookies, cps, history, time_left, build_info):
    """
    Always pick Cursor!
    Note that this simplistic (and broken) strategy does not properly
    check whether it can actually buy a Cursor in the time left.  Your
    simulate_clicker function must be able to deal with such broken
    strategies.  Further, your strategy functions must correctly check
    if you can buy the item in the time left and return None if you
    can't.
    """
    return "Cursor"
def strategy_none(cookies, cps, history, time_left, build_info):
    """
    Always return None
    This is a pointless strategy that will never buy anything, but
    that you can use to help debug your simulate_clicker function.
    """
    return None
def strategy_cheap(cookies, cps, history, time_left, build_info):
    """
    Always buy the cheapest item you can afford in the time left.
    """
    #print cookies
    item_to_select = None
    
    min_cost = float('Inf')
    
    list_items =  build_info.build_items()
    #(cookies + cps * time_left) < cost_lst[cheap_idx]:
    for item in list_items:
        #print item
        cost =  build_info.get_cost(item)
        possible_cookies = cookies + cps * time_left
        #print possible_cookies
        #print cookies
        #print "cookies possible:", cookies + cps * time_left
        
        if cookies + (cps * time_left) > cost:
            break
            
        if cost < min_cost:
            
            min_cost =  cost
            
            item_to_select = item
            
    return item_to_select
def strategy_expensive(cookies, cps, history, time_left, build_info):
    """
    Always buy the most expensive item you can afford in the time left.
    
    """
    item_to_select = None
    
    max_cost = float('-Inf')
    
    list_items =  build_info.build_items()
    
    for item in list_items:
        cost =  build_info.get_cost(item)
        possible_cookies = (cps * time_left) + cookies
                
        if cost < cookies + (cps * time_left):
            break
            
        if cost > max_cost:
            
            max_cost =  cost
            
            item_to_select = item
            
    return item_to_select
    
    
    
    #return None
def strategy_best(cookies, cps, history, time_left, build_info):
    """
    The best strategy that you are able to implement.
    aka greatest cps/cost
    """
    efficency = float('-Inf')
    item_to_buy = None    
    
    
    formatted_items = []
    items = build_info.build_items()
    
    for item in items:
        
        cost = build_info.get_cost(item)
        cps = build_info.get_cps(item)
        formatted_items.append((item,cost,cps ))
        
    
    for item in formatted_items:
        
        if item[1] / item[2] > efficency:
            efficency = item[2] / item[1]
            item_to_buy = item[0]
        
    return item_to_buy
        
def run_strategy(strategy_name, time, strategy):
    """
    Run a simulation for the given time with one strategy.
    """
    state = simulate_clicker(provided.BuildInfo(), time, strategy)
    
    
    print strategy_name, ":", state
    # Plot total cookies over time
    # Uncomment out the lines below to see a plot of total cookies vs. time
    # Be sure to allow popups, if you do want to see it
    history = state.get_history()
    history = [(item[0], item[3]) for item in history]
    simpleplot.plot_lines(strategy_name, 1000, 400, 'Time', 'Total Cookies', [history], True)
def run():
    """
    Run the simulator.
    """    """
Merge function for 2048 game.
"""
newlist = []
def merge(line):
    """
    Function that merges a single row or column in 2048.
    This function takes the list
    line as a parameter and
    returns a new list with the tile values from
    line slid towards the front of the list and merged.
    """

    is_merged = False
    # fill result with blank 0's
    result = [0] * len(line)
 
    for index_i in range(0, len(line)):
        if line[index_i] != 0:
            for index_j in range(0, len(result)):
                if result[index_j] == 0:
                    result[index_j] = line[index_i]
                    is_merged = False
                    break
                
                elif result[index_j + 1] == 0:
                    
                    if result[index_j] == line[index_i] and is_merged == False:
                        result[index_j] = result[index_j] + line[index_i]
                        is_merged = True
                        break
    return result
validate = [2,2,2,2,2]
print(merge(validate))

    #run_strategy("Cursor", SIM_TIME, strategy_cursor_broken)
    #run_strategy("None", SIM_TIME, strategy_none)
    # Add calls to run_strategy to run additional strategies
    #run_strategy("Cheap", SIM_TIME, strategy_cheap)
    #run_strategy("Expensive", SIM_TIME, strategy_expensive)
    run_strategy("Best", SIM_TIME, strategy_best)
  
run()
