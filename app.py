from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
import os
import sys
import json
import requests

try:
    from Malware_model_main.main import generate_forensic_report
except ImportError as e:
    print(f"Warning: Could not import generate_forensic_report from Malware_model_main.main. Error: {e}")
    def generate_forensic_report(*args, **kwargs):
        raise Exception("AI model not loaded correctly.")

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
            report_data = response.json()
            
            # Save the report for the AI model
            report_path = os.path.join(app.config['UPLOAD_FOLDER'], f"task_{task_id}_report.json")
            with open(report_path, 'w') as f:
                json.dump(report_data, f)
                
            # Run the AI forensic report generation
            pdf_ready = False
            try:
                print(f"[*] Generating Forensic PDF Report for task {task_id}...")
                pdf_path = generate_forensic_report(task_id=task_id, json_path=report_path, output_dir=app.config['UPLOAD_FOLDER'])
                pdf_ready = True
                print(f"[+] PDF successfully generated at {pdf_path}")
            except Exception as e:
                print(f"[-] Error generating PDF: {str(e)}")
            
            # Return the JSON report directly to your frontend
            return jsonify({
                'success': True,
                'task_id': task_id,
                'report': report_data,
                'pdf_ready': pdf_ready
            })
        elif response.status_code == 404:
            return jsonify({'success': False, 'error': 'Report not found or task still processing'}), 404
        else:
            return jsonify({'success': False, 'error': f'CAPE returned status {response.status_code}'}), 500
            
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/download-pdf/<int:task_id>', methods=['GET'])
def download_pdf(task_id):
    filename = f"SecureBERT_Report_Task{task_id}.pdf"
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    if os.path.exists(file_path):
        # as_attachment=False will display it in the browser if supported, use True to force download
        return send_from_directory(app.config['UPLOAD_FOLDER'], filename, as_attachment=False)
    else:
        return "PDF not found. The model may have failed to generate it.", 404
if __name__ == '__main__':
    print("Starting server on http://127.0.0.1:5000")
    app.run(debug=True, port=5000)
