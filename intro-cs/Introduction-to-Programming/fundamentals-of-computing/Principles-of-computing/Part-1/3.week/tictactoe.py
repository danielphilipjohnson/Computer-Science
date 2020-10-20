"""
Monte Carlo Tic-Tac-Toe Player
"""
import random
import poc_ttt_gui
import poc_ttt_provided as provided
import poc_simpletest

# Constants for Monte Carlo simulator
# You may change the values of these constants as desired, but
#  do not change their names.
NTRIALS = 1000         # Number of trials to run
SCORE_CURRENT = 1.0 # Score for squares played by the current player
SCORE_OTHER = 1.0   # Score for squares played by the other player
    
def mc_move(board,player,trials):
    """
    
    This function takes a current board,
    which player the machine player is,
    and the number of trials to run.
    The function should use the Monte Carlo simulation
    to return a move for the machine player in the form
    of a (row, column) tuple
    
    """
    
    score_board = [[0 for x in range(board.get_dim())] for y in range(board.get_dim())]
    for trial in range(trials):
        
               
        #takes a current board,
        current_board = board.clone()
        
        # runs a trial
        mc_trial(current_board, player)
        mc_update_scores(score_board, current_board, player)
        
        
    return get_best_move(board,score_board)
        
def mc_trial(board,player):
    """
    
    This function takes a current board and the
    next player to move. The function plays a
    game starting with the given player by
    making random moves, alternating between players.
    The function returns when the game is over.
    The modified board contains the state of the
    game, so the function does not return anything.
    In other words, the function should modify the
    board input.
    
    """
    
    while board.check_win() == None:
        
        empty_squares = board.get_empty_squares()
        
        r = random.randrange(len(empty_squares))
        row = empty_squares[r][0]
        col = empty_squares[r][1]

        board.move(row, col, player)

def find_max_value_locations(empty_squares, scores):
    """
    Iterates over the empty squares and compares the score of
    that square. if the score of the empty square
    is the highest it's location is appended to the array,
    and then returned
    
    """
    
    # returns array of tuple locations (row,col)
    max_value = 0
    
    max_value_location = []
    
    current_value = 0
    
    for square in empty_squares:
        current_value = scores[square[0]][square[1]]
        
        if current_value > max_value:
            
            max_value = current_value
            
            max_value_location = []
            
            max_value_location.append((square[0],square[1]))
            
        elif current_value == max_value:
            
            max_value_location.append((square[0], square[1]))
            
    return max_value_location

def get_random_move(locations):
    """
    Given an array of a locations of tuples (row, col)
    e.g [(0,1),(0,2)]
    select one at random and return it
    """
    max_value_location_idx = random.randrange(len(locations))
    
    return locations[max_value_location_idx]

def get_best_move(board,scores):
    """
    
    Gets the best possible move to play on the board
    
    """
    empty_squares = board.get_empty_squares()
    if len(empty_squares)  > 0:
        return get_random_move(find_max_value_locations(empty_squares, scores))
    
    return
    

def mc_update_scores(scores,board,player):
 """
    
    This function takes a grid of scores (a list of lists)
    with the same dimensions as the Tic-Tac-Toe board,
    a board from a completed game,
    and which player the machine player is.
    The function scores the completed board and
    update the scores grid.
    As the function updates the scores grid directly,
    it does not return anything.
    
    """
    state_of_game = board.check_win()
    match_score = 0
    other_score = 0
    
    # then all squares should receive a score of 0 for draw, 
    if state_of_game== None or state_of_game == provided.DRAW:
        return
    # Won
    # each square that matches the current player
    # should get a positive score SCORE_CURRENT
    # each square that matches the other player
    # should get a negative score  -SCORE_OTHER
    
    if state_of_game  == player:
        match_score = SCORE_CURRENT
        other_score = -1 * SCORE_OTHER
    # Lost
    # each square that matches the current player
    # should get a negative score - SCORE_CURRENT
    # each square that matches the other player
    # should get a positive score SCORE_OTHER).
    else:
        
        match_score = -1 * SCORE_CURRENT
        other_score =  SCORE_OTHER
    
 
    for row in range(board.get_dim()):
        for col in range(board.get_dim()):
 
            board_value = board.square(row, col)
        
            if board_value == provided.EMPTY:
                pass
            
            elif board_value == player:
                
                scores[row][col]  += match_score
    
            else:
            
                scores[row][col]  += other_score
    return scores
    
"""    
def run_suite_max_locations(find_max_value_locations):
 
    suite = poc_simpletest.TestSuite()
    
    # all tic tac toe board is empty
    empty_squares = [(0, 0), (0, 1), (0, 2), (1, 0), (1, 1), (1, 2), (2, 0), (2, 1), (2, 2)]
    scores_all_zeroes = [[0,0,0],[0,0,0],[0,0,0]]
    scores_all_zeroes_expected = [(0, 0), (0, 1), (0, 2), (1, 0), (1, 1), (1, 2), (2, 0), (2, 1), (2, 2)]
    
    scores_max_beginning = [[7,0,0],[0,0,0],[0,0,0]]
    scores_max_beginning_expected = [(0,0)]
    scores_max_end = [[0,0,0],[0,0,0],[0,0,7],]
    scores_max_end_expected = [(2,2)]
    
    scores_max_increments = [[0,1,2],[3,4,5],[6,7,8]]
    scores_max_increments_expected = [(2,2)]
    
    scores_max_decrements = [[8,7,6],[5,4,3],[2,1,0]]
    scores_max_decrements_expected = [(0,0)]
    scores_max_multiple_matches_asc = [[1,1,2],[2,3,3],[5,5,5]]
    scores_max_multiple_matches_asc_expected = [(2, 0), (2, 1), (2, 2)]
    scores_max_multiple_matches_des = [[5,5,5],[2,3,3],[1,1,2]]
    scores_max_multiple_matches_des_expected = [(0, 0), (0, 1), (0, 2)]
    
    # test max value when board is all 0's
    suite.run_test(find_max_value_locations(empty_squares, scores_all_zeroes),
                   scores_all_zeroes_expected, "Test should return all squares")
                   
    suite.run_test(find_max_value_locations(empty_squares, scores_max_beginning),
                   scores_max_beginning_expected, "Test should [(0,0)]")
    
    suite.run_test(find_max_value_locations(empty_squares, scores_max_end),
                   scores_max_end_expected, "Test should return [(2,2)]")
    
    suite.run_test(find_max_value_locations(empty_squares, scores_max_increments),
                   scores_max_increments_expected, "Test should return[(2,2)]")

    suite.run_test(find_max_value_locations(empty_squares, scores_max_decrements),
                   scores_max_decrements_expected, "Test should return[(0,0)]")
                   
    suite.run_test(find_max_value_locations(empty_squares, scores_max_multiple_matches_asc),
                   scores_max_multiple_matches_asc_expected, "Test should return [(2, 0), (2, 1), (2, 2)]")
                   
    suite.run_test(find_max_value_locations(empty_squares, scores_max_multiple_matches_des),
                   scores_max_multiple_matches_des_expected, "Test should return[(0, 0), (0, 1), (0, 2)]")               
    
    suite.report_results()
run_suite_max_locations(find_max_value_locations)
"""


# Test game with the console or the GUI.  Uncomment whichever
# you prefer.  Both should be commented out when you submit
# for testing to save time.
#provided.play_game(mc_move, NTRIALS, False)        
#poc_ttt_gui.run_gui(3, provided.PLAYERX, mc_move, NTRIALS, False)

