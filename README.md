# Music & Note Taking Web Application

This web application allows users to upload and play music, take notes with basic text formatting features (bold/italic), and view PDF files. It provides an interactive interface with three main sections:

1. **Music Tab**: Upload and play audio files.
2. **Writing Page**: A rich-text editor where users can write notes with bold and italic formatting options.
3. **PDF Viewer**: View PDF files uploaded by the user.

## Features
- **Music Player**: Allows users to upload and play audio files, with options to pause, play, skip, and adjust the volume.
- **Note Taking**: Users can write notes with formatting options (bold, italic).
- **PDF Viewer**: Users can upload and preview PDF files.
- **Dynamic Layout Resizing**: The layout is resizable, allowing users to adjust the width of the music and PDF sections to their preference.

## Files Included
1. **index.html**: The main HTML structure for the application.
2. **styles.css**: The CSS file for styling the layout and elements of the page.
3. **script.js**: The JavaScript file responsible for handling functionality such as music control, note formatting, PDF display, and dynamic resizing.
4. **static/styles.css**: Additional custom styles for finer control over the layout and design.

## Project Structure


## How to Run the Application

### 1. Setup
To run this web application, you will need a local or remote server to handle file uploads and serve the content.

- **Option 1: Use Python's HTTP Server** (if you don't have a server already):
  - Open a terminal/command prompt.
  - Navigate to the project folder and run the following command:
    ```bash
    python3 -m http.server
    ```
  - This will start a simple server at `http://localhost:8000`.

- **Option 2: Use Node.js**:
  - You can also use a Node.js server or any web server (e.g., Express) to handle uploads.

### 2. Features Usage
- **Music Player**: 
  - Upload an audio file using the file input in the "Music Tab".
  - The audio file will appear in the list, and you can click on it to play.
  - Use the previous, play/pause, and next buttons to control the playback.
  - The volume slider allows you to adjust the volume.
  
- **Note Taking**:
  - Type your notes in the "Writing Page".
  - Use the **Bold** and **Italic** buttons to apply text formatting.

- **PDF Viewer**:
  - Upload a PDF file using the file input in the "PDF Viewer" section.
  - The PDF will be rendered in the iframe for viewing.

### 3. Resizing
You can adjust the width of the **Music Tab** and **PDF Viewer** sections using the resizable divs (`<div class="resizer">`) placed between the sections. Click and drag the resizer to resize the columns.

## Dependencies
- **Bootstrap** (via CDN): For basic styling and layout.
- **jQuery** (via CDN): Used for DOM manipulation (though in this case, it's only needed for Bootstrap’s dependencies).
- **Popper.js** (via CDN): Required for Bootstrap's dynamic components (e.g., tooltips).

## Browser Support
This application supports modern browsers such as:
- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari

### Known Limitations:
- The PDF viewer might not work optimally in all browsers.
- Some features (like drag-and-drop file uploads) could be added in future versions.

## License
This project is open-source and available under the MIT License.

---

### Usage Example:

Once you have the project running, you can interact with it like so:

1. Upload an audio file to the "Music Tab" and control playback.
2. Write notes in the "Writing Page" with the ability to format them using bold and italic.
3. Upload a PDF file in the "PDF Viewer" section to view it within the browser.
