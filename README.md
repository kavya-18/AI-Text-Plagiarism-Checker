# AI Text & Plagiarism Checker

Simple tool to detect AI-generated text, check writing originality, and find plagiarism/similarity in assignments.

## Quick Start Guide
### Prerequisites

- Python 3.8+

- Node.js 16+

- pip installed

### 1️: Clone & Install Backend
git clone https://github.com/yourusername/AI-Text-Plagiarism-Checker.git

cd AI-Text-Plagiarism-Checker/server

pip install -r requirements.txt

### 2️ Start Backend Server
python app.py


Backend runs at: http://127.0.0.1:5000

### 3️ Install & Start Frontend
cd ../src
npm install
npm start


Frontend runs at: http://localhost:3000

## How to Use
### **Step 1: Enter Text or Upload File**

You can provide text by:

Typing or pasting into the text box

Uploading .pdf, .docx, or .txt files

The system extracts the text automatically.

### **Step 2: Run Analysis**

Click Analyze to get results:

**AI Detection**

Human vs AI probability

Color-coded sentence markings

🟢 Human-like

🔴 AI-like

### **Step 3: Plagiarism / Similarity Check**

**The app checks:**

- Repeated paragraphs

- High similarity sections

- Internal plagiarism inside the document

- Writing style consistency

**Results include:**

- Overall similarity score

- Highlighted suspicious text

### **Output Examples**
**AI Detection**

- AI Probability: 72%

- Human Probability: 28%

- Writing Category: Likely AI-Assisted

**Plagiarism**

- Similarity Score: 58%

- Duplicate Paragraphs Found

- Sentences marked as repetitive

## Technical Architecture
**Backend**

1. Python + Flask

2. HuggingFace Transformers (RoBERTa AI detector)

3. Sentence-Transformers (MiniLM for similarity)

4. PyTorch

5. PyPDF2 / python-docx for file extraction

**Frontend**

1. React

2. Axios

3. Bootstrap

4. Custom CSS

### **Folder Structure**
project/

│── src/           # React frontend

│── server/        # Flask backend

│── README.md

│── requirements.txt

Author

Kavya Parige
AI Engineer – NLP | LLMs | RAG | MLOps
