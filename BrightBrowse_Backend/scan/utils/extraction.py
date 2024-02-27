import requests
from bs4 import BeautifulSoup
import random

# List of user agents to rotate
USER_AGENTS = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1 Safari/605.1.15",
    "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; rv:11.0) like Gecko",
]

def extract_text_from_webpage(url):
    user_agent = random.choice(USER_AGENTS)
    headers = {
        'User-Agent': user_agent,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
    }
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, 'html.parser')
        texts = soup.stripped_strings
        content_array = [text for text in texts]
        return content_array, None
    except requests.RequestException as e:
        return [], str(e)
    except Exception as e:
        return [], str(e)

def extract_text_from_webpage_content(input_content):
    delimiter = "<bbext>"
    try:
        if not isinstance(input_content, str):
            return [], "Invalid input: Input content must be a string."
        split_contents = input_content.split(delimiter)
        return split_contents, None
    except Exception as e:
        return [], str(e)


def extract_function(url, content):
    web_texts, web_error = extract_text_from_webpage(url)
    content_texts, content_error = extract_text_from_webpage_content(content)

    # Combine and remove duplicates
    combined_texts = list(set(web_texts + content_texts))

    # Handle errors
    if web_error:
        raise ValueError(f"Webpage error: {web_error}")
    if content_error:
        raise ValueError(f"Content error: {content_error}")

    return combined_texts

