import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Set up document title for the game
document.title = "Online Go - Roll & Collect Game";

// Add Font Awesome for icons
const fontAwesome = document.createElement("link");
fontAwesome.rel = "stylesheet";
fontAwesome.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
document.head.appendChild(fontAwesome);

// Add Google Fonts
const googleFonts = document.createElement("link");
googleFonts.rel = "stylesheet";
googleFonts.href = "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Nunito:wght@400;600&display=swap";
document.head.appendChild(googleFonts);

// Add favicon
const favicon = document.createElement("link");
favicon.rel = "icon";
favicon.type = "image/svg+xml";
favicon.href = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90' x='50%' text-anchor='middle'>🎲</text></svg>";
document.head.appendChild(favicon);

createRoot(document.getElementById("root")!).render(<App />);
