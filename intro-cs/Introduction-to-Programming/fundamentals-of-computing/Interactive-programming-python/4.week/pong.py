# Implementation of classic arcade game Pong

import simplegui
import random

# initialize globals - pos and vel encode vertical info for paddles
WIDTH = 600
HEIGHT = 400       
BALL_RADIUS = 20
PAD_WIDTH = 8
PAD_HEIGHT = 80
HALF_PAD_WIDTH = PAD_WIDTH / 2
HALF_PAD_HEIGHT = PAD_HEIGHT / 2
LEFT = False
RIGHT = True

ball_pos = [WIDTH / 2, HEIGHT / 2]
ball_vel = [2, -2]

#paddles
paddle1_pos = 0
paddle2_pos = 0
paddle1_vel = 0
paddle2_vel = 0


score1 = 0
score2 = 0

successful_hits = 0
# initialize ball_pos and ball_vel for new bal in middle of table
# if direction is RIGHT, the ball's velocity is upper right, else upper left
def spawn_ball(direction):
    global ball_pos, ball_vel # these are vectors stored as lists
    
    x = (random.randrange(120, 240)) / 60
    y = (random.randrange(60, 180)) / 60
    
    ball_pos = [WIDTH / 2, HEIGHT / 2]
    
    if direction is RIGHT:
        ball_vel = [x, -y]
        
    elif direction is LEFT:
        ball_vel = [-x, -y]

def draw_paddle(canvas, point_list):
    canvas.draw_polygon(point_list,1, 'Green', 'White')
    
def bound_paddle_to_screen():
    global score1, score2, paddle1_pos, paddle2_pos, ball_pos, ball_vel
    if 200 - HALF_PAD_HEIGHT >= paddle1_pos + paddle1_vel >= -200 + HALF_PAD_HEIGHT:
        paddle1_pos += paddle1_vel
    
    if 200 - HALF_PAD_HEIGHT >= paddle2_pos + paddle2_vel >= -200 + HALF_PAD_HEIGHT:
        paddle2_pos += paddle2_vel
    

def check_celling_colision():
    if ball_pos[1] <= BALL_RADIUS: 
        ball_vel[1] = -ball_vel[1]
        
    elif ball_pos[1] >= HEIGHT - BALL_RADIUS: 
        ball_vel[1] = -ball_vel[1]  

        
def success_full_hits():
    global successful_hits
    
    if successful_hits >= 1:
        
        return True
    
    return False
    
        
def check_paddle_colision():
    global score1, score2, successful_hits, ball_vel
        
    if ball_pos[0] <= (BALL_RADIUS + PAD_WIDTH) and (
        ((paddle1_pos - HALF_PAD_HEIGHT) <= (ball_pos[1] - 200) <= (paddle1_pos + HALF_PAD_HEIGHT))):
        ball_vel[0] = -(float(ball_vel[0]) + (float(ball_vel[0]) * 0.10))
        
        successful_hits += 1
        
        if success_full_hits():
            
            ball_vel[0] *= 1.1
            ball_vel[1] *= 1.1
            
    elif ball_pos[0] >= (WIDTH - (BALL_RADIUS + PAD_WIDTH)) and (
    ((paddle2_pos - HALF_PAD_HEIGHT) <= (ball_pos[1] - 200) <= (paddle2_pos + HALF_PAD_HEIGHT))):
        ball_vel[0] = -(float(ball_vel[0]) + (float(ball_vel[0]) * 0.10))
        successful_hits += 1
        
        if success_full_hits():

            ball_vel[0] *= 1.1
            ball_vel[1] *= 1.1
    else:
        
        check_if_scored()
    
    
        

def check_if_scored():
    global score1, score2,successful_hits
    if ball_pos[0] <= BALL_RADIUS + PAD_WIDTH:
        spawn_ball(RIGHT)
        successful_hits = 0
        score2 += 1
        
    elif ball_pos[0] >= WIDTH - (BALL_RADIUS + PAD_WIDTH):
        spawn_ball(LEFT)  
        successful_hits = 0
        score1 += 1
        
        
        
# define event handlers
def new_game():
    global paddle1_pos, paddle2_pos, paddle1_vel, paddle2_vel  # these are numbers
    global score1, score2  # these are ints
    
    score1, score2 = 0,0
    random_turn = random.randint(0,1)
    
    if random_turn == 0:
        spawn_ball(RIGHT)
        
    else:
        spawn_ball(LEFT)

def draw(canvas):
    global score1, score2, paddle1_pos, paddle2_pos, ball_pos, ball_vel
    
    PADDLE_ONE_POINT_LIST = [(0, ((((HEIGHT / 2) - HALF_PAD_HEIGHT)) + paddle1_pos)), 
                         (PAD_WIDTH,((((HEIGHT / 2) - HALF_PAD_HEIGHT)) + paddle1_pos)),
                         (PAD_WIDTH, ((((HEIGHT / 2) + HALF_PAD_HEIGHT)) + paddle1_pos)), 
                         (0,((((HEIGHT / 2) + HALF_PAD_HEIGHT)) + paddle1_pos))]
    
    PADDLE_TWO_POINT_LIST = [((WIDTH - PAD_WIDTH), 
                          ((((HEIGHT / 2) - HALF_PAD_HEIGHT)) + paddle2_pos)),
                         (WIDTH, ((((HEIGHT / 2) - HALF_PAD_HEIGHT)) + paddle2_pos)),
                         (WIDTH, ((((HEIGHT / 2) + HALF_PAD_HEIGHT)) + paddle2_pos)), 
                         ((WIDTH - PAD_WIDTH), ((((HEIGHT / 2) + HALF_PAD_HEIGHT)) + paddle2_pos))]
        
    # draw mid line and gutters
    canvas.draw_line([WIDTH / 2, 0],[WIDTH / 2, HEIGHT], 1, "White")
    canvas.draw_line([PAD_WIDTH, 0],[PAD_WIDTH, HEIGHT], 1, "White")
    canvas.draw_line([WIDTH - PAD_WIDTH, 0],[WIDTH - PAD_WIDTH, HEIGHT], 1, "White")
        
    # update paddle's vertical position, keep paddle on the screen
    # update ball
    bound_paddle_to_screen()
    check_celling_colision()
    
    # draw ball
    ball_pos[0] += ball_vel[0]
    ball_pos[1] += ball_vel[1]
    
    canvas.draw_circle(ball_pos, BALL_RADIUS, 10, "White", "White")
    
    # draw paddles
    draw_paddle(canvas, PADDLE_ONE_POINT_LIST)
    draw_paddle(canvas, PADDLE_TWO_POINT_LIST)

    # determine whether paddle and ball collide    
    check_paddle_colision()

    # draw scores
    canvas.draw_text(str(score1), (200, 73), 50, "White")
    canvas.draw_text(str(score2), (375, 73), 50, "White")
    
def keydown(key):
    global paddle1_vel, paddle2_vel, paddle1_pos, paddle2_pos
    
    if key == simplegui.KEY_MAP['w']: 
        paddle1_vel -= 5  
        
    elif key == simplegui.KEY_MAP['s']: 
        paddle1_vel += 5
        
    elif key == simplegui.KEY_MAP['up']: 
        paddle2_vel -= 5
        
    elif key == simplegui.KEY_MAP['down']: 
        paddle2_vel += 5

def keyup(key):
    global paddle1_vel, paddle2_vel
    if key == simplegui.KEY_MAP['w']: 
        paddle1_vel += 5
        
    elif key == simplegui.KEY_MAP['s']: 
        paddle1_vel -= 5
        
    elif key == simplegui.KEY_MAP['up']: 
        paddle2_vel += 5
        
    elif key == simplegui.KEY_MAP['down']: 
        paddle2_vel -= 5

# create frame
frame = simplegui.create_frame("Pong", WIDTH, HEIGHT)
frame.set_draw_handler(draw)
frame.set_keydown_handler(keydown)
frame.set_keyup_handler(keyup)
frame.add_button('Restart', new_game, 70)

# start frame
new_game()
frame.start()


# http://www.codeskulptor.org/#user47_xErraNFTJj_41.py