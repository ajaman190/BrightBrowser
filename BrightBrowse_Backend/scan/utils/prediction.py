import openai
import os
import json

openai.api_key = os.getenv("OPENAI_API_KEY")

def get_solutions(input_data, patterns):
    if not isinstance(input_data, list) or not all(isinstance(item, dict) for item in input_data):
        raise ValueError("Invalid input: Input data must be a list of dictionaries.")

    patterns_str = ""
    for pattern, sub_types in patterns.items():
        patterns_str += f"{pattern}: {', '.join(sub_types)}\n"

    prompt = ("For each item, identify the specific sub-type of dark pattern from the list based on the major dark pattern type and the text provided. "
              "Then, generate a short one liner, practical, easy to understand, and actionable solution that users(general public) can apply to identify and avoid being misled by this dark pattern and the dark pattern indicating text."
              "Return the responses as an array of objects, each containing the 'item', 'sub_dark_pattern', and 'solution'.\n\n"
              "List of Dark Patterns and their Sub-Types:\n" + patterns_str + "\n\nItems:\n")
    
    for i, item in enumerate(input_data, start=1):
        prompt += f"{i}. Major Dark Pattern Type: {item['dark_pattern']}, Text Indicating Dark Pattern: {item['text']}\n"
    
    prompt += '\nGenerate the response strictly in this format: [{"item": <item_number>, "sub_dark_pattern": <detected_sub_dark_pattern>, "solution": <solution>}, ...]'

    try:
        response = openai.completions.create(
            model=os.getenv("OPENAI_MODEL"),
            prompt=prompt,
            temperature=0.5,
            max_tokens=2048,
            top_p=1.0,
            frequency_penalty=0.0,
            presence_penalty=0.0
        )
        response = response.choices[0].text.strip()
        response_data = json.loads(response)

        results = []
        for item_response in response_data:
            item_index = item_response['item'] - 1
            results.append({
                "text": input_data[item_index]['text'],
                "dark_pattern": input_data[item_index]['dark_pattern'],
                "sub_dark_pattern": item_response['sub_dark_pattern'],
                "solution": item_response['solution']
            })

        return results
    except Exception as e:
        results = []
        for item in input_data:
            updated_item = item.copy()
            updated_item["sub_dark_pattern"] = ""
            updated_item["solution"] = ""
            results.append(updated_item)
        return results
        # raise RuntimeError(f"An unexpected error occurred: {e}")

