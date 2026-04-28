from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
import os
import requests

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app) # Enable CORS so the frontend can upload files from a different origin if needed

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/')
def index():
    return app.send_static_file('index.html')

CAPE_API_URL = "http://127.0.0.1:8000/apiv2/tasks/create/file/" # Update this to your CAPE Sandbox IP/Domain
CAPE_API_KEY = "cape api key"

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
        
    if file:
        filename = file.filename
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        print(f"File saved to: {filepath}")
        
        cape_result = None
        try:
            with open(filepath, 'rb') as f:
                cape_files = {'file': (filename, f)}
                # CAPE uses Token or Bearer for its Authorization header. By default 'Token' for Django REST Framework.
                headers = {'Authorization': f'Token {CAPE_API_KEY}'}
                response = requests.post(CAPE_API_URL, files=cape_files, headers=headers)
                
                # Check if the request was successful
                if response.status_code == 200 or response.status_code == 201:
                    cape_result = response.json()
                else:
                    return jsonify({
                        'success': False,
                        'error': f'CAPE API returned status {response.status_code}: {response.text}'
                    }), 500
        except Exception as e:
            return jsonify({
                'success': False,
                'error': f'Failed to send to CAPE API: {str(e)}'
            }), 500

        return jsonify({
            'success': True, 
            'message': 'File uploaded and sent to CAPE Sandbox successfully', 
            'filename': filename,
            'cape_data': cape_result
        })

@app.route('/status/<int:task_id>', methods=['GET'])
def check_status(task_id):
    # CAPE endpoint for task status
    STATUS_URL = f"http://127.0.0.1:8000/apiv2/tasks/get/status/{task_id}/"
    headers = {'Authorization': f'Token {CAPE_API_KEY}'}
    
    try:
        response = requests.get(STATUS_URL, headers=headers)
        if response.status_code == 200:
            data = response.json()
            # Status could be: 'queued', 'running', 'completed', 'reported'
            return jsonify({'success': True, 'status': data.get('data', 'unknown')})
        return jsonify({'success': False, 'error': 'Task not found'}), 404
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/report/<int:task_id>', methods=['GET'])
def get_cape_report(task_id):
    # The URL for retrieving a full report in CAPE v2
    # Format: /apiv2/tasks/get/report/<task_id>/<format>/
    CAPE_REPORT_URL = f"http://127.0.0.1:8000/apiv2/tasks/get/report/{task_id}/json/"
    
    headers = {'Authorization': f'Token {CAPE_API_KEY}'}
    
    try:
        response = requests.get(CAPE_REPORT_URL, headers=headers)
        
        if response.status_code == 200:
            # Return the JSON report directly to your frontend
            return jsonify({
                'success': True,
                'task_id': task_id,
                'report': response.json()
            })
        elif response.status_code == 404:
            return jsonify({'success': False, 'error': 'Report not found or task still processing'}), 404
        else:
            return jsonify({'success': False, 'error': f'CAPE returned status {response.status_code}'}), 500
            
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
if __name__ == '__main__':
    print("Starting server on http://127.0.0.1:5000")
    app.run(debug=True, port=5000)
