# Storify - clothe shopping online

## About the Project

Storify is a modern, responsive e-commerce web application featuring dynamic state handling and an immersive custom shopping cart experience.Storify manages global persistent authentication contexts seamlessly while delivering premium typography and aesthetic fluid mechanics.

---

## Live Demo

**Live Site:** https://storify-rho-self.vercel.app/


---

## Features

* **Advanced Tab Management:** Uses high-fidelity Shadcn UI primitives to seamlessly partition Product Descriptions and Verified Purchase Customer Sentiment metrics.
* **Persistent Global Context Engine:** Custom React Context providers managing full session storage configurations across parallel tabs.
* **Modern CSS Variable Layouts:** Fully styled with advanced Tailwind CSS v4 variables utilizing precision `oklch()` color space palettes.
* **Stateful Modal Shopping Carts:** Uses centralized Dialog frame systems for managing real-time responsive customer item selections.

---

## Built With

* **Frontend Library:** React
* **Build System & Compiler:** Vite + `@tailwindcss/vite`
* **Design & Primitives:** Tailwind CSS v4 + Shadcn UI (Radix UI Primitives)
* **Icon Set:** Lucide React
* **Client-Side Routing:** React Router DOM (v6)

---

## Getting Started

### Installation

Clone the repository:

```bash
git clone [https://github.com/jblue254/storify.git](https://github.com/jblue254/storify.git)
```

Navigate to the project directory:

```bash
cd storify
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Visit the deployed application:

**Live Site:** https://storify-rho-self.vercel.app/

---

## Screenshots

### Home Page

<img width="956" height="452" alt="image" src="https://github.com/user-attachments/assets/a1223ee3-15d1-4864-b6b2-cc93003e2643" />



---


## Usage

1. Log in.
2. Choose your desired choice.
3. Click **Add To Cart**.
4. View your order in the shopping cart.
5. Click **Clear Cart** to delete a movie from the list or **Checkout to continue**
6. Fill out your detials to finalize

---

## Example Output

```text
Order Placed Successfully!
Thank you for shopping with Storify. Your delivery receipt is on its way to your inbox.
```

---

## Project Structure

```text
storify/
│
├── src/
│   ├── components/
│   │   ├── ui/          # Shadcn 
│   │   ├── Navbar.jsx   # Context-driven protected layout navigation row
│   │   └── Cart.jsx     # Dynamic internal shopping list modal structure
│   │
│   ├── context/
│   │   ├── AuthContext.jsx  # Token evaluation session context
│   │   ├── CartContext.jsx  # Inventory item selection context
│   │   
│   │
│   ├── pages/
│   │   ├── Login.jsx        # Protected input handler form layout
│   │   └── ProductDetail.jsx# Dynamic parameter matching detail page
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css            # Tailwind CSS v4 layers & custom variables
│
├── vite.config.js           # Integrated Tailwind compiler config plugin
└── package.json
```

---

## Future Enhancements

**Persistent Data Hydration:** Integrate Local Storage or a real-time database to persist shopping cart items across browser reloads.
**Payment Gateway Integration:** Implement secure mock checkout workflows using Stripe or PayPal SDK integration.
**Live Product Search & Filtering:** Add a high-performance search engine allowing users to instantaneously query products by title, price point, or category taxonomy.
**Order Tracking & History Dashboard:** Build an interactive user profile space tracking historical order status metrics and package delivery states.
**Admin Inventory Control Console:** Create a protected portal area for store managers to add, update, or deprecate marketplace product listings directly via a secure UI.
**Image Optimization Performance Layer:** Implement smart lazy-loading and dynamic image transformation handling for rapid layout content delivery networks.

---

## Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository.

2. Create your feature branch.

```bash
git checkout -b feature/additions
```

3. Commit your changes.

```bash
git commit -m "Add recommended changes"
```

4. Push to the branch.

```bash
git push origin feature/Add recommended changes
```

5. Open a Pull Request.

---

## License

This project is licensed under the MIT License.

---

## Author
### Your Name

Software Developer

* GitHub: [jblue254](https://github.com/jblue254)
* Email: [japhethkiprono2020@gmail.com](mailto:japhethkiprono2020@gmail.com)
