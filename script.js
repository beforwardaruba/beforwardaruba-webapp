document.getElementById('quote-form').addEventListener('submit', async function (e) {
  e.preventDefault();

  const model = document.getElementById('model').value;
  const carPrice = parseFloat(document.getElementById('price').value);
  const fuelType = document.getElementById('fuel').value;

  const importDutyRate = fuelType === 'hybrid' ? 0.19 : 0.39;

  const importDuty = carPrice * importDutyRate;
  const totalUSD = carPrice + importDuty;

  let rate = 1.79;
  try {
    const res = await fetch('https://api.exchangerate.host/latest?base=USD&symbols=AWG');
    const data = await res.json();
    rate = data.rates.AWG || rate;
  } catch (err) {
    console.warn('Exchange rate fallback to 1.79 AWG');
  }

  const handlingFeeAWG = 1000;
  const totalAWG = (carPrice + importDuty) * rate + handlingFeeAWG;

  const quote = `
🚗 Quote for: ${model}

💵 Car Price: $${carPrice.toFixed(2)} USD
⚙️ Fuel Type: ${fuelType}
📦 Import Duty (${(importDutyRate * 100).toFixed(0)}%): $${importDuty.toFixed(2)} USD
💰 Total (USD): $${totalUSD.toFixed(2)} USD

📦 Handling Fee: ƒ${handlingFeeAWG.toFixed(2)}
💳 Total in AWG (Rate: ${rate.toFixed(2)}): ${totalAWG.toFixed(2)} AWG

📝 Please keep this quote for your records.
  `;

  document.getElementById('quote-output').textContent = quote;
});

document.getElementById('download-pdf').addEventListener('click', function () {
  const element = document.getElementById('quote-output');
  html2pdf().from(element).save('quote.pdf');
});

document.getElementById('download-image').addEventListener('click', function () {
  html2canvas(document.getElementById('quote-output')).then(canvas => {
    const link = document.createElement('a');
    link.download = 'quote.png';
    link.href = canvas.toDataURL();
    link.click();
  });
});