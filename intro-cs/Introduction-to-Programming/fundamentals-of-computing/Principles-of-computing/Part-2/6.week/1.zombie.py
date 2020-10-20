"""
Student portion of Zombie Apocalypse mini-project
"""
import random
import poc_grid
import poc_queue
import poc_zombie_gui

# global constants
EMPTY = 0
FULL = 1
FOUR_WAY = 0
EIGHT_WAY = 1
OBSTACLE = 5
HUMAN = 6
ZOMBIE = 7

class Apocalypse(poc_grid.Grid):
    """
    Class for simulating zombie pursuit of human on grid with
    obstacles
    """
    def __init__(self, grid_height, grid_width, obstacle_list = None,
                 zombie_list = None, human_list = None):
        """
        Create a simulation of given size with given obstacles,
        humans, and zombies
        """
        poc_grid.Grid.__init__(self, grid_height, grid_width)
        if obstacle_list != None:
            for cell in obstacle_list:
                self.set_full(cell[0], cell[1])
        if zombie_list != None:
            self._zombie_list = list(zombie_list)
        else:
            self._zombie_list = []
        if human_list != None:
            self._human_list = list(human_list) 
        else:
            self._human_list = []
        
    def clear(self):
        """
        Set cells in obstacle grid to be empty
        Reset zombie and human lists to be empty
        """
        poc_grid.Grid.clear(self)
        self._zombie_list = []
        self._human_list = []
        # need proof it works
        
    def add_zombie(self, row, col):
        """
        Add zombie to the zombie list
        """
        self._zombie_list.append((row,col))
       
                
    def num_zombies(self):
        """
        Return number of zombies
        """
        return len(self._zombie_list) 
          
    def zombies(self):
        """
        Generator that yields the zombies in the order they were
        added.
        """
        return (zombie for zombie in self._zombie_list)
    def add_human(self, row, col):
        """
        Add human to the human list
        """
        self._human_list.append((row,col))
        
    def num_humans(self):
        """
        Return number of humans
        """
        return len(self._human_list) 
    
    def humans(self):
        """
        Generator that yields the humans in the order they were added.
        """
        # replace with an actual generator
        return (human for human in self._human_list)
        
    def compute_distance_field(self, entity_type):
        """
        Function computes and returns a 2D distance field
        Distance at member of entity_list is zero
        Shortest paths avoid obstacles and use four-way distances
        """
        GRID_HEIGHT =  poc_grid.Grid.get_grid_height(self)
        GRID_WIDTH =  poc_grid.Grid.get_grid_width(self)
        
        visited = poc_grid.Grid(self.get_grid_height(), self.get_grid_width())
        for row in range(self.get_grid_height()):
            for col in range(self.get_grid_width()):
                if not self.is_empty(row, col):
                    visited.set_full(row, col)
        
        
        distance_field = [[ GRID_HEIGHT * GRID_WIDTH \
                           for dummy_col in range(GRID_WIDTH)] \
                                for dummy_row in range(GRID_HEIGHT)]
        
        boundary = poc_queue.Queue()
        entity_cells = []
        if entity_type == ZOMBIE:
            entity_cells = self._zombie_list
            
        else:
            entity_cells = self._human_list
        
        for entity_cell in entity_cells:
            
            row = entity_cell[0]
            col = entity_cell[1]
            #  For cells in the queue, initialize visited to be FULL
            visited.set_full(row, col)
            #and distance_field to be zero.
            distance_field[row][col] = 0
            #Create a queue boundary that is a copy of either the zombie list or the human list.
            boundary.enqueue(entity_cell)
        
        # a modified version of the BFS
        while len(boundary) > 0:
            #current_cell  ←  dequeue boundary
            current_cell = boundary.dequeue()
            
            # 4 neighbors
            neighbors = poc_grid.Grid.four_neighbors(self,current_cell[0], current_cell[1])
            distance = distance_field[current_cell[0]][current_cell[1]] + 1
       
            #for all neighbors neighbor_cell of current_cell:
            for neighbor in neighbors:
                # if neighbor_cell is not in visited:
                if visited.is_empty(neighbor[0], neighbor[1]):
                    #  add neighbor_cell to visited
                    if distance < distance_field[neighbor[0]][neighbor[1]]:
                        distance_field[neighbor[0]][neighbor[1]] = distance
                    visited.set_full(neighbor[0], neighbor[1])
                    #  enqueue neighbor_cell onto boundary
                    boundary.enqueue(neighbor)
                        
        return distance_field
    
    def move(self, distance_field,entity_list, neighbourfunc, operator):
        #print operator
        index = 0
        for entity_cell in entity_list:
            # current safe cell
            safest_cell = entity_cell
            
            # current position of entity
            nearest_distance = distance_field[
                entity_cell[0]][
                entity_cell[1]]
                       
            # fetch possible moves
            neighbors = neighbourfunc(entity_cell[0], entity_cell[1])
            
            for neighbor in neighbors:
                # if nothing is in the cell human can move
                if not poc_grid.Grid.is_empty(self, neighbor[0], neighbor[1]):
                    continue
                # get distance of neighbour possible move
                neighbour_distance = distance_field[neighbor[0]][neighbor[1]]
                # if distance is greater than safest
                # cant import operator.__lt__(current_safest_distance, neighbour_distance)
                if operator == "lt":
                    if neighbour_distance > nearest_distance:
                        safest_cell = neighbor
                        nearest_distance = neighbour_distance
                        
                elif operator == "gt":
                    if neighbour_distance < nearest_distance:
                        
                        
                        safest_cell = neighbor
                        nearest_distance = neighbour_distance
            entity_list[index] = safest_cell
            index += 1
        
    def move_humans(self, zombie_distance_field):
        """
        Function that moves humans away from zombies, diagonal moves
        are allowed
        """
        self.move(zombie_distance_field, self._human_list, self.eight_neighbors, "lt")
        
    
    def move_zombies(self, human_distance_field):
        """
        Function that moves zombies towards humans, no diagonal moves
        are allowed
        """
        self.move(human_distance_field, self._zombie_list, self.four_neighbors, "gt")
        
# Start up gui for simulation - You will need to write some code above
# before this will work without errors
#poc_zombie_gui.run_gui(Apocalypse(30, 40))
poc_zombie_gui.run_gui(Apocalypse(20, 20))

