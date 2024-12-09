document.addEventListener('DOMContentLoaded', function () {
    // Get the audio player and the list of files
    const audioPlayer = document.getElementById("audio-player");
    const musicList = document.getElementById("music-list");
    const audioSource = document.getElementById("audio-source");
    const musicFiles = musicList ? [...musicList.getElementsByTagName("li")] : [];

    let currentTrackIndex = 0;

    // Get the resizer elements and tab elements
    const resizerLeft = document.getElementById('resizer-left');
    const resizerRight = document.getElementById('resizer-right');
    const musicTab = document.querySelector('.music-tab');
    const writingPage = document.querySelector('.writing-page');
    const pdfViewer = document.querySelector('.pdf-viewer');

    let isResizingLeft = false;
    let isResizingRight = false;
    let startX, startWidthLeft, startWidthRight;


    // Load the first track but do not autoplay
    if (musicFiles.length > 0) {
        const firstFile = musicFiles[0].getAttribute("data-file");
        audioSource.src = "/uploads/" + firstFile;
    }

    // Function to play a track
    function playTrack(file) {
        // Pause and reset the audio player before changing the source
        audioPlayer.pause();
        audioPlayer.currentTime = 0;

        // Set the new file source
        audioSource.src = "/uploads/" + file;

        // Load the new audio file
        audioPlayer.load();

        // Once the audio is loaded, play it
        audioPlayer.play().catch(error => {
            console.error('Error playing the audio:', error);
        });
    }

    // Function to play the next track
    function playNextTrack() {
        currentTrackIndex++;
        if (currentTrackIndex >= musicFiles.length) {
            currentTrackIndex = 0; // Loop back to the first track
        }

        const nextFile = musicFiles[currentTrackIndex].getAttribute("data-file");
        playTrack(nextFile);
    }

    // Function to play the previous track
    function playPrevTrack() {
        currentTrackIndex--;
        if (currentTrackIndex < 0) {
            currentTrackIndex = musicFiles.length - 1; // Loop back to the last track
        }

        const prevFile = musicFiles[currentTrackIndex].getAttribute("data-file");
        playTrack(prevFile);
    }

    // Function to toggle pause and play
    function togglePlayPause() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            document.getElementById("pause-btn").textContent = "Pause";
        } else {
            audioPlayer.pause();
            document.getElementById("pause-btn").textContent = "Play";
        }
    }

    // Add event listener to go to the next track when the current one ends
    audioPlayer.addEventListener('ended', playNextTrack);

    // Add click event to each list item to immediately play the selected track
    musicFiles.forEach((fileElement, index) => {
        fileElement.addEventListener('click', () => {
            currentTrackIndex = index;
            const selectedFile = fileElement.getAttribute("data-file");
            playTrack(selectedFile);
        });
    });

    // Event listeners for buttons
    document.getElementById("prev-btn").addEventListener("click", playPrevTrack);
    document.getElementById("next-btn").addEventListener("click", playNextTrack);
    document.getElementById("pause-btn").addEventListener("click", togglePlayPause);

    // Get the volume slider and set its initial value
    const volumeSlider = document.getElementById('volume-slider');
    volumeSlider.value = audioPlayer.volume;

    // Update the audio player's volume when the slider is changed
    volumeSlider.addEventListener('input', function () {
        audioPlayer.volume = volumeSlider.value;
    });

    // PDF update
    document.getElementById('pdfInput').addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            // Upload the file to the server
            const formData = new FormData();
            formData.append('file', file);

            fetch('/upload', {
                method: 'POST',
                body: formData
            }).then(response => response.json())
                .then(data => {
                    if (data.success) {
                        // Once the PDF is uploaded, update the iframe with the file URL
                        const iframe = document.getElementById('pdfPreview');
                        const fileUrl = `/uploads-pdf/${file.name}`;
                        iframe.src = fileUrl;
                    } else {
                        alert('Error uploading file');
                    }
                })
                .catch(error => console.error('Error:', error));
        } else {
            alert('Please upload a valid PDF file.');
        }
    });

    // Resizers
    // Function to handle resizing of the left tab (Music Tab)
    function startResizeLeft(e) {
        isResizingLeft = true;
        startX = e.clientX;
        startWidthLeft = musicTab.offsetWidth;
        document.addEventListener('mousemove', resizeLeft);
        document.addEventListener('mouseup', stopResizeLeft);
    }

    // Function to handle resizing of the right tab (PDF Viewer)
    function startResizeRight(e) {
        isResizingRight = true;
        startX = e.clientX;
        startWidthRight = pdfViewer.offsetWidth;
        document.addEventListener('mousemove', resizeRight);
        document.addEventListener('mouseup', stopResizeRight);
    }

    // Function to resize the left tab
    function resizeLeft(e) {
        if (isResizingLeft) {
            const dx = e.clientX - startX;
            const newWidth = startWidthLeft + dx;
            if (newWidth > 100 && newWidth < window.innerWidth - 200) { // Prevent too small or too large widths
                musicTab.style.width = newWidth + 'px';
                writingPage.style.marginLeft = newWidth + 'px';
            }
        }
    }

    // Function to resize the right tab
    function resizeRight(e) {
        if (isResizingRight) {
            const dx = e.clientX - startX;
            const newWidth = startWidthRight - dx;
            if (newWidth > 100 && newWidth < window.innerWidth - 200) { // Prevent too small or too large widths
                pdfViewer.style.width = newWidth + 'px';
            }
        }
    }

    // Stop resizing when the mouse is released
    function stopResizeLeft() {
        isResizingLeft = false;
        document.removeEventListener('mousemove', resizeLeft);
        document.removeEventListener('mouseup', stopResizeLeft);
    }

    function stopResizeRight() {
        isResizingRight = false;
        document.removeEventListener('mousemove', resizeRight);
        document.removeEventListener('mouseup', stopResizeRight);
    }

    // Add event listeners for the resizers
    resizerLeft.addEventListener('mousedown', startResizeLeft);
    resizerRight.addEventListener('mousedown', startResizeRight);
});
