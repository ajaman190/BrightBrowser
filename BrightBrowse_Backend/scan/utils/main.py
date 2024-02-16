from .extraction import extract_function
from .scan import find_dark_patterns
from .prediction import get_solutions

def main(url, severity, content, allowed_pattern):
    try:
        content_to_scan = '' if severity != 'high' else content
        extracted_texts = extract_function(url, content_to_scan)
        
        if not isinstance(extracted_texts, list):
            raise ValueError("Extraction did not return a valid list.")
        
        detected_patterns = find_dark_patterns(extracted_texts)
        
        allowed_patterns_list = allowed_pattern.split('|')
        filtered_detected_patterns = [pattern for pattern in detected_patterns if pattern['dark_pattern'] not in allowed_patterns_list]

        solutions = get_solutions(filtered_detected_patterns)

        return solutions
    except Exception as e:
        print(f"Error occurred in main: {e}")
        return []
