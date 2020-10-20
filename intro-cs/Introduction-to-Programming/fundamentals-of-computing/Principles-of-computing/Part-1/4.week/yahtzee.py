"""
Planner for Yahtzee
Simplifications:  only allow discard and roll, only score against upper level
"""
# Used to increase the timeout, if necessary
import codeskulptor
codeskulptor.set_timeout(20)
def gen_all_sequences(outcomes, length):
    """
    Iterative function that enumerates the set of all sequences of
    outcomes of given length.
    """
    
    answer_set = set([()])
    for dummy_idx in range(length):
        temp_set = set()
        for partial_sequence in answer_set:
            for item in outcomes:
                new_sequence = list(partial_sequence)
                new_sequence.append(item)
                temp_set.add(tuple(new_sequence))
        answer_set = temp_set
    return answer_set

def score(hand):
    """
    Compute the maximal score for a Yahtzee hand according to the
    upper section of the Yahtzee score card.
    hand: full yahtzee hand
    Returns an integer score
    """
    upper_score = {
        1:0,
        2:0,
        3:0,
        4:0,
        5:0,
        6:0
        }
    
    for h in hand:
        upper_score[h] += h
        
    return max(upper_score.values())

def expected_value(held_dice, num_die_sides, num_free_dice):
    """
    Compute the expected value based on held_dice given that there
    are num_free_dice to be rolled, each with num_die_sides.
    held_dice: dice that you will hold
    num_die_sides: number of sides on each die
    num_free_dice: number of dice to be rolled
    Returns a floating point expected value
    """
    scores = []
    
    die_sides =[x for x in range(1, num_die_sides+1)]
  
    possible_sequence = gen_all_sequences(die_sides, num_free_dice)
    
    for s in possible_sequence:
        scores.append(score(s+held_dice))
 
    return float(sum(scores)) / len(scores)

def gen_all_holds(hand):
    """
    Generate all possible choices of dice from hand to hold.
    hand: full yahtzee hand
    Returns a set of tuples, where each tuple is dice to hold
    """
    #print gen_all_sequences(hand, 6)
    answer_set = set([()])
    for die in hand:
        temp_set = set()
        for item in answer_set:
            new_sequence = list(item)
            new_sequence.append(die)
            temp_set.add(tuple(new_sequence))
        answer_set.update(temp_set)
    return answer_set


def strategy(hand, num_die_sides):
    """
    Compute the hold that maximizes the expected value when the
    discarded dice are rolled.
    hand: full yahtzee hand
    num_die_sides: number of sides on each die
    Returns a tuple where the first element is the expected score and
    the second element is a tuple of the dice to hold
    """
    best_score = float('-inf')
    current_score = (0.0, ())
     
    scores = []
    held_dices = gen_all_holds(hand)
    for held_dice in held_dices:
        #print(held_dice)
        curr_value = expected_value(held_dice, num_die_sides, len(hand) - len(held_dice))
        #print("hello")
        scores.append(best_score)
        if curr_value > best_score:
            best_score = curr_value
            current_score = (best_score, held_dice)
 
    print("scores", scores)
    print("best score", current_score)
    return current_score

def run_example():
    """
    Compute the dice to hold and expected score for an example hand
    """
    num_die_sides = 6
    hand = (1, 1, 1, 4, 6)
    hand_score, hold = strategy(hand, num_die_sides)
    print "Best strategy for hand", hand, "is to hold", hold, "with expected score", hand_score
    
    
run_example()

import poc_holds_testsuite
poc_holds_testsuite.run_suite(gen_all_holds)
                                       
    
    
    
