text = "X-DSPAM-Confidence:    0.8475"
colon_loc = text.find(":")
extracted_str = text[colon_loc+1:]
extracted_str.strip()
convert_float = float(extracted_str)
print(convert_float)