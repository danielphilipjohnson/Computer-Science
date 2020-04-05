# Move a ball

###################################################
# Student should add code where relevant to the following.


import simplegui 

# Define globals - Constants are capitalized in Python
HEIGHT = 400
WIDTH = 400
RADIUS_INCREMENT = 5
ball_radius = 20

# Draw handler
def draw(canvas):
    canvas.draw_circle([WIDTH // 2, HEIGHT // 2], ball_radius, 1,
                       "White", "White")


# Event handlers for buttons
def increase_radius():
    global ball_radius 
    max_acceptable_height = (HEIGHT // 2) - 5
    # Case dont grow of screen 
    if ball_radius < max_acceptable_height:
        ball_radius =  ball_radius + RADIUS_INCREMENT
    print ball_radius
    

def decrease_radius():
    global ball_radius 
    # Case dont shrink of screen 
    if ball_radius > 5:
        print "enters"
        ball_radius =  ball_radius - RADIUS_INCREMENT

# Create frame and assign callbacks to event handlers
frame = simplegui.create_frame("Ball control", WIDTH, HEIGHT)
frame.set_draw_handler(draw)
frame.add_button("Increase radius", increase_radius)
frame.add_button("Decrease radius", decrease_radius)


# Start the frame animation
frame.start()

