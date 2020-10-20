"""
Clone of 2048 game.
"""
import poc_2048_gui
#import poc_simpletest
import random
# Directions, DO NOT MODIFY
UP = 1
DOWN = 2
LEFT = 3
RIGHT = 4
# Offsets for computing tile indices in each direction.
# DO NOT MODIFY this dictionary.
OFFSETS = {UP: (1, 0),
           DOWN: (-1, 0),
           LEFT: (0, 1),
           RIGHT: (0, -1)}
DIRECTION_PATH = {
    UP:[[0,0],[0,1],[0,2],[0,3], [0,4]],
    DOWN:[[3,0],[3,1],[3,2],[3,3]],
    LEFT:[[0,0],[1,0],[2,0],[3,0]],
    RIGHT:[[0,3],[1,3],[2,3],[3,3]]}


def shift_zeros(line):
    """
    Function that shifts zeros to the end of the list.
    """
    # Start with a result list that contains the same number
    #of 00's as the length of the line argument.
    #zeros = [0 for idx in range(len(line))]
    zeros = [0 for idx in range(len(line))]
    zero_idx = 0
    
    #Iterate over the line input
    #looking for non-zero entries.
    for idx in range(len(line)):
        #For each non-zero entry,
        # put the value into the next available entry of
        # the result list (starting at position 0).
        if line[idx] != 0:
            zeros[zero_idx] = line[idx]
            zero_idx += 1
    return zeros
  
  
# need to change this better
def merge(line):
    """
    Helper function that merges a single row or column in 2048
    """
    zeros = shift_zeros(line)
 
        
    for idx in range(0,len(zeros)-1):
        if zeros[idx] == zeros[idx+1] and not zeros[idx] == 0:
       
            zeros[idx] *= 2
            zeros[idx+1] = 0
           
    return shift_zeros(zeros)


class TwentyFortyEight:
    """
    Class to run the game logic.
    """
    #board = []
    #empty_cells = []
    def __init__(self, grid_height, grid_width):
        self._grid_height = grid_height
        
        self._grid_width = grid_width
        
        self._generate_direction_path()
        
        self._board = []
        
        self.reset()
    
    def _generate_direction_path(self):
        """
            Sets up direction paths for up, down, left, right.
            
            {1: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]],
            2: [[3, 0], [3, 1], [3, 2], [3, 3], [3, 4]],
            3: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]],
            4: [[0, 4], [1, 4], [2, 4], [3, 4], [4, 4]]}
        """
        
        up_directions = []
        
        down_directions = []
        
        left_directions = []  
        
        right_directions = []
        
        right_counter =   self._grid_width-1
        for idx in range(self._grid_width):
            
            up_directions.append([0,idx])
            
            down_directions.append([self._grid_height-1, idx])
            
            left_directions.append([idx, 0])
            
            right_directions.append([idx, right_counter])
            
            
            
        DIRECTION_PATH[UP] = up_directions
        DIRECTION_PATH[DOWN] = down_directions
        DIRECTION_PATH[LEFT] = left_directions
        DIRECTION_PATH[RIGHT] = right_directions
    
    def reset(self):
        """
        Reset the game so the grid is empty except for two
        initial tiles.
        """
     
        
        self._board = []
        col = []
        
        
        for _idx in range(self._grid_height):
            for _jdx in range(self._grid_width):
                
                col.append(0)
                
            self._board.append(col)
            
            col = []
            
        self._empty_cells = self.get_empty_cells()
        
        self.new_tile()
        
        self.new_tile()
     
    def __str__(self):
        """
        Return a string representation of the grid for debugging.
        """
        output = ""
        
        for idx in range(self._grid_height):
            
  
            output +=  str(self._board[idx])
            output += "\n"
       
        return output
    def get_grid_height(self):
        """
        Get the height of the board.
        """
        return self._grid_height
    def get_grid_width(self):
        """
        Get the width of the board.
        """
        return self._grid_width
    
    def merge_values(self, board_values, row_idx, rows_to_move):
        """
        
        Takes the a row of board values.
        Then iterates rows to move and swaps the values with the merged values
                
        """
        merged_values = merge(board_values)
        for jdx in range(self._grid_height):
            self.set_tile(rows_to_move[row_idx][jdx][0],
                          rows_to_move[row_idx][jdx][1],
                          merged_values[jdx])
    
    
    def update_board_with_merged_values(self, rows_to_move, direction_to_apply_x):
        """
        Iterates over rows to move and merges the values and
        then updates the board
        """
        board_values = []
        if direction_to_apply_x ==0:
     
            for idx in range(self._grid_height):
                for jdx in range(self._grid_width):
                    
                    board_values.append(self.get_tile(rows_to_move[idx][jdx][0], rows_to_move[idx][jdx][1]))
        
                self.merge_values(board_values, idx, rows_to_move)
               
                board_values = []
        
        
        else:
            for idx in range(self._grid_width):
                for jdx in range(self._grid_height):
             
                    board_values.append(self.get_tile(rows_to_move[idx][jdx][0], rows_to_move[idx][jdx][1]))
               
                self.merge_values(board_values, idx, rows_to_move)
                board_values = []
             
    def get_rows_to_move(self, tiles_to_move,direction_to_apply_x, direction_to_apply_y):
        """
        Iterates over rows to move and merges the values and
        then updates the board
        // clean up
        """
        if direction_to_apply_x ==0:
            
            rows_to_move = []
            #print "tiles_to_move len", len(tiles_to_move)
            #print "tiles to move: ", tiles_to_move
            for jdx in range(self._grid_height):
                #print "jdx ", jdx
                cols_to_move = []
                x_counter  = tiles_to_move[jdx][0]
                y_counter = tiles_to_move[jdx][1]
                for _idx in range(self._grid_width):
                    cols_to_move.append([x_counter, y_counter])
                    x_counter += direction_to_apply_x
                    y_counter += direction_to_apply_y
                rows_to_move.append(cols_to_move)
                
            return rows_to_move
        else:
            rows_to_move = []
        
            for jdx in range(self._grid_width):
                cols_to_move = []
                x_counter  = tiles_to_move[jdx][0]
                y_counter = tiles_to_move[jdx][1]
 
                for _idx in range(self._grid_height):
                    cols_to_move.append([x_counter, y_counter])
                    x_counter += direction_to_apply_x
                    y_counter += direction_to_apply_y
                
                rows_to_move.append(cols_to_move)
                
            return rows_to_move
        
    def move(self, direction):
        """
        Move all tiles in the given direction and add
        a new tile if any tiles moved.
        goood
        """
        direction_to_apply = OFFSETS[direction]
        
        direction_to_apply_x = direction_to_apply[0]
        
        direction_to_apply_y = direction_to_apply[1]
     
        tiles_to_move = DIRECTION_PATH[direction]
        
        rows_to_move = self.get_rows_to_move(tiles_to_move, direction_to_apply_x, direction_to_apply_y)
      
        self.update_board_with_merged_values(rows_to_move, direction_to_apply_x)
        
        self.new_tile()
 
    
    def get_probablity_value(self, random_val):
        """
        
        Given a value between 1 - 9 return a tile value of 2
        else if the value is 10 return  a tile value 4
        
        """
        return 2 if random_val <= 9  else 4
             
    def get_empty_cells(self):
        """
        Looks for empty cells on the game board
        returns an array with locations as an array
        [[row, col], [row, col]]
        
        """
        self._empty_cells = []
        for row in range(self._grid_height):
            for col in range(self._grid_width):
                if self._board[row][col] == 0:
                    self._empty_cells.append([row, col])
                    
                    
    def remove_empty_cell(self, index):
        """
        Remove a cell from empty cells
        """
        del self._empty_cells[index]
        
        
    def new_tile(self):
        """
        Create a new tile in a randomly selected empty
        square.  The tile should be 2 90% of the time and
        4 10% of the time.
        """
        #
        self.get_empty_cells()
        
        generate_random_num = random.randint(1, 10)
        
        tile_val = self.get_probablity_value(generate_random_num)
          
        # if empty breaks prevent from empty being less than 0
        if len(self._empty_cells) > 0:
            
            empty_cell_index = random.randrange(0,len(self._empty_cells))
            empty_cell = self._empty_cells[empty_cell_index]
            
            empty_cell_x = empty_cell[0]
            
            empty_cell_y = empty_cell[1]
            # change board value
            self.set_tile(empty_cell_x, empty_cell_y, tile_val)
            
            # remove that item
            self.remove_empty_cell(empty_cell_index)
            
            #del self._empty_cells[empty_cell_index]
            
        # else none left game over
  
    def set_tile(self, row, col, value):
        """
        Set the tile at position row, col to have the given value.
        """
       
        self._board[row][col] = value
        
    def get_tile(self, row, col):
        """
        Return the value of the tile at position row, col.
        """
        return self._board[row][col]

poc_2048_gui.run_gui(TwentyFortyEight(4,4))


