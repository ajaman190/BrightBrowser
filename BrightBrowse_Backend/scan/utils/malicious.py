import re
import numpy as np
import pickle
from urllib.parse import urlparse
from tld import get_tld

class URLFeatureExtractor:
    def __init__(self, model_path='xgb_classifier_model.pkl'):
        self.model_path = model_path
        self.model = self.load_model()

    def load_model(self):
        try:
            with open(self.model_path, 'rb') as file:
                model = pickle.load(file)
            return model
        except Exception as e:
            raise ValueError(f"Failed to load the model: {e}")

    @staticmethod
    def having_ip_address(url):
        pattern = re.compile(r'\b(?:\d{1,3}\.){3}\d{1,3}\b')
        return 1 if pattern.search(url) else 0

    @staticmethod
    def abnormal_url(url):
        try:
            hostname = urlparse(url).hostname
            return 1 if hostname is None else 0
        except:
            return 1

    @staticmethod
    def count_feature(url, feature):
        return url.count(feature)

    @staticmethod
    def url_length(url):
        return len(url)

    @staticmethod
    def fd_length(url):
        path = urlparse(url).path
        try:
            return len(path.split('/')[1])
        except IndexError:
            return 0

    @staticmethod
    def tld_length(url):
        try:
            top_level_domain = get_tld(url, as_object=True).fld
            return len(top_level_domain)
        except:
            return -1

    @staticmethod
    def hostname_length(url):
        try:
            return len(urlparse(url).netloc)
        except:
            return -1

    @staticmethod
    def suspicious_words(url):
        if re.search('(PayPal|login|signin|bank|account|update|free|lucky|service|bonus|ebayisapi|webscr)', url):
            return 1
        else:
            return 0

    @staticmethod
    def digit_count(url):
        return sum(c.isdigit() for c in url)

    @staticmethod
    def letter_count(url):
        return sum(c.isalpha() for c in url)

    @staticmethod
    def subdomain_count(url):
        try:
            subdomain = urlparse(url).netloc.split('.')
            return 1 if len(subdomain) > 2 else 0
        except:
            return 0

    @staticmethod
    def shortening_service(url):
        pattern = re.compile(
            r'(bit\.ly|goo\.gl|shorte\.st|go2l\.ink|x\.co|ow\.ly|t\.co|tinyurl|tr\.im|is\.gd|cli\.gs|'
            r'yfrog\.com|migre\.me|ff\.im|tiny\.cc|url4\.eu|twit\.ac|su\.pr|twurl\.nl|snipurl\.com|'
            r'short\.to|BudURL\.com|ping\.fm|post\.ly|Just\.as|bkite\.com|snipr\.com|fic\.kr|loopt\.us|'
            r'doiop\.com|short\.ie|kl\.am|wp\.me|rubyurl\.com|om\.ly|to\.ly|bit\.do|t\.co|lnkd\.in|'
            r'db\.tt|qr\.ae|adf\.ly|goo\.gl|bitly\.com|cur\.lv|tinyurl\.com|ow\.ly|bit\.ly|ity\.im|'
            r'q\.gs|is\.gd|po\.st|bc\.vc|twitthis\.com|u\.to|j\.mp|buzurl\.com|cutt\.us|u\.bb|yourls\.org|'
            r'x\.co|prettylinkpro\.com|scrnch\.me|filoops\.info|vzturl\.com|qr\.net|1url\.com|tweez\.me|v\.gd|'
            r'tr\.im|link\.zip\.net)', re.IGNORECASE)
        return 1 if pattern.search(url) else 0

    def get_features(self, url):
        features = [
            self.having_ip_address(url),
            self.abnormal_url(url),
            self.count_feature(url, '.'),
            self.count_feature(url, 'www'),
            self.count_feature(url, '@'),
            self.count_feature(url, '/'),
            self.count_feature(url, '//'),
            self.shortening_service(url),
            self.count_feature(url, 'https'),
            self.count_feature(url, 'http'),
            self.count_feature(url, '%'),
            self.count_feature(url, '?'),
            self.count_feature(url, '-'),
            self.count_feature(url, '='),
            self.url_length(url),
            self.hostname_length(url),
            self.fd_length(url),
            self.tld_length(url),
            self.suspicious_words(url),
            self.digit_count(url),
            self.letter_count(url)
        ]
        return np.array(features).reshape((1, -1))

    def malecious_url_check(self, test_url):
        features_test = self.get_features(test_url)
        try:
            pred = self.model.predict(features_test)
            return int(pred[0])*25
        except Exception as e:
            return f"Error in prediction: {e}"

# # Example usage
# if __name__ == "__main__":
#     extractor = URLFeatureExtractor()
#     urls = [
#         'https://www.youtube.com/watch?v=KZvVWnRUrkU',
#         "https://www.google.co.in/",
#         "https://cadbury.com@shrtner.cc/LEppVbfn/?cadbury-free-valentines-gift-set.html#"
#     ]
#     for url in urls:
#         print(f"URL: {url}, Prediction: {malecious_url_check(url)}")
