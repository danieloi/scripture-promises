import openai
import json

# Set your OpenAI API key here
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv('OPENAI_API_KEY')

def spell_check(text):
    try:
        response = openai.Completion.create(
          engine="text-davinci-003",
          prompt=f"Correct the spelling and grammar:\n\n{text}",
          temperature=0,
          top_p=1.0,
          frequency_penalty=0.0,
          presence_penalty=0.0
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
    for item in data[:50]:
        corrected_quote = spell_check(item['quote'])
        corrected_reference = spell_check(item['reference'])
        
        # Update the item with corrected text
        item['quote'] = corrected_quote
        item['reference'] = corrected_reference
        print(f"Corrected: {corrected_quote} - {corrected_reference}")

    # Save the corrected data back to the file (or a new file)
    with open('output_corrected.json', 'w') as file:
        json.dump(data, file, indent=4)

if __name__ == "__main__":
    main()