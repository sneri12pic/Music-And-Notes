// Get the audio player and the list of files
const audioPlayer = document.getElementById("audio-player");
const musicList = document.getElementById("music-list");
const audioSource = document.getElementById("audio-source");
const musicFiles = [...musicList.getElementsByTagName("li")];

let currentTrackIndex = 0;

// Function to play the next track
function playNextTrack() {
    currentTrackIndex++;
    if (currentTrackIndex >= musicFiles.length) {
        currentTrackIndex = 0; // Loop back to the first track
    }

    const nextFile = musicFiles[currentTrackIndex].getAttribute("data-file");
    audioSource.src = "/uploads/" + nextFile; // Corrected URL
    audioPlayer.load();
    audioPlayer.play();
}

// Function to play the previous track
function playPrevTrack() {
    currentTrackIndex--;
    if (currentTrackIndex < 0) {
        currentTrackIndex = musicFiles.length - 1; // Loop back to the last track
    }

    const prevFile = musicFiles[currentTrackIndex].getAttribute("data-file");
    audioSource.src = "/uploads/" + prevFile; // Corrected URL
    audioPlayer.load();
    audioPlayer.play();
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

// Set the first track as the initial track
if (musicFiles.length > 0) {
    const firstFile = musicFiles[0].getAttribute("data-file");
    audioSource.src = "/uploads/" + firstFile; // Corrected URL
    audioPlayer.load();
    audioPlayer.play();
}

// Add event listener to go to the next track when the current one ends
audioPlayer.addEventListener('ended', playNextTrack);

// Add click event to each list item to immediately play the selected track
musicFiles.forEach((fileElement, index) => {
    fileElement.addEventListener('click', () => {
        currentTrackIndex = index;
        const selectedFile = fileElement.getAttribute("data-file");
        audioSource.src = "/uploads/" + selectedFile; // Corrected URL
        audioPlayer.load();
        audioPlayer.play();
    });
});

// Event listeners for buttons
document.getElementById("prev-btn").addEventListener("click", playPrevTrack);
document.getElementById("next-btn").addEventListener("click", playNextTrack);
document.getElementById("pause-btn").addEventListener("click", togglePlayPause);

// Get the volume slider
const volumeSlider = document.getElementById('volume-slider');
volumeSlider.value = audioPlayer.volume;

// Update the audio player's volume when the slider is changed
volumeSlider.addEventListener('input', function () {
    audioPlayer.volume = volumeSlider.value;
});
