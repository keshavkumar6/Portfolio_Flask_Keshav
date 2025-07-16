
from flask import Flask, render_template, request, jsonify, send_from_directory
import json
import os
from datetime import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = 'your-secret-key-here'

# Portfolio data
portfolio_data = {
    'about': {
        'name': 'Keshav Kumar',
        'title': 'CSE Student & Data Science Enthusiast',
        'description': (
            "Hi, I’m Keshav Kumar — a passionate Computer Science Engineering student at Lovely Professional University, specializing in Data Science. "
            "I enjoy building smart, user-friendly, and visually appealing digital experiences. With hands-on experience in Python, Flask, SQL, and tools like Tableau, Power BI, and Git, I’ve created projects ranging from ML-based heart disease prediction models to interactive dashboards and full-stack portfolio websites. "
            "I have a strong foundation in data structures, algorithms, UI/UX design, and full-stack development, and I constantly push myself to learn and grow through real-world projects and internships. I’m currently focused on enhancing my skills in Machine Learning and Python Full Stack Development."
        ),
        'location': 'Darbhanga, Bihar',
        'contact': '+91-6203954780',
        'email': 'keshavkumar2512@gmail.com',
        'linkedin': 'https://www.linkedin.com/in/keshavkumar3',
        'github': 'https://github.com/keshavkumar6',
        'profile_image': 'profile.jpg',
        'stats': [
            {'label': 'Projects Completed', 'value': '2+'},
            {'label': 'Years Experience', 'value': '0'},
            {'label': 'Certifications', 'value': '3+'},
            {'label': 'CGPA', 'value': '7.47'}
        ]
    },
    'projects': [
        {
            'id': 1,
            'title': 'HR Analytics Dashboard',
            'description': 'Built an HR dashboard in Power BI analyzing data from 1,470 employees to uncover key attrition trends, using Power Query and DAX for KPIs and dynamic visuals.',
            'image': 'hr_analytics_dashboard.png',
            'tags': ['Power BI', 'MS-Excel', 'Data Analysis'],
            'github': 'https://github.com/keshavkumar6/hr-analytics-dashboard-powerbi',
            'demo': '#'
        },
        {
            'id': 2,
            'title': 'Analysis of Heart Disease',
            'description': 'Developed and tested ML models in R to predict heart disease risk, achieving up to 89% accuracy using various algorithms and data visualization.',
            'image': 'heart.jpg',
            'tags': ['R', 'KNN', 'Decision Tree', 'Random Forest', 'ML'],
            'github': 'https://github.com/keshavkumar6/heart-disease-prediction',
            'demo': '#'
        },
        {
            'id': 3,
            'title': 'Scientific Calculator',
            'description': 'A simple and functional scientific calculator built using HTML, CSS, and JavaScript. Features basic arithmetic, scientific functions (√, x², xʸ, sin, cos, tan, log), correct percentage calculations, dark mode toggle, calculation history, keyboard input, and mobile responsive layout.',
            'image': 'calculator_project.jpg',
            'tags': ['HTML', 'CSS', 'JavaScript', 'Calculator'],
            'github': 'https://github.com/keshavkumar6/scientific-calculator',
            'demo': 'https://keshavkumar6.github.io/scientific-calculator/'
        }
    ],
    'skills': {
        'Languages': [
            {'name': 'C', 'level': 7},
            {'name': 'C++', 'level': 7},
            {'name': 'Java', 'level': 6},
            {'name': 'R', 'level': 8},
            {'name': 'Python', 'level': 9}
        ],
        'Technologies/Frameworks': [
            {'name': 'MySQL', 'level': 8},
            {'name': 'Tableau', 'level': 7},
            {'name': 'MS-Excel', 'level': 8},
            {'name': 'Git', 'level': 8},
            {'name': 'GitHub', 'level': 8},
            {'name': 'Power BI', 'level': 8},
            {'name': 'VS Code', 'level': 7}
        ],
        'Other Skills': [
            {'name': 'Data Structures and Algorithms', 'level': 8},
            {'name': 'Problem-Solving', 'level': 8},
            {'name': 'UI/UX Design', 'level': 7}
        ]
    },
    'achievements': [
        {
            'title': 'Summer Training (SQL, RDBMS)',
            'description': 'Hands-on training in relational database systems and SQL, including schema design, complex queries, and ACID-compliant transactions.',
            'certificate_link': 'https://drive.google.com/file/d/1vLsQoRuKdJJmr0VnMi3LuiXnVajvz226/view?usp=sharing',
            'image': 'Screenshot 2025-04-26 100126.png'
        },
        {
            'title': 'Software Testing (NPTEL)',
            'description': 'Completed NPTEL course on Software Testing.',
            'certificate_link': 'https://drive.google.com/file/d/1O-1kSI9pBj-7_6b4Azeo38w3UbT9de9v/view?usp=sharing',
            'image': 'Screenshot (36).png'
        },
        {
            'title': 'Data Analysis with Tableau (Coursera)',
            'description': 'Completed Coursera course on Data Analysis with Tableau.',
            'certificate_link': 'https://drive.google.com/file/d/1mTErl6uysMSXTevmIPPif6GYlYI6z19-/view?usp=sharing',
            'image': 'Screenshot__36_-removebg-preview.png'
        }
    ],
    'education': [
        {
            'degree': 'B.Tech, Computer Science and Engineering',
            'institution': 'Lovely Professional University',
            'location': 'Punjab',
            'year': '2022–2026',
            'score': 'CGPA: 7.39'
        },
        {
            'degree': '12th with PCM',
            'institution': 'Sacred Heart School',
            'location': 'Sitamarhi, Bihar',
            'year': '2019–2021',
            'score': '70.2%'
        },
        {
            'degree': '10th with Science',
            'institution': 'Madonna English School',
            'location': 'Darbhanga, Bihar',
            'year': '2017–2019',
            'score': '87.16%'
        }
    ]
}
@app.route('/')
def home():
    """Main portfolio page"""
    return render_template('index.html', data=portfolio_data)

@app.route('/api/portfolio')
def get_portfolio_data():
    """API endpoint to get portfolio data"""
    return jsonify(portfolio_data)

@app.route('/api/projects')
def get_projects():
    """API endpoint to get projects"""
    return jsonify(portfolio_data['projects'])

@app.route('/api/skills')
def get_skills():
    """API endpoint to get skills"""
    return jsonify(portfolio_data['skills'])

@app.route('/api/contact', methods=['POST'])
def contact():
    """Handle contact form submission"""
    try:
        data = request.json
        name = data.get('name')
        email = data.get('email')
        message = data.get('message')
        
        # Here you would typically send an email or save to database
        # For now, we'll just return a success response
        
        return jsonify({
            'success': True,
            'message': 'Thank you for your message! I will get back to you soon.'
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'There was an error sending your message. Please try again.'
        }), 500

@app.route('/api/typing-text')
def get_typing_text():
    """API endpoint for typing animation text"""
    texts = [
        "Data Analyst",
        "Python Developer",
        "Machine Learning Engineer",
        "Data Scientist",
        "Analytics Expert"
    ]
    return jsonify(texts)

@app.route('/images/<filename>')
def serve_image(filename):
    """Serve images from the images directory"""
    return send_from_directory('static/images', filename)

@app.route('/pdf/<filename>')
def serve_pdf(filename):
    """Serve PDF files"""
    return send_from_directory('pdf', filename)

@app.route('/icon/<filename>')
def serve_icon(filename):
    """Serve icon files"""
    return send_from_directory('icon', filename)

@app.route('/certificar/<filename>')
def serve_certificate(filename):
    """Serve certificate files"""
    return send_from_directory('certificar', filename)

if __name__ == '__main__':
    app.run(debug=True, port=5000)