#### BrightBrowse Extension

#### Table of Contents

1. [About the Repository](#about-the-repository)
2. [Technology Stack](#technology-stack)
3. [Wireframe Overview](#wireframe-overview)
4. [Setup and Installation](#setup-and-installation)

---

#### About the Repository

This repository is the contains the **BrightBrowse web extension** code.

---

#### Technology Stack

Our selection of technologies is purposefully aligned with our goals of ensuring security, enhancing usability, and maintaining cross-platform compatibility:

| Technology                    | Purpose                                     | Reason                                                                                                 |
| ----------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Figma**                     | Designing wireframes and prototypes         | For an intuitive and user-friendly interface that engages users effectively.                           |
| **Firefox WebExtensions API** | Cross-browser extension development         | Chosen for its wide compatibility and ease of integration, enabling broad user access.                 |
| **HTML/CSS/JavaScript**       | Development of UI components and core logic | Selected for their flexibility and comprehensive support, ensuring robust and dynamic functionalities. |

---

#### Wireframe Overview

The wireframes serve as a foundational blueprint for our extension's user interface, emphasizing ease of use and effective navigation through the following key screens:

- **Welcome & Onboarding**: Introduces users to the purpose and functionalities of the extension.
- **Settings Configuration**: Allows users to customize the extension according to their preferences.
- **Main Screen**: Displays detected dark patterns alongside descriptions and solutions.
- **Notification & Alerts**: Informs users about newly detected dark patterns and their implications.

![prototype](https://github.com/ajaman190/BrightBrowser/blob/master/BrightBrowse_Extension/media/wireframe.png)

---

#### Setup and Installation

**Prerequisites:**

- Firefox Browser
- Basic understanding of web technologies (HTML, CSS, JavaScript)
- Backend Docker container running (Refer to [Backend Repository](#))

**Installation Steps:**

1. **Clone the repository** to your local machine:

   ```bash
   git clone https://github.com/it_works_on_local/brightbrowse-extension.git
   ```

2. Navigate to the extension directory:

   ```bash
   cd brightbrowse-extension
   ```

3. Load the extension into Firefox:

- Open Firefox and navigate to `about:debugging`.
- Click "This Firefox" and then "Load Temporary Add-on".
- Select any file within the cloned extension directory.
