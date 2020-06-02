import unittest
import rpsls
class TestRPSLS(unittest.TestCase):

    def setUp(self):
        self.names_to_test = ["rock", "Spock", "paper","lizard","scissors"]

    def tearDown(self):
        self.names_to_test = None

    def test_name_to_number(self):
        """
            rock  - 0 
            Spock - 1 
            paper - 2 
            lizard - 3 
            scissors  - 4
        """
        #names_to_test = ["rock", "Spock", "paper","lizard","scissors"]
        for i in range(len(self.names_to_test)):
            self.assertEqual(i, rpsls.name_to_number(self.names_to_test[i]))
    def test_number_to_name(self):
        for i in range(len(self.names_to_test)):
            name = self.names_to_test[i]
            self.assertEqual(name, rpsls.number_to_name(i))
   

if __name__ == '__main__':
    unittest.main()