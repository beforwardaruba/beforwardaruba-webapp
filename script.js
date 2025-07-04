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
            const rateResponse = await fetch("https://v6.exchangerate-api.com/v6/8b175b1e4c758ca315c9fea7/latest/USD");
            const rateData = await rateResponse.json();
            const usdToAwg = rateData.conversion_rates.AWG;

            const carValueAWG = carValueUSD * usdToAwg;
            const importDutyAmount = carValueAWG * (selectedDuty / 100);
            const secondPaymentTotal = importDutyAmount + handlingFee;
            const totalCost = carValueAWG + importDutyAmount + handlingFee;

            const formatCurrency = value => value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

            quoteContainer.innerHTML = `
                <h3>📣 ${carModel}</h3>
                <p>🚢 Price - Auto + Shipping:<strong> ${formatCurrency(carValueAWG)} AWG</strong></p>
                <p>📑 Price - Invoerrecht:<strong> ${formatCurrency(importDutyAmount)} AWG</strong></p>
                <p>📦 Price - Handling fees:<strong> ${formatCurrency(handlingFee)} AWG</strong></p>
                <h4 class="total"><strong>💵 Final Price:</strong> ${formatCurrency(totalCost)} AWG</h4>
                <p>⬇️ Sigi 6️⃣ stap facil pa bo order for <strong>Be Forward</strong></p>
                <p>1️⃣ E prome pago tin cu wordo manda pa <strong>Be Forward Japon</strong> na US Dollar <strong>(${formatCurrency(carValueUSD)} USD / ${formatCurrency(carValueAWG)} AWG</strong>) via un wire transfer. Si bo mester ayudo nos por assisti anytime.</p>
                <p>2️⃣ Una bez e prome pago wordo confirma door di <strong>Be Forward Japon</strong> nos lo manda bo C.A.P (Car Arrival Progress) pa track e status di bo order i wak e Shipping Schedule i Estimate Arrival Date.</p>
                <p>3️⃣ E segundo pago tin cu wordo manda pa <strong>Be Forward Aruba</strong> <strong>(${formatCurrency(importDutyAmount)} AWG + Handling fee ${formatCurrency(handlingFee)} AWG) = ${formatCurrency(secondPaymentTotal)} AWG</strong> - Esaki ta wordo hasi prome cu e auto yega Aruba!</p>
                <p>4️⃣ Documento pa clear out bo auto lo wordo manda for di <strong>Be Forward Japon</strong> via <strong>DHL</strong>. Nos lo avisa bo ora esaki ta ready pa busca, of nos por schedule pa pasa busce serka bo cas of trabou.</p>
                <p>5️⃣ E proceso total ta dura 60 pa 90 dia pa auto for di Japon i 90 pa 120 dia si ta auto for di South Korea of Singapore.</p>
                <p>6️⃣ Pickup location lo bai ta na e parking lot di <strong>Aruba Port Authority</strong>. Nos staff lo ta present pa entrega bo jabi auto i tambe bo documento nan orginal. 🚗🔑📄</p>
                <h5>💰 USD/AWG rate for today = $ ${usdToAwg}</h5>
                <p><strong>🚨 Warning:</strong> Please zorg pa no tin delay cu Stap 3️⃣ pa asina evita cu lo bin bewaking kosten pa cada dia cu e auto keda riba waf, esaki ta wordo hasi door di Departamento di Aduana.</p>
                <p><strong>⚠️ Disclaimer:</strong> Please note that shipping times may vary due to the nature of shipping via boat. While we strive to ensure timely delivery, delays may occur beyond our control due to weather conditions, port congestion, or other unforeseen circumstances during transit. We appreciate your understanding and patience.</p>
            `;

            quoteContainer.style.display = 'block';
            downloadHtmlBtn.style.display = 'inline-block';
            downloadPdfBtn.style.display = 'inline-block';
            generateStyledHtmlBtn.style.display = 'inline-block';

        } catch (error) {
            console.error("Error generating quote:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            generateQuoteBtn.disabled = false;
            generateQuoteBtn.innerText = "Generate Quote";
        }
    });

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

    downloadPdfBtn.addEventListener('click', function () {
        if (quoteContainer.innerHTML.trim() === "") {
            alert("No content to generate PDF.");
            return;
        }

        const doc = new jspdf.jsPDF({
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

    generateStyledHtmlBtn.addEventListener('click', function () {
        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Be Forward Aruba - Quote</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    @page {
      size: legal portrait;
      margin: 1in;
    }

    @media print {
      body {
        -webkit-print-color-adjust: exact;
      }

      .print-button {
        display: none;
      }
    }

    body {
      font-family: 'Segoe UI', sans-serif;
      background-color: #000;
      margin: 0;
      padding: 20px;
      color: #fff;
    }

    .print-button {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 10px 16px;
      background-color: #e66b00;
      color: #000;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      z-index: 999;
      font-size: 14px;
    }

    .watermark {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0.5; /* Updated opacity */
      z-index: 0;
      width: 60%;
      max-width: 500px;
      pointer-events: none;
    }

    .container {
      position: relative;
      z-index: 1;
      max-width: 850px;
      margin: auto;
      padding: 24px;
      background-color: #fff;
      color: #000;
      border-radius: 10px;
      box-shadow: 0 0 20px rgba(255,255,255,0.1);
    }

    header {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-bottom: 20px;
    }

    header img {
      max-width: 180px;
      height: auto;
    }

    .subtext {
      font-size: 16px;
      color: #333;
      margin-top: 8px;
      font-weight: bold;
    }

    .quote-section h3 {
      margin-top: 0;
      color: #e66b00;
      font-size: 18px;
    }

    .quote-section p {
      margin: 8px 0;
      font-size: 14px;
      line-height: 1.4;
    }

    .total {
      font-size: 16px;
      font-weight: bold;
      background: #fff8e1;
      padding: 12px;
      border-left: 5px solid #e66b00;
      margin-top: 20px;
      border-radius: 5px;
    }

    footer {
      text-align: left;
      font-size: 13px;
      color: #666;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <button onclick="window.print()" class="print-button">🖨️ Print Quote</button>
  <img src="https://beforwardaruba.github.io/onlinecalculator/watermark.png" class="watermark" alt="Watermark" />
  <div class="container">
    <header>
      <img src="https://beforwardaruba.github.io/onlinecalculator/logo.png" alt="Be Forward Aruba " />
      <div class="subtext">Your Vehicle Import Quote</div>
    </header>

    <div class="quote-section">
      ${quoteContainer.innerHTML}
    </div>

    <footer>
      &copy; ${new Date().getFullYear()} Be Forward Aruba. All rights reserved.<br /><br />
      💡 This quote is for informational purposes and may change based on shipping conditions, customs fees, and exchange rates.
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
