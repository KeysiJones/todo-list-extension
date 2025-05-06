# Todo List Chrome Extension

A simple Todo List Chrome Extension built with React and Vite. This extension lets you add, toggle, and remove tasks, with persistent storage using `chrome.storage.local`.

---

## Demo
![Uploading 0505-ezgif.com-video-to-gif-converter.gif…]()

Online APP: https://todo-list-extension-two.vercel.app/

## 🛠️ Prerequisites

- **Node.js** (>=14.x)
- **npm** (comes with Node.js)
- **Google Chrome** (for extension testing)

---

## 🚀 Getting Started

1. **Clone the repository** (or download the source):
   ```bash
   git clone <your-repo-url>
   cd todo-list-extension
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server (optional)**:
   ```bash
   npm run dev
   ```
   This launches a local server, but note that for Chrome extensions you still need to build before testing in Chrome.

---

## 🏗️ Build for Production

Generate the `dist/` folder which contains your compiled extension:
```bash
npm run build
```
This will produce:
```
dist/
├─ index.html       ← (if you kept it)
├─ popup.html       ← extension popup entry, with correct asset references
├─ assets/…         ← compiled JS/CSS/images
├─ manifest.json    ← copied from public/
└─ icons/…          ← icon files
```

---

## 📂 Load the Extension in Chrome

1. Open **Chrome** and navigate to: 
    ```chrome://extensions/```
2. Enable **Developer mode** (toggle in the top-right).
3. Click **Load unpacked** and select the `dist/` directory from your project.
4. The extension should appear in your toolbar. Click its icon to open the Todo popup.

---

## 📁 Project Structure

```
todo-list-extension/
├─ index.html          # (Optional) default Vite entry
├─ popup.html          # Extension popup HTML entry
├─ public/
│  ├─ manifest.json    # Chrome manifest
│  └─ icons/           # Extension icons
├─ src/
│  ├─ main.jsx         # Vite React entry point
│  ├─ App.jsx          # Main app component
│  ├─ components/
│  │  └─ Todo.jsx      # Todo item component
│  └─ services/
│     └─ storageService.js  # chrome.storage wrapper
├─ vite.config.js      # Vite build config (multi-page)
├─ package.json        # npm scripts & dependencies
└─ dist/               # Built output (after npm run build)
```

---

## 🔧 Configuration

- **`manifest.json`** (in `public/`):
  - Defines extension metadata, icons, permissions, and popup.
  - Uses `permissions: ["storage"]` to allow `chrome.storage.local`.

- **`vite.config.js`**:
  - Sets `base: './'` for relative asset paths in Chrome extension.
  - Defines `popup.html` (and `index.html` if used) as Rollup inputs.
  - Copies static files from `public/` into `dist/`.

---

## 🤝 Contributing

Feel free to open issues or submit pull requests! Improvements, bug fixes, and feature ideas are welcome.

---

## 📜 License

MIT © Jones Fernandes 2025
