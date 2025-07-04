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
        return 1.80; // fallback
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const generateQuoteBtn = document.getElementById('generate-quote');
    const quoteContainer = document.getElementById('quote-container');
    const downloadHtmlBtn = document.getElementById('download-html');
    const downloadPdfBtn = document.getElementById('download-pdf');
    const generateStyledHtmlBtn = document.getElementById('generate-styled-html');
    const importDutySelect = document.getElementById('import-duty');
    const handlingFee = 1000;

    generateQuoteBtn.addEventListener('click', async function () {
        const carModel = document.getElementById('car-model').value.trim();
        const carValueUSD = parseFloat(document.getElementById('car-value').value);
        const selectedDuty = parseInt(importDutySelect.value);

        if (carModel === "" || isNaN(carValueUSD)) {
            alert("Please enter a valid car model and car value.");
            return;
        }

        generateQuoteBtn.disabled = true;
        generateQuoteBtn.innerText = "Generating...";

        try {
            const usdToAwgRate = await fetchExchangeRate();
            const carValueAWG = carValueUSD * usdToAwgRate;
            const importDutyAmount = carValueAWG * (selectedDuty / 100);
            const secondPaymentTotal = importDutyAmount + handlingFee;
            const totalCost = carValueAWG + importDutyAmount + handlingFee;

            const formatCurrency = (value) => value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            quoteContainer.innerHTML = `
                <h3>📣 ${carModel}</h3>
                <p>🇯🇵 <strong>Price - Auto + Shipping:</strong> ${formatCurrency(carValueAWG)} AWG</p>
                <p>🇦🇷 <strong>Price - Invoerrecht:</strong> ${formatCurrency(importDutyAmount)} AWG</p>
                <p>🚗 <strong>Price - Handling fees:</strong> ${formatCurrency(handlingFee)} AWG</p>
                <h4 class="total">💵 <strong>Final Price:</strong> ${formatCurrency(totalCost)} AWG</h4>
                <p>1️⃣ E prome pago tin cu wordo manda pa Beforward Japon na US Dollar (USD ${formatCurrency(carValueUSD)} / ${formatCurrency(carValueAWG)} AWG) via un wire transfer. Si bo mester ayudo nos por assisti anytime</p>
                <p>2️⃣ Una bez e prome pago wordo confirma door di Beforward Japon nos lo manda bo C.A.P (Car Arrival Progress) Pa asina bo track e status di bo order i tambe wak e Shipping Schedule i tambe e Estimate Arrival Date.</p>
                <p>3️⃣ E segundo pago tin cu wordo manda pa Beforward Aruba ( ${formatCurrency(importDutyAmount)} + Handling fee ${formatCurrency(handlingFee)}) = <strong>${formatCurrency(secondPaymentTotal)} AWG</strong> - Esaki ta wordo hasi prome cu e auto jega Aruba!</p>
                <p>4️⃣ Documento pa clear out bo auto lo wordo manda for di Beforward Japon via DHL nos lo avisa bo ora esaki ta ready pa busca, esaki bo mester entrega na nos Office of nos por schedule pa pasa busce serka bo cas of trabow.</p>
                <p>5️⃣ E proceso total ta dura 60 pa 90 dia si ta for di Japon. 90 pa 120 dia si ta for di Korea of Singapore.</p>
                <p>6️⃣ Nos lo jamabo mane bo auto ta ready pa pickup na Aruba 🚗</p>
                <h5>💵 USD/AWG rate for today = ${usdToAwgRate}</h5>
                <p><strong>🚨 Please ensure no delay in Step 2️⃣ to avoid additional costs. </strong></p>
                <p><strong>⚠️ Disclaimer: Please note that shipping times may vary due to the nature of shipping via boat. While we strive to ensure timely delivery, delays may occur beyond our control due to weather conditions, port congestion, or other unforeseen circumstances during transit. We appreciate your understanding and patience.</strong></p>
            `;

            quoteContainer.style.display = 'block';
            downloadHtmlBtn.style.display = 'inline-block';
            downloadPdfBtn.style.display = 'inline-block';
            generateStyledHtmlBtn.style.display = 'inline-block';

        } catch (error) {
            console.error("Error during quote generation:", error);
        } finally {
            generateQuoteBtn.disabled = false;
            generateQuoteBtn.innerText = "Generate Quote";
        }
    });

    // Download raw HTML version
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

    // Download PDF version
    downloadPdfBtn.addEventListener('click', function () {
        if (quoteContainer.innerHTML.trim() === "") {
            alert("No content to generate PDF.");
            return;
        }

        const doc = new jsPDF({
            unit: 'mm',
            format: 'a4',
            orientation: 'portrait'
        });

        doc.html(quoteContainer, {
            callback: function (doc) {
                doc.save('quote.pdf');
            },
            margin: [10, 10, 10, 10],
            x: 10,
            y: 10,
            html2canvas: {
                scale: 2
            }
        });
    });

    // Generate styled HTML version
    generateStyledHtmlBtn.addEventListener('click', function () {
        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Be Forward Aruba - Quote</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            max-width: 800px;
            margin: auto;
            padding: 40px 20px;
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
            border-radius: 10px;
        }
        header {
            text-align: center;
            margin-bottom: 30px;
        }
        header h1 {
            color: #FFA500;
            margin: 0;
        }
        .quote-section h3 {
            margin-top: 0;
            color: #FFA500;
        }
        .quote-section p {
            margin: 12px 0;
        }
        .total {
            font-size: 20px;
            font-weight: bold;
            background: #fff8e1;
            padding: 15px;
            border-left: 5px solid #FFA500;
            margin-top: 25px;
            border-radius: 5px;
        }
        footer {
            text-align: center;
            font-size: 13px;
            color: #666;
            margin-top: 40px;
        }
        @media (max-width: 600px) {
            .container {
                padding: 20px 10px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🚗 Be Forward Aruba</h1>
            <p>Vehicle Import Quote</p>
        </header>

        <div class="quote-section">
            ${quoteContainer.innerHTML}
        </div>

        <footer>
            &copy; ${new Date().getFullYear()} Be Forward Aruba. All rights reserved.<br>
            This quote is for informational purposes only and subject to change based on shipping conditions.
        </footer>
    </div>
</body>
</html>
        `;

        const blob = new Blob([htmlContent], { type: 'text/html' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'styled-quote.html';
        link.click();
    });
});
