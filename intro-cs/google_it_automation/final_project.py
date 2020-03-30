!pip install wordcloud
!pip install fileupload
!pip install ipywidgets
!jupyter nbextension install --py --user fileupload
!jupyter nbextension enable --py fileupload

import wordcloud
import numpy as np
from matplotlib import pyplot as plt
from IPython.display import display
import fileupload
import io
import sys




def calculate_frequencies(file_contents):
    # Here is a list of punctuations and uninteresting words you can use to process your text
    punctuations = '''!()-[]{};:'"\,<>./?@#$%^&*_~'''
    uninteresting_words = ["the", "a", "in", "for","to", "if", "is", "it", "of", "and", "or", "an", "as", "i", "me", "my", \
    "we", "our", "ours", "you", "your", "yours", "he", "she", "him", "his", "her", "hers", "its", "they", "them", \
    "their", "what", "which", "who", "whom", "this", "that", "am", "are", "was", "were", "be", "been", "being", \
    "have", "has", "had", "do", "does", "did", "but", "at", "by", "with", "from", "here", "when", "where", "how", \
    "all", "any", "both", "each", "few", "more", "some", "such", "no", "nor", "too", "very", "can", "will", "just"]
    
    # LEARNER CODE START HERE

    words = {} 
    for line in file_contents.split(" "):
        lowered = line.lower()
        if lowered.isalpha():
            if lowered not in punctuations and lowered not in uninteresting_words:
                if lowered not in words:
                    words[lowered] = 1
                else:
                    words[lowered] += 1

    #return words
    #wordcloud
    cloud = wordcloud.WordCloud()
    cloud.generate_from_frequencies(words)
    return cloud.to_array()



# Display your wordcloud image

myimage = calculate_frequencies(file_contents)
#print(myimage)
plt.imshow(myimage, interpolation = 'nearest')
plt.axis('off')
plt.show()