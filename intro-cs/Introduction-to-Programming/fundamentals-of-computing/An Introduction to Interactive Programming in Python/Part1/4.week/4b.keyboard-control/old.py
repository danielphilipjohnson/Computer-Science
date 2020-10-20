# Space bar status
"""
import simplegui

message = "Space bar up"
val = 5
# Handlers for keydown and keyup
def keydown(key):
    global val
    if key == simplegui.KEY_MAP['space']:
        #message = "Space bar down"
        val =  val * 2
        #print val
        # add code here


def keyup(key):
    global val
    if key == simplegui.KEY_MAP['space']:
        message = "Space bar up"
        val= val - 3
        print val
        # add code here

    # add code here 


# Handler to draw on canvas
def draw(canvas):
    canvas.draw_text(message, [25, 112], 42, "Red")

# Create a frame and assign callbacks to event handlers
frame = simplegui.create_frame("Home", 300, 200)
frame.set_keydown_handler(keydown)
frame.set_keyup_handler(keyup)
frame.set_draw_handler(draw)

# Start the frame animation
frame.start()
"""

"""
a = [49, 27, 101, -10]
b = a
c = list(a)
d = c

a[3] = 68
c[2] = a[1]
b = a[1 : 3]
b[1] = c[2]
print(b)
"""


x = list(range(5))

y[-3] = 10
x = y
print(y)
print(x)
