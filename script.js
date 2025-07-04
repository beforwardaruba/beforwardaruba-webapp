document.getElementById('quoteForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const carModel = document.getElementById('carModel').value;
  const carPrice = parseFloat(document.getElementById('carPrice').value);
  const fuelType = document.getElementById('fuelType').value;
  const exchangeRes = await fetch('https://api.exchangerate.host/latest?base=USD&symbols=AWG');
  const exchangeData = await exchangeRes.json();
  const rate = exchangeData.rates.AWG || 1.79; // fallback if needed

  const handlingFeeAWG = 1000;
  const importDutyRate = fuelType === 'hybrid' ? 0.19 : 0.39;
  const importDuty = carPrice * importDutyRate;
  const totalUSD = carPrice + handlingFee + importDuty;
  const totalAWG = (carPrice + importDuty) * rate + handlingFeeAWG;

  const output = \`
🚗 Car Model: \${carModel}
💵 Car Price: \$\${carPrice.toFixed(2)}
📦 Handling Fee: ƒ${handlingFeeAWG.toFixed(2)}
🛃 Import Duty (\${importDutyRate * 100}%): \$\${importDuty.toFixed(2)}

💰 Total in USD: \$\${totalUSD.toFixed(2)}
🇦🇼 Total in AWG (Rate: \${rate.toFixed(2)}): ƒ\${totalAWG.toFixed(2)}

📌 Step pa importa bo auto:
1. Hasi e pago pa e total.
2. Entregá e dokumento na Be Forward Aruba.
3. Spèr e shipping y e entrega.

📞 Pa mas info, kontakta nos.
  \`;

  document.getElementById('quoteOutput').innerText = output;
  document.getElementById('exportPDF').style.display = 'inline-block';
  document.getElementById('exportImage').style.display = 'inline-block';
});
document.getElementById('exportPDF').addEventListener('click', function () {
  const quoteElement = document.getElementById('quoteOutput');
  const opt = {
    margin:       0.5,
    filename:     'quote.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(quoteElement).save();
});

document.getElementById('exportImage').addEventListener('click', function () {
  const quoteElement = document.getElementById('quoteOutput');
  html2canvas(quoteElement).then(canvas => {
    const link = document.createElement('a');
    link.download = 'quote.png';
    link.href = canvas.toDataURL();
    link.click();
  });
});
