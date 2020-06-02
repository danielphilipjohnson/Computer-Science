#!/usr/bin/env python3

import shutil 
import os
traditional = [
    (1024 ** 5, 'P'),
    (1024 ** 4, 'T'), 
    (1024 ** 3, 'G'), 
    (1024 ** 2, 'M'), 
    (1024 ** 1, 'K'),
    (1024 ** 0, 'B'),
    ]

class DiskUsage:

    def __init__(self, disk):
        stat = shutil.disk_usage(disk)
        self.total = stat.total
        self.free = stat.free
        self.used = stat.used


    def _get_human_readable(self, size,precision=2):
        suffixes=['B','KB','MB','GB','TB']
        suffixIndex = 0
        while size > 1024 and suffixIndex < 4:
            suffixIndex += 1 #increment the index of the suffix
            size = size/1024.0 #apply the division
        return "%.*f%s"%(precision, size, suffixes[suffixIndex])
        
    def display_disk_usage(self):

        # Print disk usage statistics 
        print("Disk usage statistics \n") 
        print("Total Hard Drive capacity: {}".format(self._get_human_readable(self.total)))
        print("Used Space: {}".format(self._get_human_readable(self.used)))
        print("Available Space: {}".format(self._get_human_readable(self.free)))

    def display_percent_of_space_free(self):
        percentage = self.percent_of_space_free()

        print ("{:.6f}%".format(percentage))

    def display_percent_of_space_used(self):
        percentage = self.percent_of_space_used()

        print ("{:.6f}%".format(percentage))

    def display_disk_space_low(self):
        if self.is_disk_space_low():
            print("Space is running low")
        print("Everything is running okay!")

    def percent_of_space_used(self):
        percentage = (self.used / self.total) * 100

        return percentage


    def percent_of_space_free(self):

        percentage = self.free / self.total * 100
        return percentage

    def is_disk_space_low(self):
        if self.percent_of_space_free() < 20:
            return True
        return False

    


d = DiskUsage("/")
d.display_disk_usage()
d.display_percent_of_space_free()
d.display_percent_of_space_used()
d.display_disk_space_low()





 



#display_disk_usage("/")

#percent_of_space_used("/")
#display_percent_of_space_free("/")
#is_disk_space_low("/")