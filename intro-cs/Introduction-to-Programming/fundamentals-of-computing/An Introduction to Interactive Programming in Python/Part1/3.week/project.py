# template for "Stopwatch: The Game"
import simplegui
# define global variables
WIDTH, HEIGHT = 400, 400
POSITION = [WIDTH - 273, HEIGHT / 2]
TIME_TXT_SIZE = 50

GUESSES_POSITION = [400-60, 60]
GUESSES_TXT_SIZE = 36

INTERVAL = 100

counter = 0

correct_guesses = 0
stopped = True
times_stopped = 0


# define helper function format that converts time
# in tenths of seconds into formatted string A:BC.D
def format(t):
    # Hours
    A = t % 6000
    A //= 600
    
    # Minutes
    B = t % 600
    B //= 100
    
    # seconds 
    C = t  % 100
    C  //= 10
    
    # milliseconds
    D = t  % 10
    
    return "%d:%d%d.%d" % (A, B, C, D)
    
# define event handlers for buttons; "Start", "Stop", "Reset"
def start_button_handler():
    global stopped
    
    stopped = False
    
    timer.start()

def stop_button_handler():
    global counter, correct_guesses, stopped, times_stopped
    
    timer.stop()
    if counter == 0:
        pass
    elif counter % 10 == 0:
        correct_guesses += 1
        
    if not stopped:
        times_stopped += 1
        stopped = True
        
def reset_button_handler():
    global counter, correct_guesses,times_stopped
    
    timer.stop()
    
    # reset values
    counter, correct_guesses, times_stopped = 0,0,0



# define event handler for timer with 0.1 sec interval
def timer_handler():
    global counter
    
    counter += 1
    
    format(counter)
    

# define draw handler
def draw_handler(canvas):
    global counter, TIME_TXT_SIZE, GUESSES_POSITION, GUESSES_TXT_SIZE
    

    
    canvas.draw_text("%d/%d" % (correct_guesses, times_stopped), 
                     (GUESSES_POSITION), 
                     GUESSES_TXT_SIZE, 
                     'Green')
    
    canvas.draw_text(str(format(counter)), 
                     POSITION, 
                     TIME_TXT_SIZE, 
                     'Red')
    
# create frame
frame = simplegui.create_frame('StopWatch', WIDTH, HEIGHT)

frame.set_draw_handler(draw_handler)


# register event handlers
timer = simplegui.create_timer(INTERVAL, timer_handler)

## Buttons
start = frame.add_button('Start', start_button_handler)
stop = frame.add_button('Stop', stop_button_handler)
reset = frame.add_button('Reset', reset_button_handler)

# start frame
frame.start()
# http://www.codeskulptor.org/#user47_woNW4S1z8G_41.py