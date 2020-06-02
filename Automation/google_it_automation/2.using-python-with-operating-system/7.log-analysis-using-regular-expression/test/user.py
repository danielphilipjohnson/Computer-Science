import unittest
import sys
sys.path.append('../')
from ticky_parser import ticky_check

class TestRetrieveInfo(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.ticky_check = ticky_check.TickyCheck()


    def test_get_user_from_info_log(self):
        """  
            Test that ticky_check._get_username_from_log() 
            returns None when there is no match
            INPUT: Jan 31 00:16:25 ubuntu.local ticky: INFO Closed ticket [01754] (noel)
            Expected OUTPUT: 
                noel   
        """

        info_input = "Jan 31 00:16:25 ubuntu.local ticky: INFO Closed ticket [01754] (noel)"
        
        expected_value = "noel"

        self.assertEqual(
            self.ticky_check._get_username_from_log(info_input), 
            expected_value)

    def test_get_user_from_error_log(self):
        """  
            Test that ticky_check._get_username_from_log() 
            returns None when there is no match
            INPUT: Jan 31 01:33:12 ubuntu.local ticky: ERROR Tried to add information to closed ticket (mcintosh)
            Expected OUTPUT: 
                mcintosh   
        """

        info_input = "Jan 31 01:33:12 ubuntu.local ticky: ERROR Tried to add information to closed ticket (mcintosh)"
        
        expected_value = "mcintosh"

        self.assertEqual(
            self.ticky_check._get_username_from_log(info_input), 
            expected_value)

    def test_get_user_from_log_with_no_match(self):
        """  
            Test that ticky_check._get_info_from_log() 
            returns None when there is no match
            INPUT: Jan 31 01:33:12 ubuntu.local ticky: ERROR Tried to add information to closed ticket
            Expected OUTPUT: 
                None   
        """
       
        error_input = "Jan 31 01:33:12 ubuntu.local ticky: ERROR Tried to add information to closed ticket noel"

        expected_value = None

        self.assertEqual(
            self.ticky_check._get_username_from_log(error_input), 
            expected_value)
            

    def test_get_user_from_log_with_empty_string(self):
        """  
            Test that ticky_check._get_info_from_log() 
            should returns None when given empty input
            INPUT: ""
            Expected OUTPUT: 
                None   
        """
        
        """ ticky_check.get_error_from_log() should return None with empty input """
        empty_input = ""
        expected_value = None
        self.assertEqual(
            self.ticky_check._get_username_from_log(empty_input),             
            expected_value
        )

    
    @classmethod
    def tearDownClass(cls):
         cls.ticky_check = None
