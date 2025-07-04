// Your API key for ExchangeRate-API
const apiKey = "8b175b1e4c758ca315c9fea7";

// Function to fetch the exchange rate
async function fetchExchangeRate() {
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
        const data = await response.json();
        if (data.result === "success") {
            return data.conversion_rates.AWG;
        } else {
            throw new Error("Error fetching exchange rate.");
        }
    } catch (error) {
        alert("Error fetching exchange rate: " + error.message);
        return 1.78; // Fallback rate if the API call fails
    }
}

document.addEventListener('DOMContentLoaded', function () {

    // Form and quote result elements
    const generateQuoteBtn = document.getElementById('generate-quote');
    const quoteContainer = document.getElementById('quote-container');
    const downloadHtmlBtn = document.getElementById('download-html'); // New button for HTML download
    const importDutySelect = document.getElementById('import-duty'); // Select Import Duty dropdown

    // Handling fee (static value)
    const handlingFee = 1000;  // AWG

    // Event listener to generate the quote
    generateQuoteBtn.addEventListener('click', async function () {
        const carModel = document.getElementById('car-model').value.trim();
        const carValueUSD = parseFloat(document.getElementById('car-value').value);
        const selectedDuty = parseInt(importDutySelect.value); // Ensure the selected duty is used correctly

        // Check if the inputs are valid
        if (carModel === "" || isNaN(carValueUSD)) {
            alert("Please enter a valid car model and car value.");
            return;
        }

        // Show loading indicator (optional)
        generateQuoteBtn.disabled = true;
        generateQuoteBtn.innerText = "Generating...";

        try {
            // Fetch the exchange rate (USD to AWG)
            const usdToAwgRate = await fetchExchangeRate();

            // Convert car value from USD to AWG
            const carValueAWG = carValueUSD * usdToAwgRate;

            // Calculate the quote based on selected import duty
            const totalCost = carValueAWG + (carValueAWG * (selectedDuty / 100)) + handlingFee;

            // Format currency with commas and periods for decimal
            const formatCurrency = (value) => value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            // Display the quote with a more structured format
            quoteContainer.innerHTML = `
                <h3>📣 ${carModel}</h3>
                <p>🇯🇵 <strong>Price - Auto + Shipping:</strong> ${formatCurrency(carValueAWG)} AWG</p>
                <p>🇦🇷 <strong>Price - Invoerrecht:</strong> ${formatCurrency(carValueAWG * (selectedDuty / 100))} AWG</p>
                <p>🚗 <strong>Price - Handling fees:</strong> ${formatCurrency(handlingFee)} AWG</p>
                <h4>💵 <strong>Final Price:</strong> ${formatCurrency(totalCost)} AWG</h4>
                <p><strong>Step 1️⃣</strong> Make the first payment to Beforward Japan 🇯🇵 in US Dollar (USD ${formatCurrency(carValueUSD)} / ${formatCurrency(carValueAWG)} AWG) via wire transfer. If you need help, we are available anytime.</p>
                <p><strong>Step 2️⃣</strong> Second payment to Beforward Aruba 🇦🇼 (AWG ${formatCurrency(carValueAWG * (selectedDuty / 100))}) - Once the payment is received, the car and documentation will be sent via DHL to Aruba. The documents include the B/L (Bill of Lading) and Import Certificate.</p>
                <p><strong>Step 3️⃣</strong> Enjoy your car in Aruba 🚗🔑</p>
                <h5>💵 USD/AWG rate for today = ${usdToAwgRate}</h5>
                <p><strong>🚨 Please ensure no delay in Step 2️⃣ to avoid additional costs. </strong></p>
            `;

            // Show the HTML download button
            downloadHtmlBtn.style.display = 'inline-block';
            generateQuoteBtn.disabled = false;
            generateQuoteBtn.innerText = "Generate Quote";

        } catch (error) {
            console.error("Error during quote generation:", error);
            generateQuoteBtn.disabled = false;
            generateQuoteBtn.innerText = "Generate Quote";
        }
    });

    // Download the HTML version of the quote
    downloadHtmlBtn.addEventListener('click', function () {
        const htmlContent = `
            <html>
                <head><title>Quote</title></head>
                <body>
                    ${quoteContainer.innerHTML}
                </body>
            </html>
        `;
        
        const blob = new Blob([htmlContent], { type: 'text/html' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'quote.html';
        link.click();
    });

});
