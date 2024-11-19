# **Lightweight File Manager**

A lightweight file manager application designed for Windows to manage and preview documents like PDF, Word, and PowerPoint files.

---

## **Features**
- **File Management**: Explore files and folders with rename, delete, copy, and move operations.
- **Document Previews**:
  - PDF files using **PDF.js**.
  - Word documents using **Mammoth.js**.
  - PowerPoint presentations using **PPTXGenJS**.
- **User-Friendly Interface**: Grid and list views, search functionality, and drag-and-drop support.
- **Lightweight**: Optimized for quick loading and low memory consumption.

---

## **Tech Stack**
- **Frontend**: 
  - **Electron.js** (desktop app framework)
  - **React.js** (optional for UI components)
  - **Material-UI** (for UI design)
- **Backend**:
  - **Node.js** with the `fs` module (for file handling)
- **Libraries**:
  - **PDF.js** for PDF rendering
  - **Mammoth.js** for Word document parsing
  - **PPTXGenJS** for PowerPoint handling

---

## **Installation**

### Prerequisites
- **Node.js** installed on your system.
- A **Windows** environment for development and testing.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/BensonNgu/lightweight-file-manager.git
   cd file-manager-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Build the application for production:
   ```bash
   npm run build
   ```

5. Package the app into an executable:
   ```bash
   npm run dist
   ```

---

## **Usage**
1. Launch the app.
2. Browse through directories using the file explorer.
3. Preview supported files (PDF, Word, PowerPoint) by clicking on them.
4. Perform file operations like renaming, deleting, and moving.

---

## **Folder Structure**
```
file-manager-app/
│
├── public/              # Static assets
├── src/                 # Application source code
│   ├── components/      # React components
│   ├── utils/           # Helper functions (e.g., file operations)
│   ├── App.js           # Main app logic
│   └── index.js         # Entry point
├── package.json         # App dependencies and scripts
├── main.js              # Electron main process
└── README.md            # Project documentation
```

---

## **Contributing**
Contributions are welcome! If you want to add features or fix bugs:
1. Fork the repository.
2. Create a feature branch: 
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature"
   ```
4. Push the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## **License**
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## **Future Enhancements**
- Support for more file types.
- Integration with cloud storage platforms (Google Drive, OneDrive).
- Advanced tagging and categorization of files.

---

## **Contact**
For any inquiries or feedback, contact [your-email@example.com].