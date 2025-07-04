
# 🌟 Be Forward Aruba - Quote Generator

Welcome to the **Be Forward Aruba** Quote Generator! This web application allows you to easily calculate a car quote by inputting basic car information, which includes shipping, import duties, and handling fees. The app dynamically generates a quote and provides a downloadable HTML version for your convenience.

---

## 📋 Features

- **📦 Car Quote Generation**  
  Input your car's model and value (in USD), and the app calculates a complete quote, including:
  - **Car Value + Shipping** (converted from USD to AWG)
  - **Import Duty** (39% for ICE vehicles or 19% for Hybrids)
  - **Handling Fee** (set to 1000 AWG)
  
- **💲 Dynamic Quote Calculation**  
  The app fetches the current exchange rate for USD to AWG and dynamically updates the quote in real time.

- **📝 Step-by-Step Breakdown**  
  The quote includes a detailed step-by-step process, outlining the payment structure:
  1. **Step 1**: Payment to Beforward Japan in USD/AWG.
  2. **Step 2**: Second payment to Beforward Aruba in AWG.
  3. **Step 3**: Delivery of the car to Aruba, complete with all necessary documents.

- **💾 Downloadable Quote**  
  Users can easily download the generated quote as an **HTML file** for further reference or sharing.

- **🌍 Currency Conversion**  
  The application uses **ExchangeRate-API** to fetch the latest USD to AWG exchange rate, ensuring accurate calculations.

---

## 🛠️ Technologies Used

- **HTML5**: The backbone of the app, providing structure and layout.
- **CSS3**: Beautifully designed styling, utilizing custom fonts and visual enhancements.
  - **Google Fonts**: Used **Poppins** for modern typography.
  - **Font Awesome**: Icons used throughout the app for a more intuitive and attractive UI.
- **JavaScript (ES6+)**: The heart of the functionality, handling the dynamic quote generation.
  - **API Integration**: Fetches the USD to AWG exchange rate from **ExchangeRate-API**.
  - **DOM Manipulation**: Updates the UI in real-time based on user input.
  - **HTML5 Blob**: Allows for seamless download of the quote in HTML format.
- **External Libraries**:
  - **jsPDF**: For future enhancements like generating PDF versions of the quote.
  - **html2canvas**: Potential for future screenshot generation (if needed).
  - **html2pdf.js**: For generating and downloading the quote as a PDF (future feature).

---

## 🚀 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/be-forward-aruba.git
   cd be-forward-aruba
   ```

2. **Open `index.html`** in your browser to see the app in action!

3. **No dependencies**: All necessary libraries are included via CDN, so there are no additional steps for setup.

---

## 📝 Usage

1. **Enter Car Model**  
   Simply input the model of the car you're looking to get a quote for.

2. **Enter Car Value (USD)**  
   Enter the value of the car in USD, and the app will handle the conversion.

3. **Select Import Duty**  
   Choose between:
   - 39% for **ICE (Internal Combustion Engine)** cars
   - 19% for **Hybrid** cars

4. **Generate Quote**  
   Click the **Generate Quote** button to view your detailed breakdown, including all fees and charges.

5. **Download Quote**  
   Once the quote is generated, you can download it in **HTML format** by clicking **Download HTML Version**.

---

## 💡 Future Improvements

- **📄 PDF Generation**: Add functionality for users to download the quote as a PDF.
- **📸 Car Image Upload**: Allow users to upload a car image, which will be displayed with their quote.
- **📧 Email Integration**: Allow users to email their quotes directly from the app.
- **🔐 User Accounts**: Enable users to save past quotes and preferences for easy access in the future.

---

## 🤝 Contributing

We welcome contributions to the **Be Forward Aruba** project! To contribute:
1. Fork the repository.
2. Create a new branch for your feature/bugfix.
3. Submit a pull request with a clear description of your changes.

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🌐 Contact

For any questions or suggestions, feel free to reach out!

---

### Enjoy using the **Be Forward Aruba** Quote Generator, and happy car shopping! 🚗💨
