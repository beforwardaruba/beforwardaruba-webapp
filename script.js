// Your API key for ExchangeRate-API
const apiKey = "8b175b1e4c758ca315c9fea7";

// Function to fetch the exchange rate
async function fetchExchangeRate() {
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
        const data = await response.json();
        if (data.result === "success") {
            return data.conversion_rates.AWG; // Extract AWG rate from the API response
        } else {
            throw new Error("Error fetching exchange rate.");
        }
    } catch (error) {
        alert("Error fetching exchange rate: " + error.message);
        return 1.80; // Fallback rate set to 1.80 if the API call fails
    }
}

document.addEventListener('DOMContentLoaded', function () {

    // Form and quote result elements
    const generateQuoteBtn = document.getElementById('generate-quote');
    const quoteContainer = document.getElementById('quote-container');
    const downloadHtmlBtn = document.getElementById('download-html'); // New button for HTML download
    const downloadPdfBtn = document.getElementById('download-pdf'); // New button for PDF download
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

            // Calculate the import duty and the second payment total
            const importDutyAmount = carValueAWG * (selectedDuty / 100);
            const secondPaymentTotal = importDutyAmount + handlingFee;

            // Calculate the total cost
            const totalCost = carValueAWG + importDutyAmount + handlingFee;

            // Format currency with commas and periods for decimal
            const formatCurrency = (value) => value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            // Display the quote with a more structured format
            quoteContainer.innerHTML = `
                <h3>📣 ${carModel}</h3>
                <p>🇯🇵 <strong>Price - Auto + Shipping:</strong> ${formatCurrency(carValueAWG)} AWG</p>
                <p>🇦🇷 <strong>Price - Invoerrecht:</strong> ${formatCurrency(importDutyAmount)} AWG</p>
                <p>🚗 <strong>Price - Handling fees:</strong> ${formatCurrency(handlingFee)} AWG</p>
                <h4>💵 <strong>Final Price:</strong> ${formatCurrency(totalCost)} AWG</h4>
                <p>1️⃣ E prome pago tin cu wordo manda pa Beforward Japon na US Dollar (USD ${formatCurrency(carValueUSD)} / ${formatCurrency(carValueAWG)} AWG) via un wire transfer. Si bo mester ayudo nos por assisti anytime</p>
                <p>2️⃣ Una bez e prome pago wordo confirma door di Beforward Japon nos lo manda bo C.A.P (Car Arrival Progress) Pa asina bo track e status di bo order i tambe wak e Shipping Schedule i tambe e Estimate Arrival Date.</p>
                <p>3️⃣ E segundo pago tin cu wordo manda pa Beforward Aruba ( ${formatCurrency(importDutyAmount)} + Handling fee ${formatCurrency(handlingFee)}) = <strong>${formatCurrency(secondPaymentTotal)} AWG</strong> - Esaki ta wordo hasi prome cu e auto jega Aruba!</p>
                <p>4️⃣ Documento pa clear out bo auto lo wordo manda for di Beforward Japon via DHL nos lo avisa bo ora esaki ta ready pa busca, esaki bo mester entrega na nos Office of nos por schedule pa pasa busce serka bo cas of trabow.</p>
                <p>5️⃣ E proceso total ta dura 60 pa 90 dia si ta for di Japon. 90 pa 120 dia si ta for di Korea of Singapore.</p>
                <p>6️⃣ Nos lo jamabo mane bo auto ta ready pa pickup na Aruba 🚗</p>
                <h4>💵 USD/AWG rate for today = ${usdToAwgRate}</h4>
                <p><strong>🚨 Please ensure no delay in Step 2️⃣ to avoid additional costs. </strong></p>
                <p><strong>⚠️ Disclaimer: Please note that shipping times may vary due to the nature of shipping via boat. While we strive to ensure timely delivery, delays may occur beyond our control due to weather conditions, port congestion, or other unforeseen circumstances during transit. We appreciate your understanding and patience.</strong></p>
            `;

            // Show the HTML and PDF download buttons
            downloadHtmlBtn.style.display = 'inline-block';
            downloadPdfBtn.style.display = 'inline-block';
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

    // Download the PDF version of the quote
    downloadPdfBtn.addEventListener('click', function () {
        // Ensure content is not empty
        if (quoteContainer.innerHTML.trim() === "") {
            alert("No content to generate PDF.");
            return;
        }

        // Log content for debugging
        console.log("PDF content:", quoteContainer.innerHTML);

        // Set up jsPDF instance
        const doc = new jsPDF({
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
        });

        // Convert the HTML content of quoteContainer to PDF
        doc.html(quoteContainer, {
            callback: function (doc) {
                // Save the PDF
                doc.save('quote.pdf');
                console.log("PDF generated successfully.");
            },
            margin: [10, 10, 10, 10], // Adjust margins
            x: 10, // Horizontal starting position
            y: 10, // Vertical starting position
            html2canvas: {
                scale: 2
            }
        });
    });

});
