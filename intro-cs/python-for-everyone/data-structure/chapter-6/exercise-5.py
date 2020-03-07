str = 'X-DSPAM-Confidence:0.8475'
colon_loc = str.find(":")
extracted_str = str[colon_loc+1:]
convert_float = float(extracted_str)
print(convert_float)