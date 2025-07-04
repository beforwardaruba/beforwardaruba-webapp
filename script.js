// Include jsPDF and html2canvas from CDN
const jsPDF = window.jspdf.jsPDF;
const html2canvas = window.html2canvas;

document.addEventListener('DOMContentLoaded', function () {

    // Form and quote result elements
    const generateQuoteBtn = document.getElementById('generate-quote');
    const quoteContainer = document.getElementById('quote-container');
    const pdfBtn = document.getElementById('download-pdf');
    const screenshotBtn = document.getElementById('download-screenshot');

    // Handling fee (static value)
    const handlingFee = 1000;  // AWG

    // Event listener to generate the quote
    generateQuoteBtn.addEventListener('click', function () {
        const carValue = parseFloat(document.getElementById('car-value').value);
        const selectedDuty = parseInt(document.getElementById('import-duty').value);
        
        if (isNaN(carValue)) {
            alert("Please enter a valid value for car value.");
            return;
        }

        // Calculate the quote based on selected import duty
        const totalCost = carValue + (carValue * (selectedDuty / 100)) + handlingFee;
        
        // Display the quote
        quoteContainer.innerHTML = `
            <h3>Your Quote</h3>
            <p>Car Value: AWG ${carValue.toFixed(2)}</p>
            <p>Import Duty: ${selectedDuty}%</p>
            <p>Handling Fee: AWG ${handlingFee}</p>
            <p><strong>Total Cost: AWG ${totalCost.toFixed(2)}</strong></p>
        `;

        // Show the download buttons
        pdfBtn.style.display = 'inline-block';
        screenshotBtn.style.display = 'inline-block';
    });

    // Generate and download the PDF
    pdfBtn.addEventListener('click', function () {
        const doc = new jsPDF();
        doc.html(quoteContainer, {
            callback: function (doc) {
                doc.save('quote.pdf');
            }
        });
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
