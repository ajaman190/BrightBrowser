document.addEventListener("DOMContentLoaded", function () {
	initializePage();
});

let dummyDataIndex = localStorage.getItem("count") || 0;
const dummyData = [
	{
		scan_id: "123",
		url: "https://www.amazon.in/Graphite-Badminton-Racquet-Tension-Aerodynamic/dp/B0CKNGB9NZ/ref=sr_1_1_sspa?qid=1707489524&refinements=p_n_pct-off-with-tax%3A2665401031&s=sports&sr=1-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGZfYnJvd3Nl&psc=1",
		severity: "low",
		results: [
			{
				index: "1",
				text: "In stock",
				dark_pattern: "Deceptive UI Dark Pattern",
				sub_dark_pattern: "Scarcity",
				solution: "Check the delivery details before ordering",
			},
			{
				index: "2",
				text: "Order within 21 hrs 4 mins",
				dark_pattern: "Deceptive UI Dark Pattern",
				sub_dark_pattern: "Urgency",
				solution: "See details of the offer before buying",
			},
			{
				index: "3",
				text: "Only 2 left in stock",
				dark_pattern: "Deceptive UI Dark Pattern",
				sub_dark_pattern: "Scarcity",
				solution: "Check similar products for better pricing",
			},
			{
				index: "4",
				text: "10K+ viewed in past month",
				dark_pattern: "Deceptive UI Dark Pattern",
				sub_dark_pattern: "Social proof",
				solution: "Check the product and ordering information in details",
			},
			{
				index: "5",
				text: "I thanks Amazon for launching this quality product",
				dark_pattern: "Fake Review",
				sub_dark_pattern: "Scarcity",
				solution: "Look for reviews with detail description",
			},
			{
				index: "6",
				text: "Good Better Best",
				dark_pattern: "Fake Review",
				sub_dark_pattern: "Misdirection",
				solution: "Look for reviews with detail description",
			},
			{
				index: "7",
				text: "Sponsored",
				dark_pattern: "Deceptive UI Dark Pattern",
				sub_dark_pattern: "Misdirection",
				solution: "Search for the same product in the e-commerce website",
			},
			{
				index: "8",
				text: "Sponsored",
				dark_pattern: "Deceptive UI Dark Pattern",
				sub_dark_pattern: "Misdirection",
				solution: "Search for the same product in the e-commerce website",
			},
			{
				index: "",
				text: "Sponsored",
				dark_pattern: "Deceptive UI Dark Pattern",
				sub_dark_pattern: "Misdirection",
				solution: "Search for the same product in the e-commerce website",
			},
		],
	},
	{
		scan_id: "456",
		url: "https://www.ebay.com/b/OMEGA-Watches/31387/bn_3000908",
		severity: "high",
		results: [
			{
				index: "0",
				text: "Benifits charity",
				dark_pattern: "Deceptive UI Dark Pattern",
				sub_dark_pattern: "Social proof",
				solution: "Check the product and ordering information in details",
			},
			{
				index: "1",
				text: "12 watching",
				dark_pattern: "Deceptive UI Dark Pattern",
				sub_dark_pattern: "Social proof",
				solution: "Check the product and ordering information in details",
			},
			{
				index: "2",
				text: "Only 1 left!",
				dark_pattern: "Deceptive UI Dark Pattern",
				sub_dark_pattern: "Scarcity",
				solution: "Check similar products for better pricing",
			},
			{
				index: "3",
				text: "Only 1 left!",
				dark_pattern: "Deceptive UI Dark Pattern",
				sub_dark_pattern: "Scarcity",
				solution: "Check similar products for better pricing",
			},
			{
				index: "4",
				text: "35 watching",
				dark_pattern: "Deceptive UI Dark Pattern",
				sub_dark_pattern: "Social proof",
				solution: "Check the product and ordering information in details",
			},
			{
				index: "5",
				text: "14 watching",
				dark_pattern: "Deceptive UI Dark Pattern",
				sub_dark_pattern: "Social proof",
				solution: "Check the product and ordering information in details",
			},
			{
				index: "6",
				text: "41 watching",
				dark_pattern: "Deceptive UI Dark Pattern",
				sub_dark_pattern: "Social proof",
				solution: "Check the product and ordering information in details",
			},
			{
				index: "7",
				text: "17 watching",
				dark_pattern: "Deceptive UI Dark Pattern",
				sub_dark_pattern: "Social proof",
				solution: "Check the product and ordering information in details",
			},
			{
				index: "8",
				text: "17 Sold!",
				dark_pattern: "Deceptive UI Dark Pattern",
				sub_dark_pattern: "Scarcity",
				solution: "Check similar products for better pricing",
			},
			{
				index: "9",
				text: "39 watching",
				dark_pattern: "Deceptive UI Dark Pattern",
				sub_dark_pattern: "Social proof",
				solution: "Check the product and ordering information in details",
			},
			{
				index: "10",
				text: "13h 16m",
				dark_pattern: "Deceptive UI Dark Pattern",
				sub_dark_pattern: "Urgency",
				solution: "Check offer details for more information",
			},
		],
	},
	{
		scan_id: "789",
		url: "https://cart.ebay.com/",
		severity: "low",
		results: [
			{
				index: "1",
				text: "You're signed out right now. To save these items or see your previously saved items, sign in.",
				dark_pattern: "Forced Action",
				sub_dark_pattern: "Forced Account Creation",
				solution: "Check the account creation details before commiting",
			},
		],
	},
	{
		scan_id: "101112",
		url: "https://www.sportsdirect.com/",
		severity: "low",
		results: [
			{
				index: "1",
				text: "Our website uses cookies and similar technologies to personalise the ads that are shown to you and to help give you the best experience on our websites. For more information see our Privacy and Cookie Policy",
				dark_pattern: "Trick Question Detection",
				sub_dark_pattern: "Misleading Pattern",
				solution:
					"Check the privacy agreement properly to understand further before proceeding",
			},
		],
	},
];
async function initializePage() {
	const autoScanSetting = JSON.parse(
		localStorage.getItem("auto_scan") || "false"
	);
	updateScanningContainer(autoScanSetting ? 2 : 1);

	fetchWebsiteInfo();
	fetchEducativeContent();
}

function fetchWebsiteInfo() {
	browser.tabs
		.query({ active: true, currentWindow: true })
		.then((tabs) => {
			const currentTab = tabs[0];
			const tabUrl = currentTab.url;
			const faviconUrl =
				currentTab.favIconUrl || "../assets/icons/website-logo.png";

			const websiteInfoContainer = document.getElementById("website-info");
			websiteInfoContainer.innerHTML = `
      <img src="${faviconUrl}" class="browser_icon" alt="Website Icon">
      <span id="websiteURL" class="browser_url">${
				tabUrl.slice(0, 36) + "..."
			}</span>
    `;
		})
		.catch((error) => {
			return;
		});
}

function updateScanningContainer(caseNumber) {
	const scanningContainer = document.getElementById("scanning-container");
	switch (caseNumber) {
		case 1:
			scanningContainer.innerHTML = `
          <button id="scanButton" class="button">Start Scan</button>
        `;
			document
				.getElementById("scanButton")
				.addEventListener("click", createScan);
			break;
		case 2:
			scanningContainer.innerHTML = `
          <img src="../assets/icons/search.svg" class="search_icon" alt="Scanning...">
          <div id="cancelScanButton" class="button">Cancel Scan</div>
        `;
			document
				.getElementById("cancelScanButton")
				.addEventListener("click", cancelScan);
			// doScan();
			createScan();
			break;
	}
}

function highlightMatchingElements(response) {
	response.results.forEach((result) => {
		const escapedText = result.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		const regex = new RegExp(escapedText, "i");

		document.querySelectorAll("*").forEach((element) => {
			if (
				regex.test(element.innerText) &&
				!element.hasAttribute("data-highlighted")
			) {
				element.style.border = "2px solid red"; // Example of highlighting
				element.setAttribute("data-highlighted", "true"); // Mark element to avoid duplicate processing

				// Optionally, add a floating icon next to the element
				// const icon = document.createElement('img');
				// icon.src = 'URL_TO_YOUR_ICON'; // Set the URL to your icon
				// icon.style.cssText = 'position:absolute;width:20px;height:20px;';
				// element.style.position = 'relative';
				// element.insertBefore(icon, element.firstChild);
			}
		});
	});
}

function extractAndJoinTextContent() {
	let allText = "";
	function walkTheDOM(node, func) {
		func(node);
		node = node.firstChild;
		while (node) {
			walkTheDOM(node, func);
			node = node.nextSibling;
		}
	}

	function handleNode(node) {
		if (node.nodeType === 1 && !["SCRIPT", "STYLE"].includes(node.tagName)) {
			if (!node.children.length) {
				const text = node.innerText || node.textContent.trim();
				if (text) {
					allText += text + "<bbext>";
				}
			}
		}
	}
	walkTheDOM(document.body, handleNode);
	return allText;
}

function doScan() {
	const scanningContainer = document.getElementById("scanning-container");
	scanningContainer.innerHTML = `
    <img src="../assets/icons/search.svg" class="search_icon"  alt="Scanning...">
    <div class="scanning-text">Scanning...</div>
  `;

	browser.tabs
		.executeScript({
			code: `(${extractAndJoinTextContent.toString()})()`,
		})
		.then((results) => {
			let extractedContent = results[0];
			console.log(extractedContent);
			if (dummyDataIndex >= dummyData.length) dummyDataIndex = 0;
			const scanData = dummyData[dummyDataIndex++];
			localStorage.setItem("count", dummyDataIndex);
			localStorage.setItem("scan_data", JSON.stringify(scanData));
			setTimeout(() => {
				displayScanResults(scanData);
			}, 3000);
		})
		.catch((error) => {
			console.error("Failed to extract content:", error);
		});
}

function createScan() {
	const scanningContainer = document.getElementById("scanning-container");
	scanningContainer.innerHTML = `
    <img src="../assets/icons/search.svg" class="search_icon"  alt="Scanning...">
    <div class="scanning-text">Scanning...</div>
  `;
	browser.tabs
		.query({ active: true, currentWindow: true })
		.then((tabs) => {
			console.log("tabs", tabs);
			fetch("http://localhost:8000/scan/create/", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + localStorage.getItem("accessToken"),
				},
				body: JSON.stringify({
					url: tabs[0].url,
					severity: "high",
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log("scanid", data.scan_id);
					localStorage.setItem("scanid", data.scan_id);
					performScan(data.scan_id);
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		})
		.catch((error) => {
			console.error("Failed to extract content:", error);
		});
}

function performScan(scan_id) {
	const scandata = localStorage.getItem("scanResults");
	const last_scan = scandata ? JSON.parse(scandata) : {};
	if (Object.keys(last_scan).length == 0 || last_scan?.scan_id != scan_id) {
		browser.tabs
			.executeScript({
				code: `(${extractAndJoinTextContent.toString()})()`,
			})
			.then((results) => {
				let extractedContent = results[0];
				console.log(extractedContent);

				// if(dummyDataIndex >= dummyData.length) dummyDataIndex = 0;
				// const scanData = dummyData[dummyDataIndex++];
				/*localStorage.setItem('count', dummyDataIndex);
      localStorage.setItem('scan_data', JSON.stringify(scanData));
      setTimeout(() => {
        displayScanResults(scanData);
      }, 3000);*/
				fetch("http://localhost:8000/scan/start/", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + localStorage.getItem("accessToken"),
					},
					body: JSON.stringify({
						scan_id: scan_id,
						url: tabs[0].url, // current web page URL from the browser tab
						content: extractedContent, // Extracted content from the current page
						scan_settings: {}, // any additional scan settings if needed
					}),
				})
					.then((response) => response.json())
					.then((data) => {
						localStorage.setItem("scanResults", JSON.stringify(data));
						displayScanResults(data);
						highlightMatchingElements(data);
					})
					.catch((error) => {
						console.error("Error:", error);
					});
			})
			.catch((error) => {
				console.error("Failed to extract content:", error);
			});
	}
}

// function performScan() {
//   // Simulate an API call to initiate scanning with a timeout
//   const scanningContainer = document.getElementById('scanning-container');
//   scanningContainer.innerHTML = `
//     <img src="../assets/icons/search.svg" class="search_icon"  alt="Scanning...">
//     <div class="scanning-text">Scanning...</div>
//   `;

//   // Todo:
//   // API call to scan api, it requires the following parameters to in the request body:
//   // 1. scan_id
//   // 2. url: current web page
//   // 3. content: if sensitivity HIGH then attach webpage extracted content condensed string by <bright-browser> else leave empty string ""
//   // 5. scan_settings

//   // Simulate a 3-second API call delay
//   setTimeout(() => {
//     if(dummyDataIndex >= dummyData.length) dummyDataIndex = 0;
//     const scanData = dummyData[dummyDataIndex++];
//     localStorage.setItem('count', dummyDataIndex);
//     localStorage.setItem('scan_data', JSON.stringify(scanData));
//     displayScanResults(scanData);
//   }, 3000);
// }

function cancelScan() {
	// Placeholder for functionality to cancel the scan
	// Depending on the API, you might need to send a cancellation request here
	updateScanningContainer(1);
}

function displayScanResults(scanData) {
	const scanningContainer = document.getElementById("scanning-container");
	scanningContainer.innerHTML = `
  <div class="statistic-box">
    <span class="statistic-value red">${scanData.results.length}</span>
    <label class="statistic-label">Total Detected</label>
  </div>
  <div class="statistic-box">
    <span class="statistic-value orange">${
			new Set(scanData.results.map((result) => result.sub_dark_pattern)).size
		}</span>
    <label class="statistic-label">Unique Pattern</label>
  </div>
  <div class="statistic-box">
    <span class="statistic-value green">${
			scanData.results.filter((result) => result.solution).length
		}</span>
    <label class="statistic-label">Rescues Initiated</label>
  </div>
`;
	document.getElementById("patternDropdown").style.display = "block";
	populatePatternDropdown(scanData);
}

function populatePatternDropdown(scanData) {
	const uniquePatterns = [
		"All",
		...new Set(scanData.results.map((result) => result.sub_dark_pattern)),
	];
	const patternDropdown = document.getElementById("patternDropdown");
	patternDropdown.innerHTML = uniquePatterns
		.map((pattern) => `<option value="${pattern}">${pattern}</option>`)
		.join("");

	patternDropdown.addEventListener("change", function () {
		displayPatternDetails(scanData, this.value);
	});
}

function displayPatternDetails(scanData, selectedPattern) {
	highlightMatchingElements(scanData);
	const patternDetails = document.getElementById("patternDetails");
	let filteredResults = scanData.results;

	if (selectedPattern !== "All") {
		filteredResults = scanData.results.filter(
			(result) => result.sub_dark_pattern === selectedPattern
		);
	}

	const resultCards = filteredResults
		.map(
			(result) => `
    <div>
      <div class="result-card">
        <h3>${result.sub_dark_pattern}</h3>
        <p>Reported as: ${result.dark_pattern}</p>
        <p class="red">${result.text}</p>
        <div class="solution-div">
          <p class="green"><strong>Solution:</strong> ${result.solution}</p>
        </div>
      </div>
      <div class="row">
        <p>Feedback:</p>
        <img src="../assets/icons/like.svg" alt="postive"/>
        <img src="../assets/icons/dislike.svg" alt="false positve"/>
      </div>
    </div>
  `
		)
		.join("");

	patternDetails.style.display = "block";
	patternDetails.innerHTML = resultCards;
}

function fetchEducativeContent() {
	const educativeContent = document.getElementById("educativeContent");
	educativeContent.innerHTML =
		"Daily tip: Keep an eye out for surprise charges during...";
}

// Menu interaction
document.getElementById("menuButton").addEventListener("click", toggleMenu);

function toggleMenu() {
	const menu = document.getElementById("menu");
	menu.classList.toggle("menu-open");
}

window.addEventListener("click", function (event) {
	const menu = document.getElementById("menu");
	if (
		event.target !== menu &&
		event.target !== document.getElementById("menuButton")
	) {
		menu.classList.remove("menu-open");
	}
});

// Menu navigation
document.getElementById("profileButton").addEventListener("click", function () {
	// Redirect to profile page
});
document.getElementById("historyButton").addEventListener("click", function () {
	// Redirect to history & insights page
});
document
	.getElementById("educationMenuButton")
	.addEventListener("click", function () {
		// Redirect to education page
	});
document
	.getElementById("feedbackButton")
	.addEventListener("click", function () {
		// Redirect to feedback page
	});

document.getElementById("logoutButton").addEventListener("click", function () {
	localStorage.clear();
	window.location.href = "onboarding.html";
});

document
	.getElementById("addDarkPatternButton")
	.addEventListener("click", function () {
		window.location.href = "report-dark-pattern.html";
	});

document
	.getElementById("settingsButton")
	.addEventListener("click", function () {
		window.location.href = "settings.html";
	});

document
	.getElementById("notificationButton")
	.addEventListener("click", function () {
		window.location.href = "notifications.html";
	});

// Footer education button interaction
document
	.getElementById("educationButton")
	.addEventListener("click", function () {
		// Could be used to show/hide educational content or navigate to an educational page
	});
