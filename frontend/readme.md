# Velocity Webtech Frontend Deployment Guide

This guide explains how to deploy the Velocity Webtech project on an AWS EC2 Ubuntu instance with:

- Next.js static frontend
- Django backend API
- PostgreSQL database
- Gunicorn backend service
- Nginx web server
- Namecheap domain
- HTTPS using Certbot and Let's Encrypt

Production domain used in this project:

```text
velocitywebtechsolution.com
www.velocitywebtechsolution.com
```

EC2 public IP used:

```text
13.201.101.168
```

Project path on EC2:

```text
/var/www/velocity_webtech
```

## 1. AWS Security Group

In AWS EC2 Security Group, add inbound rules:

```text
SSH    22   Your IP
HTTP   80   0.0.0.0/0
HTTPS  443  0.0.0.0/0
```

If you temporarily run the project on port `84`, also add:

```text
Custom TCP  84  0.0.0.0/0
```

## 2. Install Server Packages

SSH into EC2 and run:

```bash
sudo apt update
sudo apt install -y nginx postgresql postgresql-contrib python3-venv python3-pip git curl
```

Install Node.js 20:

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v
npm -v
```

## 3. Clone or Upload Project

Go to `/var/www`:

```bash
cd /var/www
```

Clone from GitHub:

```bash
sudo git clone https://github.com/velocity-webtech-solution/velocity_webtech_solution.git velocity_webtech
```

Fix ownership:

```bash
sudo chown -R ubuntu:ubuntu /var/www/velocity_webtech
cd /var/www/velocity_webtech
```

If GitHub clone is not available, upload from local machine:

```bash
scp -r /home/phenx-02/Downloads/velocity_webtech ubuntu@13.201.101.168:/home/ubuntu/
```

Then on EC2:

```bash
sudo mv /home/ubuntu/velocity_webtech /var/www/velocity_webtech
sudo chown -R ubuntu:ubuntu /var/www/velocity_webtech
```

## 4. PostgreSQL Setup

Login to PostgreSQL:

```bash
sudo -u postgres psql
```

Create database and password:

```sql
CREATE DATABASE "velocity_DB";
ALTER USER postgres WITH PASSWORD 'postgres';
\q
```

## 5. Backend Environment File

Go to backend folder:

```bash
cd /var/www/velocity_webtech/server
```

Create `.env`:

```bash
nano .env
```

For systemd deployment, do not use `export`. Use this format:

```env
SECRET_KEY=your-django-secret-key
DEBUG=False
ALLOWED_HOSTS=13.201.101.168,localhost,127.0.0.1,velocitywebtechsolution.com,www.velocitywebtechsolution.com

ENGINE=django.db.backends.postgresql
NAME=velocity_DB
DB_USER=postgres
PASSWORD=postgres
HOST=localhost
PORT=5432

EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=subhankar.rc@velocitywebtechsolution.com
EMAIL_HOST_PASSWORD=your-google-app-password
DEFAULT_FROM_EMAIL=subhankar.rc@velocitywebtechsolution.com
CONTACT_RECEIVER_EMAIL=subhankar.rc@velocitywebtechsolution.com
```

Save nano:

```text
Ctrl + O
Enter
Ctrl + X
```

Important: `EMAIL_HOST_PASSWORD` must be a Google App Password, not the normal Google account password.

## 6. Backend Setup

Create virtual environment:

```bash
cd /var/www/velocity_webtech/server
python3 -m venv env
source env/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
pip install gunicorn
```

Run migrations:

```bash
python manage.py migrate
```

Collect static files:

```bash
python manage.py collectstatic --noinput
```

Create admin user:

```bash
python manage.py createsuperuser
```

Check backend:

```bash
python manage.py check
```

## 7. Gunicorn Systemd Service

Create service file:

```bash
sudo nano /etc/systemd/system/velocity-backend.service
```

Paste:

```ini
[Unit]
Description=Velocity Webtech Django Backend
After=network.target

[Service]
User=ubuntu
Group=www-data
WorkingDirectory=/var/www/velocity_webtech/server
EnvironmentFile=/var/www/velocity_webtech/server/.env
ExecStart=/var/www/velocity_webtech/server/env/bin/gunicorn velocity.wsgi:application --bind 127.0.0.1:8000

[Install]
WantedBy=multi-user.target
```

Start backend service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable velocity-backend
sudo systemctl restart velocity-backend
sudo systemctl status velocity-backend
```

Backend should show:

```text
Active: active (running)
```

Check logs:

```bash
sudo journalctl -u velocity-backend -n 50 --no-pager
```

## 8. Frontend Setup and Build

Go to frontend folder:

```bash
cd /var/www/velocity_webtech/frontend
```

Install packages:

```bash
npm install
```

Build static frontend:

```bash
npm run build
```

The static output is created in:

```text
/var/www/velocity_webtech/frontend/out
```

This project is served from the domain root:

```text
/
```

## 9. Production Nginx Config

Create Nginx site:

```bash
sudo nano /etc/nginx/sites-available/velocity_webtech
```

Paste:

```nginx
server {
    listen 80;
    server_name 13.201.101.168 velocitywebtechsolution.com www.velocitywebtechsolution.com;

    client_max_body_size 100M;

    root /var/www/velocity_webtech/frontend/out;
    index index.html;

    location /api/static/ {
        alias /var/www/velocity_webtech/server/staticfiles/;
    }

    location /api/admin/ {
        proxy_pass http://127.0.0.1:8000/api/admin/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/velocity_webtech /etc/nginx/sites-enabled/velocity_webtech
```

Remove default site:

```bash
sudo rm -f /etc/nginx/sites-enabled/default
```

Test and restart Nginx:

```bash
sudo nginx -t
sudo systemctl restart nginx
```

Test site:

```bash
curl -I http://127.0.0.1/
curl -I http://13.201.101.168/
```

## 10. Namecheap DNS Setup

In Namecheap:

Go to:

```text
Domain List -> Manage -> Advanced DNS -> Host Records
```

Delete old URL redirect records if they conflict.

Add:

```text
Type: A Record
Host: @
Value: 13.201.101.168
TTL: Automatic
```

Add:

```text
Type: A Record
Host: www
Value: 13.201.101.168
TTL: Automatic
```

Save changes.

DNS can take a few minutes to a few hours.

Check DNS:

```bash
nslookup velocitywebtechsolution.com
nslookup www.velocitywebtechsolution.com
```

Both should resolve to:

```text
13.201.101.168
```

## 11. HTTPS Setup

Install Certbot:

```bash
sudo apt install -y certbot python3-certbot-nginx
```

Generate SSL certificate:

```bash
sudo certbot --nginx -d velocitywebtechsolution.com -d www.velocitywebtechsolution.com
```

When asked to share email with EFF, choose either:

```text
n
```

When asked about HTTP to HTTPS redirect, choose redirect option if shown.

Test HTTPS:

```bash
curl -I https://velocitywebtechsolution.com/
curl -I https://www.velocitywebtechsolution.com/
```

Open:

```text
https://velocitywebtechsolution.com/
```

Test renewal:

```bash
sudo certbot renew --dry-run
```

## 12. Final Production URLs

Website:

```text
https://velocitywebtechsolution.com/
```

About section:

```text
https://velocitywebtechsolution.com/#about
```

Contact section:

```text
https://velocitywebtechsolution.com/#contact
```

Admin enquiries:

```text
https://velocitywebtechsolution.com/admin/enquiries/
```

Django admin:

```text
https://velocitywebtechsolution.com/api/admin/
```

Services pricing overview:

```text
https://velocitywebtechsolution.com/services-pricing/
```

Individual pricing pages:

```text
https://velocitywebtechsolution.com/website-development-services-pricing/
https://velocitywebtechsolution.com/mobile-app-development-services-pricing/
https://velocitywebtechsolution.com/custom-software-development-services-pricing/
https://velocitywebtechsolution.com/e-commerce-development-services-pricing/
https://velocitywebtechsolution.com/ui-ux-design-services-pricing/
https://velocitywebtechsolution.com/api-backend-development-services-pricing/
https://velocitywebtechsolution.com/cloud-deployment-services-pricing/
```

## 13. Deploy Updates After Code Changes

On EC2:

```bash
cd /var/www/velocity_webtech
git pull
```

Backend updates:

```bash
cd /var/www/velocity_webtech/server
source env/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
sudo systemctl restart velocity-backend
```

Frontend updates:

```bash
cd /var/www/velocity_webtech/frontend
npm install
npm run build
sudo systemctl restart nginx
```

## 14. Common Errors and Fixes

### CORS or Failed to Fetch

The frontend must call API using relative URLs:

```text
/api/velocity-webtech
/api/accounts
```

Do not use this in production frontend:

```text
http://127.0.0.1:8000
```

Because in a browser, `127.0.0.1` means the visitor's own computer.

### DisallowedHost Error

Update backend `.env`:

```env
ALLOWED_HOSTS=13.201.101.168,localhost,127.0.0.1,velocitywebtechsolution.com,www.velocitywebtechsolution.com
```

Restart backend:

```bash
sudo systemctl restart velocity-backend
```

### Nginx Config Error

Check syntax:

```bash
sudo nginx -t
```

If OK:

```bash
sudo systemctl restart nginx
```

### Backend Not Running

```bash
sudo systemctl status velocity-backend
sudo journalctl -u velocity-backend -n 80 --no-pager
```

### Static Frontend Not Updating

Rebuild:

```bash
cd /var/www/velocity_webtech/frontend
npm run build
sudo systemctl restart nginx
```

### Email Not Sending

Check:

```env
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=subhankar.rc@velocitywebtechsolution.com
EMAIL_HOST_PASSWORD=your-google-app-password
```

Then:

```bash
sudo systemctl restart velocity-backend
sudo journalctl -u velocity-backend -n 80 --no-pager
```

## 15. Security Notes

Never commit secrets to GitHub:

- Django `SECRET_KEY`
- database password
- Gmail app password
- GitHub personal access token

If a GitHub token or password was exposed, revoke it immediately and create a new one.
