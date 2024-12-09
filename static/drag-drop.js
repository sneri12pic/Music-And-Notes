document.addEventListener('DOMContentLoaded', function () {
    // Select the drop areas and file input elements
    const mp3DropArea = document.getElementById('mp3-drop-area');
    const pdfDropArea = document.getElementById('pdf-drop-area');
    const mp3Input = document.getElementById('mp3-input');
    const pdfInput = document.getElementById('pdf-input');

    // Drag and drop event handlers for MP3 files
    mp3DropArea.addEventListener('dragover', function (e) {
        e.preventDefault();
        mp3DropArea.classList.add('drag-over');
    });

    mp3DropArea.addEventListener('dragleave', function () {
        mp3DropArea.classList.remove('drag-over');
    });

    mp3DropArea.addEventListener('drop', function (e) {
        e.preventDefault();
        mp3DropArea.classList.remove('drag-over');
        handleFileDrop(e.dataTransfer.files, 'mp3');
    });

    // Drag and drop event handlers for PDF files
    pdfDropArea.addEventListener('dragover', function (e) {
        e.preventDefault();
        pdfDropArea.classList.add('drag-over');
    });

    pdfDropArea.addEventListener('dragleave', function () {
        pdfDropArea.classList.remove('drag-over');
    });

    pdfDropArea.addEventListener('drop', function (e) {
        e.preventDefault();
        pdfDropArea.classList.remove('drag-over');
        handleFileDrop(e.dataTransfer.files, 'pdf');
    });

    // Handle file selection by input for MP3
    mp3DropArea.addEventListener('click', function () {
        mp3Input.click();
    });

    mp3Input.addEventListener('change', function (e) {
        handleFileDrop(e.target.files, 'mp3');
    });

    // Handle file selection by input for PDF
    pdfDropArea.addEventListener('click', function () {
        pdfInput.click();
    });

    pdfInput.addEventListener('change', function (e) {
        handleFileDrop(e.target.files, 'pdf');
    });

    // Function to handle file drop or file input
    function handleFileDrop(files, fileType) {
        for (let file of files) {
            if (fileType === 'mp3' && file.type === 'audio/mp3') {
                uploadMP3(file);
            } else if (fileType === 'pdf' && file.type === 'application/pdf') {
                uploadPDF(file);
            } else {
                alert('Invalid file type. Please upload a valid MP3 or PDF file.');
            }
        }
    }

    // Function to handle MP3 upload (e.g., via fetch)
    function uploadMP3(file) {
        const formData = new FormData();
        formData.append('file', file);

        fetch('/upload-mp3', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('MP3 uploaded successfully');
                } else {
                    alert('Error uploading MP3 file.');
                }
            })
            .catch(error => console.error('Error:', error));
    }

    // Function to handle PDF upload (e.g., via fetch)
    function uploadPDF(file) {
        const formData = new FormData();
        formData.append('file', file);

        fetch('/upload-pdf', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    const fileUrl = `/uploads-pdf/${file.name}`;
                    document.getElementById('pdfPreview').src = fileUrl;
                    alert('PDF uploaded successfully');
                } else {
                    alert('Error uploading PDF file.');
                }
            })
            .catch(error => console.error('Error:', error));
    }
});
