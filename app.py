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
    
def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-key-change-in-production')
    
    @app.route('/')
    def index():
        # Locked to minimal theme - your chosen professional look
        theme = 'minimal'
        return render_template('index.html', theme=theme)
    
    @app.route('/contact', methods=['POST'])
    def contact():
        # Handle contact form submission
        data = {
            'name': request.form.get('name'),
            'email': request.form.get('email'),
            'company': request.form.get('company'),
            'challenge': request.form.get('challenge'),
            'budget': request.form.get('budget'),
            'timeline': request.form.get('timeline')
        }
        
        # Send notification to Discord
        send_discord_notification(data)     

        return render_template('index.html')
    
    @app.errorhandler(404)
    def not_found(error):
        return render_template('404.html'), 404
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=1235)
