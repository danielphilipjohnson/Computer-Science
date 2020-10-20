"""
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
