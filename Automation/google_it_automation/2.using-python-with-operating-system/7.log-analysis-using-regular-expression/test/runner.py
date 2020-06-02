# tests/runner.py
import unittest

# import your test modules
import info
import errors
import user
import read_errors

# initialize the test suite
loader = unittest.TestLoader()
suite  = unittest.TestSuite()

# add tests to the test suite
suite.addTests(loader.loadTestsFromModule(info))
suite.addTests(loader.loadTestsFromModule(errors))
suite.addTests(loader.loadTestsFromModule(user))
suite.addTests(loader.loadTestsFromModule(read_errors))

# initialize a runner, pass it your suite and run it
runner = unittest.TextTestRunner(verbosity=3)
result = runner.run(suite)
