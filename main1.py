import os
from flask import Flask, render_template, request, redirect, url_for, flash
from flask import send_from_directory

app = Flask(__name__)

# Configuration for file uploads
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'mp3', 'wav', 'ogg', 'flac'}  # Define allowed file extensions
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.secret_key = 'supersecretkey'  # Required for flash messages

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    """Check if the file has an allowed extension."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/uploads/<filename>')
def serve_file(filename):
    """Serve uploaded files."""
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/')
def home():
    """Render the main page."""
    files = os.listdir(app.config['UPLOAD_FOLDER'])
    music_files = [f for f in files if allowed_file(f)]
    return render_template('index.html', music_files=music_files)

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

    if file and allowed_file(file.filename):
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filepath)
        flash('File uploaded successfully')
        return redirect(url_for('home'))
    else:
        flash('Invalid file type')
        return redirect(url_for('home'))

@app.route('/delete/<filename>', methods=['POST'])
def delete_file(filename):
    """Handle file deletion."""
    try:
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)

        # Check if the file exists before attempting to delete it
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
