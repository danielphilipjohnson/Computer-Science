   """
    def test_retrieve_info_from_log(self):
        info_input = "Jan 31 00:16:25 ubuntu.local ticky: INFO Closed ticket [01754] (noel)"
        
        expected_value = "ticky: INFO Closed ticket"
        #self.assertEqual(ticky_check.get_info_from_log(info_input), expected_value)
        #     
    def test_ranked_errors(self):
        d= {
            'ticky: ERROR The ticket was modified While updating': 1, 
            'ticky: ERROR Permission denied while Closing ticket': 1, 
            'ticky: ERROR Tried to add information to closed ticket': 3, 
            'ticky: ERROR Timeout while retrieving information': 1
            }
        
        expected_value = [
            ('ticky: ERROR Tried to add information to closed ticket', 3), 
            ('ticky: ERROR The ticket was modified While updating', 1), 
            ('ticky: ERROR Permission denied while Closing ticket', 1), 
            ('ticky: ERROR Timeout while retrieving information', 1)
            ]

        #self.assertEqual(ticky_check.ranked_errors(d), expected_value)
    """