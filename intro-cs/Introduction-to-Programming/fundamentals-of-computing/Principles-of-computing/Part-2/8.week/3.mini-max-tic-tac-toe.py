"""
Mini-max Tic-Tac-Toe Player
"""
import poc_ttt_gui
import poc_ttt_provided as provided
# Set timeout, as mini-max can take a long time
import codeskulptor
codeskulptor.set_timeout(560)
# SCORING VALUES - DO NOT MODIFY
SCORES = {provided.PLAYERX: 1,
          provided.DRAW: 0,
          provided.PLAYERO: -1}
 
def mm_move(board, player):
    """
    Make a move on the board.
    
    Returns a tuple with two elements.  The first element is the score
    of the given board and the second element is the desired move as a
    tuple, (row, col).
    """
    best_score  = 0
             
    best_position = (-1,-1)
    
    possible_moves = board.get_empty_squares()
    
    for move in possible_moves:
        
        current_board_state = board.clone()
        
        row, col = move
        
        current_board_state.move(row, col, player)
        
        #print current_board_state
        
        result = current_board_state.check_win()
     
    
        if player == current_board_state.check_win():
            
            return SCORES[player], (row, col)
        
        elif provided.DRAW == current_board_state.check_win():
            
            return SCORES[provided.DRAW], (row, col)
        
        elif result == None:
            score, dummy_pos = mm_move(current_board_state, provided.switch_player(player))
            if player == provided.PLAYERX and (best_position == (-1, -1) or score >= best_score):
                best_score = score
                best_position = move
                #return best_score, best_position
            elif player == provided.PLAYERO and (best_position == (-1, -1) or score <= best_score):
                best_score = score
                best_position = move
                #return best_score, best_position
           
                
    return best_score, best_position
def move_wrapper(board, player, trials):
    """
    Wrapper to allow the use of the same infrastructure that was used
    for Monte Carlo Tic-Tac-Toe.
    """
    #board.move(0,0,provided.PLAYERO)
    #board.move(1,0,provided.PLAYERO)
    #board.move(2,1,provided.PLAYERO)
    
    #board.move(0,1,provided.PLAYERX)
    #board.move(1,1,provided.PLAYERX)
    #board.move(2,2,provided.PLAYERX)
    
    #board.move(0,0,provided.PLAYERX)
    #board.move(1,0,provided.PLAYERX)
    #board.move(1,1,provided.PLAYERX)
    #board.move(2,0,provided.PLAYERO)
    #board.move(0,2,provided.PLAYERO)
    #board.move(2,1,provided.PLAYERO)
    #print board
    
    
    move = mm_move(board, player)
    assert move[1] != (-1, -1), "returned illegal move (-1, -1)"
    return move[1]
# Test game with the console or the GUI.
# Uncomment whichever you prefer.
# Both should be commented out when you submit for
# testing to save time.
provided.play_game(move_wrapper, 1, False)        
poc_ttt_gui.run_gui(3, provided.PLAYERO, move_wrapper, 1, False)
