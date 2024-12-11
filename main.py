import os
from flask import Flask, render_template, request, redirect, url_for, flash, send_from_directory
from werkzeug.utils import secure_filename

app = Flask(__name__)

# Configuration for file uploads
UPLOAD_FOLDER_AUDIO = 'uploads'  # For MP3 and other audio files
ALLOWED_EXTENSIONS_AUDIO = {'mp3', 'wav', 'ogg', 'flac'}  # Allowed audio extensions
app.config['UPLOAD_FOLDER_AUDIO'] = UPLOAD_FOLDER_AUDIO

app.secret_key = 'supersecretkey'

# Ensure the upload folders exist
os.makedirs(UPLOAD_FOLDER_AUDIO, exist_ok=True)

def allowed_file_audio(filename):
    """Check if the file is an allowed audio type."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS_AUDIO

@app.route('/uploads/<filename>')
def serve_audio(filename):
    """Serve uploaded audio files."""
    return send_from_directory(app.config['UPLOAD_FOLDER_AUDIO'], filename)

@app.route('/')
def home():
    """Render the main page."""
    audio_files = os.listdir(app.config['UPLOAD_FOLDER_AUDIO'])
    return render_template('index.html', audio_files=audio_files)

@app.route('/upload', methods=['POST'])
def upload_file():
    """Handle file uploads."""
    if 'file' not in request.files:
        flash('No file part')
        return redirect(url_for('home'))

    file = request.files['file']
    if file.filename == '':
        flash('No selected file')
        return redirect(url_for('home'))

    if allowed_file_audio(file.filename):  # For audio files
        filepath = os.path.join(app.config['UPLOAD_FOLDER_AUDIO'], file.filename)
        file.save(filepath)
        flash('Audio file uploaded successfully')
    else:
        flash('Invalid file type')
        return redirect(url_for('home'))

    return redirect(url_for('home'))

@app.route('/delete/<filename>', methods=['POST'])
def delete_file(filename):
    """Handle file deletion."""
    try:
        # Construct the correct path to the file
        filepath = os.path.join(app.config['UPLOAD_FOLDER_AUDIO'], filename)

        # Check if the file exists
        if not os.path.exists(filepath):
            flash(f'File {filename} not found.')
            return redirect(url_for('home'))

        # Attempt to delete the file
        os.remove(filepath)
        flash(f'{filename} deleted successfully.')

    except PermissionError:
        flash(f'Permission error while deleting {filename}.')
    except Exception as e:
        flash(f'An unexpected error occurred: {str(e)}')

    return redirect(url_for('home'))


if __name__ == '__main__':
    app.run(debug=True)
