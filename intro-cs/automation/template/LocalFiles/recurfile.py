import os


for root, dirs, files in os.walk('.'):
    for file in files:
        full_file_path = os.path.join(root, file)
        print(full_file_path)


# pdf


for root, dirs, files in os.walk('.'):
    for file in files:
        if file.endswith('.pdf'):
            full_file_path = os.path.join(root, file)
            print(full_file_path)


#  os.stat(('zen_of_python.txt')
