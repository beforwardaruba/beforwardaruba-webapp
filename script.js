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
        header img {
            max-height: 80px;
            margin-bottom: 10px;
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
            <img src="logo.png" alt="Be Forward Aruba Logo" style="max-height: 80px; margin-bottom: 10px;">
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
