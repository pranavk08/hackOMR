// Global variables
let selectedFile = null;
const API_BASE_URL = 'http://127.0.0.1:8000';

// DOM elements
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const fileName = document.getElementById('fileName');
const processBtn = document.getElementById('processBtn');
const loading = document.getElementById('loading');
const results = document.getElementById('results');
const error = document.getElementById('error');

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

function setupEventListeners() {
    // File input change
    fileInput.addEventListener('change', handleFileSelect);
    
    // Drag and drop
    uploadArea.addEventListener('dragover', handleDragOver);
    uploadArea.addEventListener('dragleave', handleDragLeave);
    uploadArea.addEventListener('drop', handleDrop);
    uploadArea.addEventListener('click', () => fileInput.click());
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        selectedFile = file;
        displayFileInfo(file);
        processBtn.disabled = false;
        hideError();
    } else {
        showError('Please select a valid image file.');
    }
}

function handleDragOver(event) {
    event.preventDefault();
    uploadArea.classList.add('dragover');
}

function handleDragLeave(event) {
    event.preventDefault();
    uploadArea.classList.remove('dragover');
}

function handleDrop(event) {
    event.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        if (file.type.startsWith('image/')) {
            selectedFile = file;
            displayFileInfo(file);
            processBtn.disabled = false;
            hideError();
        } else {
            showError('Please select a valid image file.');
        }
    }
}

function displayFileInfo(file) {
    fileName.textContent = file.name;
    fileInfo.style.display = 'block';
    uploadArea.style.display = 'none';
}

function removeFile() {
    selectedFile = null;
    fileInput.value = '';
    fileInfo.style.display = 'none';
    uploadArea.style.display = 'block';
    processBtn.disabled = true;
    hideResults();
    hideError();
}

function processImage() {
    if (!selectedFile) {
        showError('Please select a file first.');
        return;
    }
    
    showLoading();
    hideError();
    hideResults();
    
    const formData = new FormData();
    formData.append('image', selectedFile);
    
    fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        hideLoading();
        if (data.error) {
            showError(data.error);
        } else {
            displayResults(data);
        }
    })
    .catch(err => {
        hideLoading();
        console.error('Error:', err);
        showError('Failed to process image. Make sure the server is running on port 8000.');
    });
}

function displayResults(data) {
    // Display total score
    document.getElementById('totalScore').textContent = data.total_score || 0;
    
    // Display subject scores
    displaySubjectScores(data.per_subject_scores || {});
    
    // Display answers
    displayAnswers(data.answers || {});
    
    // Display processed images
    displayImages(data.paths || {});
    
    results.style.display = 'block';
}

function displaySubjectScores(subjectScores) {
    const container = document.getElementById('subjectScores');
    container.innerHTML = '';
    
    Object.entries(subjectScores).forEach(([subject, score]) => {
        const div = document.createElement('div');
        div.className = 'subject-score';
        div.innerHTML = `
            <div class="subject-name">${subject.charAt(0).toUpperCase() + subject.slice(1)}</div>
            <div class="subject-value">${score}/20</div>
        `;
        container.appendChild(div);
    });
}

function displayAnswers(answers) {
    const container = document.getElementById('answersGrid');
    container.innerHTML = '';
    
    Object.entries(answers).forEach(([question, answer]) => {
        const div = document.createElement('div');
        div.className = `answer-item ${answer ? 'filled' : ''}`;
        div.innerHTML = `
            <div class="answer-question">${question}</div>
            <div class="answer-value">${answer || 'Not filled'}</div>
        `;
        container.appendChild(div);
    });
}

function displayImages(paths) {
    const rectifiedImg = document.getElementById('rectifiedImg');
    const overlayImg = document.getElementById('overlayImg');
    
    if (paths.rectified) {
        const rectifiedFilename = paths.rectified.split('\\').pop();
        rectifiedImg.src = `${API_BASE_URL}/outputs/${rectifiedFilename}`;
        rectifiedImg.alt = 'Rectified OMR sheet';
    }
    
    if (paths.overlay) {
        const overlayFilename = paths.overlay.split('\\').pop();
        overlayImg.src = `${API_BASE_URL}/outputs/${overlayFilename}`;
        overlayImg.alt = 'Overlay with bubble detection';
    }
}

function showLoading() {
    loading.style.display = 'block';
    processBtn.disabled = true;
}

function hideLoading() {
    loading.style.display = 'none';
    processBtn.disabled = false;
}

function showError(message) {
    document.getElementById('errorMessage').textContent = message;
    error.style.display = 'block';
}

function hideError() {
    error.style.display = 'none';
}

function hideResults() {
    results.style.display = 'none';
}

// Utility function to format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
