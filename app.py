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

    print("Sending Discord notification with content:", content)
    resp = requests.post(DISCORD_WEBHOOK_URL, json={"content": content})
    print("Discord webhook response:", resp.status_code, resp.text)

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'no798lsk4tb4-b4q4iuytgb786ba1shgms938rnu09a8739nf8c74b09a7-7-a3-va3=97t)')

@app.route('/')
def index():
    theme = 'minimal'
    return render_template('index.html', theme=theme)

@app.route('/contact', methods=['POST'])
def contact():
    try:
        data = {
            'name': request.form.get('name'),
            'email': request.form.get('email'),
            'company': request.form.get('company'),
            'challenge': request.form.get('challenge'),
            'budget': request.form.get('budget'),
            'timeline': request.form.get('timeline')
        }
        print("Contact form data:", data)  # Debug print
        send_discord_notification(data)
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            return jsonify({'success': 'success', 'message': 'Thank you for reaching out! I\'ll get back to you within 24 hours.'})
        return render_template('index.html', theme='zen', success='success', data=data)
    except Exception as e:
        print("Error in /contact:", e)
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
            return jsonify({'success': 'error', 'message': f'Server error: {e}'}), 500
        return render_template('index.html', theme='zen', error=True), 500

import requests
@app.route('/status')
def status():
    sites = [
        {'name': 'MTGAbyss', 'url': 'https://MTGAbyss.com'},
        {'name': 'Funa Labs', 'url': 'https://FunaLabs.com'},
        {'name': 'DominionAbyss', 'url': 'https://DominionAbyss.com'},
    ]
    import ssl, socket, datetime
    def get_ssl_expiry(hostname):
        try:
            ctx = ssl.create_default_context()
            with ctx.wrap_socket(socket.socket(), server_hostname=hostname) as s:
                s.settimeout(3)
                s.connect((hostname, 443))
                cert = s.getpeercert()
                expires = datetime.datetime.strptime(cert['notAfter'], '%b %d %H:%M:%S %Y %Z').replace(tzinfo=datetime.timezone.utc)
                now = datetime.datetime.now(datetime.timezone.utc)
                days = (expires - now).days
                return days
        except Exception as e:
            return str(e)

    results = []
    for site in sites:
        try:
            resp = requests.head(site['url'], timeout=5)
            status_code = resp.status_code
        except Exception as e:
            status_code = str(e)
        # Extract hostname for SSL check
        hostname = site['url'].replace('https://', '').replace('http://', '').split('/')[0]
        ssl_days_left = get_ssl_expiry(hostname)
        results.append({
            'name': site['name'],
            'url': site['url'],
            'status': status_code,
            'ssl_days_left': ssl_days_left
        })
    return jsonify(results)

@app.errorhandler(404)
def not_found(error):
    return render_template('404.html'), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=1235)