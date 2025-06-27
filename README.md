# 🌿 Funa Labs - Professional Tech Consulting Website

A beautiful, responsive one-page consulting website built with Flask, featuring three stunning design themes and optimized for deployment on Linode VPS.

## ✨ Features

### 🎨 **Three Beautiful Themes**
- **🌿 Zen Garden**: Soft greens, cream tones, nature-inspired and peaceful
- **⚖️ Modern Minimal**: Clean grays, forest green accents, geometric and sophisticated  
- **🏜️ Warm Professional**: Sand/tan base, olive green, inviting earth tones

### 🚀 **Core Functionality**
- **One-page responsive design** - Perfect for mobile and desktop
- **Dynamic theme switching** - Compare themes instantly
- **Contact form** - Ready for database integration
- **WhatsApp integration** - Direct messaging capability
- **Portfolio showcase** - Highlight your projects
- **Analytics ready** - Structured for future data collection

### 💼 **Business Focus**
- **"CTO in a Box"** positioning for small companies
- **Service showcase**: NetSuite, Ecommerce, MVP Development, Full-Stack
- **Professional yet approachable** tone
- **Fast response time** emphasis
- **Problem-solving mindset** highlighted

## 🛠️ Technical Stack

- **Backend**: Flask 3.0.0
- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Grid & Flexbox
- **Fonts**: Inter & Nunito (Google Fonts)
- **Icons**: Font Awesome 6
- **Deployment**: Optimized for Linode VPS

## 🏃‍♂️ Quick Start

### 1. Installation
```bash
# Clone or download the project
cd funalabs

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 2. Configuration
```bash
# Optional: Create .env file for environment variables
echo "SECRET_KEY=your-secret-key-here" > .env
echo "FLASK_ENV=development" >> .env
```

### 3. Run Development Server
```bash
python app.py
```

Visit `http://localhost:5000` to see your website!

### 4. Theme Comparison
- **Zen Garden**: `http://localhost:5000/?theme=zen`
- **Modern Minimal**: `http://localhost:5000/?theme=minimal` 
- **Warm Professional**: `http://localhost:5000/?theme=warm`

## 🎨 Theme Customization

Each theme has its own CSS file in `/static/css/`:

- `theme-zen.css` - Nature-inspired, soft and peaceful
- `theme-minimal.css` - Clean, geometric, professional
- `theme-warm.css` - Earthy, inviting, approachable

### Color Schemes

**Zen Garden:**
- Primary: `#7C9885` (Sage Green)
- Background: `#F8FAF7` (Soft Cream)
- Accent: `#B8D4A0` (Light Green)

**Modern Minimal:**
- Primary: `#2D5A3D` (Forest Green)
- Background: `#FAFBFA` (Clean White)
- Accent: `#5B9C6B` (Medium Green)

**Warm Professional:**
- Primary: `#6B8E23` (Olive Green)
- Background: `#FDF8F0` (Warm Cream)
- Accent: `#DEB887` (Burlywood)

## 📱 WhatsApp Integration

Update the WhatsApp link in `templates/index.html`:

```html
<!-- Replace YOUR_PHONE_NUMBER with your actual WhatsApp number -->
<a href="https://wa.me/YOUR_PHONE_NUMBER?text=...">
```

The pre-filled message includes:
- Pricing and timeline questions
- Service inquiry options
- Company and project details

## 🗄️ Database Integration (Future)

The contact form is ready for database integration. Uncomment these lines in `requirements.txt`:

```python
# SQLAlchemy==2.0.23
# Flask-SQLAlchemy==3.1.1
# Flask-Migrate==4.0.5
```

Then modify `app.py` to save contact submissions to your database.

## 🚀 Production Deployment

### Linode VPS Deployment

1. **Upload files** to your Linode server
2. **Install dependencies** in production environment
3. **Configure web server** (Apache/Nginx)
4. **Set environment variables**
5. **Update WhatsApp phone number**

### Environment Variables
```bash
export SECRET_KEY="your-production-secret-key"
export FLASK_ENV="production"
# Optional database URL when ready
# export DATABASE_URL="your-database-connection-string"
```

### Nginx Configuration Example
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    location /static {
        alias /path/to/funalabs/static;
    }
}
```

## 📊 Analytics & Monitoring

The JavaScript includes tracking hooks for:
- Theme switching
- Contact form submissions  
- WhatsApp clicks
- Service interactions

Integrate with your preferred analytics platform:
- Google Analytics
- Mixpanel  
- Plausible
- Custom tracking

## 🎯 Customization Guide

### 1. Update Business Information
Edit `templates/index.html`:
- Company name and tagline
- Service descriptions
- Portfolio projects
- Contact information

### 2. Modify Services
Update the services section with your specific offerings:
```html
<div class="service-card">
    <div class="service-icon">
        <i class="fas fa-your-icon"></i>
    </div>
    <h3>Your Service</h3>
    <p>Your service description...</p>
</div>
```

### 3. Add Portfolio Projects
Update the portfolio section with your actual projects:
```html
<div class="project-card">
    <div class="project-header">
        <h3>Project Name</h3>
        <span class="project-status">Status</span>
    </div>
    <p>Project description...</p>
    <div class="project-tech">
        <span class="tech-tag">Technology</span>
    </div>
</div>
```

### 4. Customize Contact Form
Modify form fields in `templates/index.html` and update the backend handler in `app.py`.

## 🔧 Development

### Project Structure
```
funalabs/
├── app.py                 # Flask application
├── requirements.txt       # Python dependencies
├── README.md             # This file
├── .github/
│   └── copilot-instructions.md
├── templates/
│   ├── index.html        # Main page template
│   └── 404.html          # Error page
└── static/
    ├── css/
    │   ├── base.css      # Common styles
    │   ├── theme-zen.css # Zen theme
    │   ├── theme-minimal.css # Minimal theme
    │   └── theme-warm.css # Warm theme
    └── js/
        └── main.js       # Interactive functionality
```

### Adding New Themes
1. Create new CSS file: `static/css/theme-yourtheme.css`
2. Update theme switcher in `templates/index.html`
3. Add route handler in `app.py`

### Form Enhancements
The contact form supports:
- Real-time validation
- AJAX submission
- Success/error messaging
- Field requirement indicators

## 🐛 Troubleshooting

### Common Issues

**Theme not loading:**
- Check CSS file paths
- Verify theme parameter in URL
- Clear browser cache

**Contact form not working:**
- Check Flask route `/contact`
- Verify form field names match backend
- Check browser console for JavaScript errors

**WhatsApp link not working:**
- Update phone number in template
- Verify URL encoding
- Test on mobile device

## 📄 License

This project is created for Funa Labs consulting business. Modify and use as needed for your consulting practice.

## 🤝 Support

For questions about this website template:
- Check the code comments for guidance
- Review the Flask documentation
- Consult the CSS for theme customization

---

**Built with curiosity and attention to detail** 🌿  
*Just like the consulting services Funa Labs provides*
