import pandas as pd
import numpy as np
import math

data = pd.read_csv('./label_dataset.csv')

def clean_year(ah_year):
    if ah_year == '[Not provided]':
        return ah_year
    
    if '1091 (25' in ah_year:
        return str(ah_year[:4])
    
    year_string = ah_year.split(' ')
    if '-' in year_string[0]:
        return year_string[0][:4]
    if 'AH' in year_string:
        return year_string[0].replace('~', '')
    if 'CE' in year_string:
        return int(year_string[0].replace('~', ''))
    
def convert_year(year):
    if year=='[Not provided]' or isinstance(year, int):
        return year
    elif isinstance(year, str):
        
        ah = int(year)
        ce = ah - round(ah*0.3) + 622
        return str(ce)
       
    


if __name__=='__main__':

    data['DATE-CE'] = data['DATE'].apply(clean_year).apply(convert_year)
    data.to_csv('new_dataset.csv', index=False)