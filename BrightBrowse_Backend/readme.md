#### BrightBrowse Backend

#### Table of Contents

- [Repository Overview](#repository-overview)
- [Technology Stack](#technology-stack)
- [Dark Pattern Detection Models](#dark-pattern-detection-models)
- [System Architecture](#system-architecture)
- [Setup and Installation](#setup-and-installation)

---

#### Repository Overview

This repository contains the backend services and infrastructure for the **BrightBrowse** web extension, a tool designed to detect and mitigate dark patterns on e-commerce platforms. Our backend is built to handle user authentication, dark pattern detection, data storage, and provide educational content to our users.

---

#### Technology Stack

Our backend is built with a focus on reliability, scalability, and efficiency. Here's why we chose our specific technologies:

| Technology | Purpose                | Justification                                                                   |
| ---------- | ---------------------- | ------------------------------------------------------------------------------- |
| Django DRF | Web framework          | Robust, scalable, and ideal for rapid development with a clean design for APIs. |
| PostgreSQL | Database               | Offers advanced features, reliability, and a strong ecosystem.                  |
| Docker     | Containerization       | Ensures consistent environments and simplifies deployment.                      |
| XGBoost    | Machine Learning Model | Highly efficient and scalable for classification tasks.                         |
| RoBERTa    | NLP Model              | State-of-the-art performance for fake review detection.                         |

---

#### Dark Pattern Detection Models

We've implemented several models to identify and categorize dark patterns, including:

- **Deceptive UI Detection**: Logistic regression model trained on UI elements to detect misleading designs in e-commerce websites, encompassing urgency, scarcity, misdirection, social proof, and semi-dark patterns. Trained on a dataset of 2000+ data points across diverse product categories, the model utilizes Count Vectorization for text data transformation and undergoes hyperparameter tuning via GridSearchCV. After initialization and data preprocessing, including handling missing values, the model is trained and evaluated, with results showcasing optimized hyperparameters, accuracy, F1 score, and precision.
- **Fake Review Detection**: Fine-tuned RoBERTa model distinguishing genuine reviews from fake ones. The model is built upon RoBERTa, a robustly optimized BERT pretraining approach developed by Facebook AI. RoBERTa modifies key hyperparameters from the original BERT model, enhancing accuracy and performance. The model was trained on a carefully curated dataset obtained from the Open Science Framework (OSF). This dataset serves as a reliable source for diverse and authentic reviews, enabling the model to learn and distinguish between genuine and fake reviews effectively.
- **Malicious URL Detection**: XGBoost classifier to identify harmful URLs across categories such as benign, defacement, phishing, malware, and others. The model has been trained on a dataset of 651,191 URLs collected from various sources. The dataset has been curated from five different sources to ensure a diverse and comprehensive collection of URLs: ISCX-URL-2016: Used for collecting benign, phishing, malware, and defacement URLs. Malware Domain Black List Dataset: Employed to increase the number of phishing and malware URLs. Faizan's Git Repo: Utilized to augment the number of benign URLs. Phishtank Dataset and PhishStorm Dataset: Used to increase the count of phishing URLs further.
- **Price Manipulation Detection**: Algorithm analyzing price trends to flag potential manipulations. It reads JSON data containing dates and prices, converts them into a DataFrame, and then resamples the data over 1-month, 2-month, and 3-month intervals. The script employs statistical methods, calculating the mode for each time interval to pinpoint unusual pricing patterns that may signify potential price manipulation or anomalies. The expected data format is a JSON file with arrays of dates and corresponding prices. The script outputs charts illustrating price trends over different time intervals, enabling users to identify irregular patterns or spikes that could indicate suspicious activity in e-commerce pricing.
- **Basket Sneaking Detection**: We have implemented a way to detect basket sneaking patterns found in e-commerce platforms. We use YOLO(you only look once) model to segment the image to detect text boxes. Those text boxes are then used to extract text from them. We use a language model which takes in input the text and returns the price from that sentence. Once we have the list of all prices, we find the highest price and store it. This price can then be used to compare agains prices in the cart to find if any item has been added to the cart without users action.
- **Trick Question Detection**: We use a rule based technique to detect trick questions on ecommerce platforms. after stemming the text, we check for certain keywords and assign scores. we report the dark pattern if it has the highest score
- **Countdown Timer Detection**: The extension identifies countdown elements by comparing an element's current and previous text states using regular expressions to extract numbers and check if any numeric value has decreased over time, marking elements with decreasing numbers as countdowns.
- **Forced Continuity Detection**: The forced continuity detection mechanism is tailored exclusively for English content through a singular configuration within the patternConfig object. This configuration includes a dedicated detection function that leverages a series of English-specific regular expressions. These expressions are finely tuned to identify textual patterns that suggest forced continuity, such as recurring charges or price modifications following a trial period. Specifically, the detection function scrutinizes text for patterns like price mentions followed by a frequency (e.g., "$10 /month"), transition phrases leading to a stated price (e.g., "after that $10.99"), and prices after a defined duration (e.g., "6 months $60"). This process is executed during the traversal of the DOM tree, enabling the regexes to efficiently search through node text content for indications of forced continuity, thereby ensuring a focused and effective detection of this practice within English-language web content.

---

#### System Architecture

Our backend architecture is designed for high availability and resilience. It incorporates:

- **Microservices**: Modular and independently scalable services.
- **API Gateway**: Central access point for frontend services.
- **Security Layer**: Ensures data integrity and privacy.

(Include System Architecture Diagram Here)

---

#### Setup and Installation

1. **Environment Setup**:

   - Ensure Docker and Docker Compose are installed.
   - Clone the repository to your local machine.

2. **Running the Application**:
   ```bash
   docker-compose up --build
   ```
