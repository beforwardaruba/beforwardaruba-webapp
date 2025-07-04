// Include html2pdf library from CDN
const html2pdf = window.html2pdf;

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
    const pdfBtn = document.getElementById('download-pdf');
    const screenshotBtn = document.getElementById('download-screenshot');

    // Handling fee (static value)
    const handlingFee = 1000;  // AWG

    // Event listener to generate the quote
    generateQuoteBtn.addEventListener('click', async function () {
        const carModel = document.getElementById('car-model').value.trim();
        const carValueUSD = parseFloat(document.getElementById('car-value').value);
        const selectedDuty = parseInt(document.getElementById('import-duty').value);

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

            // Display the quote
            quoteContainer.innerHTML = `
                <h3>Your Quote</h3>
                <p>Car Model: ${carModel}</p>
                <p>Car Value: USD ${carValueUSD.toFixed(2)} (${carValueAWG.toFixed(2)} AWG)</p>
                <p>Import Duty: ${selectedDuty}%</p>
                <p>Handling Fee: AWG ${handlingFee}</p>
                <p><strong>Total Cost: AWG ${totalCost.toFixed(2)}</strong></p>
            `;

            // Enable download buttons and reset the button text
            pdfBtn.style.display = 'inline-block';
            screenshotBtn.style.display = 'inline-block';
            generateQuoteBtn.disabled = false;
            generateQuoteBtn.innerText = "Generate Quote";

        } catch (error) {
            console.error("Error during quote generation:", error);
            generateQuoteBtn.disabled = false;
            generateQuoteBtn.innerText = "Generate Quote";
        }
    });

    // Generate and download the PDF using html2pdf
    pdfBtn.addEventListener('click', function () {
        const options = {
            margin: 1,
            filename: 'quote.pdf',
            html2canvas: { scale: 4 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };
        html2pdf().from(quoteContainer).set(options).save();
    });

    // Generate and download screenshot
    screenshotBtn.addEventListener('click', function () {
        html2canvas(quoteContainer).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = 'quote.png';
            link.click();
        });
    });

});
