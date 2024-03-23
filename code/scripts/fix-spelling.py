from openai import OpenAI
import os
from dotenv import load_dotenv
import json

load_dotenv()

# Set your OpenAI API key here
client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))




def spell_check(text):
    try:
        response = client.completions.create(
        prompt=f"Correct the spelling and grammar in this bible verse {text}. Remove all leading or trailing '\n' characters in your output. Return just a string without quote marks. Do nothing if there's no error",
        model="gpt-3.5-turbo-instruct",
        temperature=0.1,
        max_tokens=3000,
        )
        return response.choices[0].text.strip()
    except Exception as e:
        print(f"Error during spell checking: {e}")
        return text
    
def spell_check_reference(text):
    try:
        response = client.completions.create(
        prompt=f"Correct the spacing/spelling if necessary: {text}. Return {text} if there's no error.",
        model="gpt-3.5-turbo-instruct",
        max_tokens=300,
        temperature=0.1,
        )
        return response.choices[0].text.strip()
    except Exception as e:
        print(f"Error during spell checking: {e}")
        return text

def main():
    # Load the JSON data
    with open('output.json', 'r') as file:
        data = json.load(file)

    # Iterate through each item and spell check the 'quote' and 'reference'
    for item in data[:25]:
        corrected_quote = spell_check(item['quote'])
        corrected_reference = spell_check_reference(item['reference'])
        
        # Update the item with corrected text
        item['quote'] = corrected_quote
        item['reference'] = corrected_reference
        print(f"Corrected: {corrected_quote} - {corrected_reference}")

    # Save the corrected data back to the file (or a new file)
    with open('output_corrected.json', 'w') as file:
        json.dump(data, file, ensure_ascii=False)

if __name__ == "__main__":
    main()