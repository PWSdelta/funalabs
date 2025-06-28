from flask import Flask, render_template, request, jsonify
import os
import requests
from dotenv import load_dotenv

load_dotenv()

DISCORD_WEBHOOK_URL = os.getenv("DISCORD_WEBHOOK_URL")

def send_discord_notification(data):
    content = (
        f"**New Funa Labs Contact Submission**\n"
        f"**Name:** {data['name']}\n"
        f"**Email:** {data['email']}\n"
        f"**Company:** {data['company']}\n"
        f"**Challenge:** {data['challenge']}\n"
        f"**Budget:** {data['budget']}\n"
        f"**Timeline:** {data['timeline']}"
    )
    requests.post(DISCORD_WEBHOOK_URL, json={"content": content})

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-key-change-in-production')

@app.route('/')
def index():
    theme = 'minimal'
    return render_template('index.html', theme=theme)

@app.route('/contact', methods=['POST'])
def contact():
    data = {
        'name': request.form.get('name'),
        'email': request.form.get('email'),
        'company': request.form.get('company'),
        'challenge': request.form.get('challenge'),
        'budget': request.form.get('budget'),
        'timeline': request.form.get('timeline')
    }
    send_discord_notification(data)
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return jsonify({'status': 'success', 'message': 'Thank you for reaching out! I\'ll get back to you within 24 hours.'})
    return render_template('index.html', theme='minimal', success=True, data=data)

@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=1235)