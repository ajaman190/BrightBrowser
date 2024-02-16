# !pip install --upgrade openai
from openai import OpenAI
import os

client = OpenAI(api_key="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")
# client = OpenAI(api_key=os.getenv("OPENAI_KEY"))

def generate_solution_for_dark_pattern(input_data):

    try:
        if not isinstance(input_data, dict):
            return "Invalid input: Input data must be a dictionary."

        prompt = (f"Given the detected dark pattern described below, please provide a practical and actionable solution to help users identify and avoid being misled by this pattern. The solution should be understandable by general audiences and applicable for immediate use.\n\n"
                  f"Detected Dark Pattern Type: {input_data['dark_pattern']}\n"
                  f"Context (Where it was found): {input_data['text']}\n\n")

                #   f"Specific Example (Sub-Dark Pattern): {input_data['sub_dark_pattern']}\n"

        response = client.completions.create(
          model = 'gpt-3.5-turbo-instruct',
          prompt=prompt,
          temperature=0.5,
          max_tokens=60,
          top_p=1.0,
          frequency_penalty=0.0,
          presence_penalty=0.0
        )
        solution = response.choices[0].text.strip()
        return solution

    except Exception as e:
        return f"An unexpected error occurred: {e}"
