import os
import pickle
import re
import string
from nltk.stem import WordNetLemmatizer
import nltk

nltk.download('wordnet')

class DarkPatternDetector:
    def __init__(self):
        self.vectorizer = self._load_pickle('models/fitted_count_vectorizer.pkl')
        self.model = self._load_pickle('models/best_logistic_model.pkl')
        self.label_mapping = {
            0: "No Dark Pattern",
            1: "Urgency",
            2: "Scarcity",
            3: "Social Proof",
            4: "Misdirection",
            5: "Persuasive Pattern"
        }
        self.lemmatizer = WordNetLemmatizer()

    def _load_pickle(self, filepath):
        with open(filepath, 'rb') as file:
            return pickle.load(file)

    def _remove_punctuation(self, text):
        return "".join([c for c in text if c not in string.punctuation])

    def _lower_text(self, text):
        return text.lower()

    def _remove_emoji(self, text):
        emoji_pattern = re.compile("["
                                   "\U0001F600-\U0001F64F"  # emoticons
                                   "\U0001F300-\U0001F5FF"  # symbols & pictographs
                                   "\U0001F680-\U0001F6FF"  # transport & map symbols
                                   "\U0001F1E0-\U0001F1FF"  # flags (iOS)
                                   "\U00002702-\U000027B0"
                                   "\U000024C2-\U0001F251"
                                   "]+", flags=re.UNICODE)
        return emoji_pattern.sub(r"", text)

    def _convert_num_to_label(self, text):
        num_pattern = re.compile("[0-9]+")
        return num_pattern.sub(r"number", text)

    def _lemmatize_text(self, text):
        text = text.lower()
        return " ".join(self.lemmatizer.lemmatize(word) for word in text.split())

    def _preprocess_text_for_prediction(self, text):
        text = self._remove_punctuation(text)
        text = self._lower_text(text)
        text = self._remove_emoji(text)
        text = self._convert_num_to_label(text)
        text = self._lemmatize_text(text)
        return text

    def predict_label_for_text(self, text: str) -> dict:
        preprocessed_text = self._preprocess_text_for_prediction(text)
        text_transformed = self.vectorizer.transform([preprocessed_text])
        label_prediction = self.model.predict(text_transformed)
        return {
            'text': text,
            'dark_pattern': self.label_mapping[label_prediction[0]]
        }

detector = DarkPatternDetector()

def find_dark_patterns(extracted_texts):
    results = []
    for text in extracted_texts:
        try:
            result = detector.predict_label_for_text(text)
            if(result['dark_pattern'] != "No Dark Pattern"):
                results.append(result)
        except Exception as e:
            print(f"Error during pattern detection for text '{text}': {e}")
    return results
