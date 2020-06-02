import re
import operator


class TickyCheck():
    def __init__(self, logfile):
        """
            Initialize two dictionaries one for the number of different error messages
            nother to count the number of entries for each user (splitting between INFO and ERROR).
        """
        # do i make a dependcy
        self.filename = logfile

        # make output directory??

    def _get_error_from_log(self, line):
        """ 
            Parses logline for errors
            Example.
            Input:
                  Jan 31 00:21:30 ubuntu.local ticky: ERROR The ticket was modified while updating (breee)"
            Output:
                   The ticket was modified while updating
            If no matches are found it returns none  
        """
        #m = re.search(r"ticky: ERROR ([\w* ]* [\w* \'? ]*)", line)

        error_reg_exp = r"ticky: ERROR ([\w* \'? \w*]*)"
        m = re.search(error_reg_exp, line)
        if m != None:
            cleaned = m.group(1).strip()
            return cleaned

    def _get_info_from_log(self, line):
        """
            Parses logline for INFO
            Example.
            Input:
                Jan 31 00:09:39 ubuntu.local ticky: INFO Created ticket [#4217] (mdouglas)
            Output
        """
        info_reg_exp = r"ticky: INFO ([\w ]* )"

        m = re.search(info_reg_exp, line)

        if m != None:
            cleaned = m.group(1).strip()
            return cleaned

    def _get_username_from_log(self, line):
        m = re.search(r"\((.*?)\)", line)
        if m != None:
            return m.group(1)


    def _parse_errors_from_log(self, log_filename):
        try:

            error_msg = {}

            with open(self.filename) as f:
                for line in f:
                    error = self._get_error_from_log(line.strip())

                    if error:
                        error_msg[error] = error_msg.get(
                            error, 0) + 1

            return error_msg

        except FileNotFoundError:
            print("Couldn't locate file")
            return "Couldn't locate file"

        except OSError as err:
            print("OS error: {0}".format(err))

    def _sort_errors(self, errors):

        sorted_errors = sorted(
            errors.items(),
            key=operator.itemgetter(1),
            reverse=True)

        sorted_errors.insert(0, ("Error", "Count"))
        return sorted_errors

    def _write_errors_to_csv(self, filename, sorted_errors):
        try:
            with open(filename, 'w') as err_csv:
                for error in sorted_errors:
                    msg, count = error
                    row = msg + ", " + str(count) + "\n"
                    err_csv.write(row)
        except OSError as err:
            print("OS error: {0}".format(err))

    def _parse_user_stats(self, log_filename):
        """ 

            The user usage statistics for the service: 
            A list of all users that have used the system, 
            including how many info messages and 
            how many error messages they've generated. 
            This report is sorted by username.  

        """
        users_statistics = {}
        with open(log_filename) as f:
            for line in f:
                error = self._get_error_from_log(line)
                info = self._get_info_from_log(line)
                user = self._get_username_from_log(line)

                if user:
                    # if user doesnt exist build template dictionary
                    if user not in users_statistics:

                        # Check if line is error or info
                        if error:
                            users_statistics[user] = {
                                "error": 1,
                                "info": 0
                            }

                        elif info:
                            users_statistics[user] = {
                                "error": 0,
                                "info": 1
                            }
                    # if user exists in dictionary
                    else:
                        if error:
                            users_statistics[user]["error"] += 1
                        if info:
                            users_statistics[user]["info"] += 1
            return users_statistics

    def _sort_users(self, users):
        sorted_users = sorted(users.items())
        return sorted_users

    def _write_to_user_statistics_csv(self, filename, sorted_users):
        with open(filename, 'w') as stats_csv:

            fieldnames = "Username, INFO, ERROR\n"

            stats_csv.write(fieldnames)

            for user in sorted_users:
                col1, col2_3 = user
                stats_csv.write(col1 + ", " +
                                str(col2_3["info"]) + ", " +
                                str(col2_3["error"])+"\n")

    def ranked_errors(self, log_filename):
        """
            1. parse errors from log
            2. sort errors
            3. write errors to csv
        """

        self._write_errors_to_csv(
            "errors.csv",
            self._sort_errors(
                self._parse_errors_from_log(log_filename)
            )
        )

    def user_usage_stats(self, log_filename):
        self._write_to_user_statistics_csv(
            "user_statistics.csv",
            self._sort_users(
                self._parse_user_stats(log_filename)
            )
        )

    def main(self):
        self.ranked_errors(self.filename)
        self.user_usage_stats(self.filename)



if __name__ == "__main__":
    tickylog = TickyCheck("syslog.log")
    tickylog.main()
    print("Completed")
