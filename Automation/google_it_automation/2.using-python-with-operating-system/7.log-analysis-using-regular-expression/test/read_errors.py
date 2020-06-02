import unittest
import sys
sys.path.append('../')
from ticky_parser import ticky_check

class TestRetrieveInfo(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.ticky_check = ticky_check.TickyCheck()

    def test_open_with_empty_input(self):
        self.assertEqual(self.ticky_check._parse_errors_from_log(""), "Couldn't locate file")
    
    def test_open_with_logfile(self):
        expected_value = {'The ticket was modified while updating': 9, 'Permission denied while closing ticket': 10, 'Tried to add information to closed ticket': 12, 'Timeout while retrieving information': 15, "Ticket doesn't exist": 7, 'Connection to DB failed': 13}
        self.assertEqual(self.ticky_check._parse_errors_from_log("../syslog.log"), expected_value)
    
    def test_sort_errors(self):
        
        error_input = {'The ticket was modified while updating': 9, 'Permission denied while closing ticket': 10, 'Tried to add information to closed ticket': 12, 'Timeout while retrieving information': 15, "Ticket doesn't exist": 7, 'Connection to DB failed': 13}
        expected_value = [('Error', 'Count'), ('Timeout while retrieving information', 15), ('Connection to DB failed', 13), ('Tried to add information to closed ticket', 12), ('Permission denied while closing ticket', 10), ('The ticket was modified while updating', 9), ("Ticket doesn't exist", 7)]
        self.assertEqual(self.ticky_check._sort_errors(error_input), expected_value)
