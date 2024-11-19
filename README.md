# **Lightweight File Manager**

A lightweight file manager application designed for Windows to manage and preview documents like PDF, Word, and PowerPoint files.

![File Manager](./images/File%20Manager%20v%201.0.jpg)

---

## **Features**

- **File Management**: Navigate through files and folders with an intuitive interface.
- **Document Previews**:
  - PDF files rendered seamlessly.
  - Word documents rendered using **docx-preview**.
  - PowerPoint files with an integrated viewer.
- **User-Friendly Interface**: Side-by-side file explorer and preview pane with support for drag-and-drop functionality.
- **Lightweight**: Optimized for fast performance and minimal memory usage.

---

## **Tech Stack**

- **Frontend**:
  - **Electron.js** (desktop app framework)
  - Vanilla JavaScript and HTML/CSS for UI components.
- **Backend**:
  - **Node.js** with the `fs` and `path` modules for file handling.
- **Libraries**:
  - **docx-preview** for Word document rendering.
  - Native browser support for PDF and image previews.

---

## **Installation**

To install the app:

1. Go to the [Releases](https://github.com/BensonNgu/lightweight-file-manager/releases) page.
2. Download the latest version for **Windows**.
3. Run the installer or portable executable.
4. Launch the app and start managing your files!

---

## **Usage**

1. Launch the app.
2. Browse through directories using the file explorer.
3. Preview supported files (PDF, Word, PowerPoint) by clicking on them.
4. Toggle the sidebar for a larger preview area.

---

## **Contributing**

Contributions are welcome! If you want to add features or fix bugs:

### Prerequisites

- **Node.js** installed on your system.
- A **Windows** environment for development and testing.

### Steps to Contribute

1. Clone the repository:

   ```bash
   git clone https://github.com/BensonNgu/lightweight-file-manager.git
   cd lightweight-file-manager/code
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the application in development mode:

   ```bash
   npm start
   ```

4. Build the application for production:

   ```bash
   npm run build
   ```

5. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
6. Commit your changes:
   ```bash
   git commit -m "Add feature"
   ```
7. Push the branch:
   ```bash
   git push origin feature-name
   ```
8. Open a pull request.

## **Folder Structure**

```
lightweight-file-manager/
│
├── code/                # Main project directory
│   ├── assets/          # Icons and other static assets for the app
│   │   └── icon.ico     # Icon used for the packaged app
│   │
│   ├── dist/            # Output folder for packaged builds (generated after running `npm run dist`)
│   │
│   ├── package.json     # NPM configuration file with scripts and dependencies
│   ├── package-lock.json# Lock file for exact dependency versions
│   ├── index.html       # Main HTML structure for the Electron app
│   ├── main.js          # Electron main process logic
│   ├── style.css        # CSS file for styling the app
│   ├── utils.js         # Utility functions for file handling and previews
│
├── .gitignore           # Git ignore file for excluding unnecessary files from the repo
├── LICENSE              # License for your project
└── README.md            # Documentation for the project

```

---

## **License**

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

---

## **Future Enhancements**

- Support for additional file types (e.g., spreadsheets, audio, and video).
- Advanced search and filtering options.
- Integration with cloud storage services.

---

## **Contact**

For inquiries or feedback, contact [Benson](bensonngu25@gmail.com).!
