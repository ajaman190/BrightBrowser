from openai import OpenAI
import os
print("------")
print(os.environ.get("OPENAI_API_KEY"))
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

def get_solutions(input_data):
    results = []
    try:
        
        if not isinstance(input_data, list) or not all(isinstance(item, dict) for item in input_data):
            return "Invalid input: Input data must be a list of dictionaries."
        
        for item in input_data:
            prompt = (f"Based on the input provided, identify the sub-type of the dark pattern and generate a practical solution to help users recognize and avoid the negative effects of this specific dark pattern. The solution should be clear, actionable, and designed to empower users to make informed decisions in digital environments.\n\n"
                      f"Major Dark Pattern Type: {item['dark_pattern']}\n"
                      f"Identified Text Indicating Dark Pattern: {item['text']}\n\n"
                      f"Task:\n"
                      f"1. Identify the specific sub-type of dark pattern from the list based on the major type and the text provided.\n"
                      f"2. Generate a solution that users can apply to identify and avoid being misled by this dark pattern. The solution should be practical, easy to understand, and actionable for the general public.\n")

            
            response = client.completions.create(
                model='gpt-3.5-turbo-instruct',
                prompt=prompt,
                temperature=0.5,
                max_tokens=250,  
                top_p=1.0,
                frequency_penalty=0.0,
                presence_penalty=0.0
            )
            
            
            response_parts = response.choices[0].text.strip().split("\n")
            sub_dark_pattern = response_parts[0]  
            solution = "\n".join(response_parts[1:])  

            
            results.append({
                "text": item['text'],
                "dark_pattern": item['dark_pattern'],
                "sub_dark_pattern": sub_dark_pattern,
                "solution": solution
            })

    except Exception as e:
        return f"An unexpected error occurred: {e}"
    return results