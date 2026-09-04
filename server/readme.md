# Velocity Webtech Project Installation Guide

This project has two parts:

- `server/` - Django backend API, admin panel, database, contact enquiries, and email sending.
- `frontend/` - Next.js frontend website and admin UI.

## Requirements

Install these first:

- Python 3.12+
- Node.js 20+
- npm
- PostgreSQL
- Git

## Project Setup

Clone or open the project folder:

```bash
cd /home/phenx-02/Downloads/velocity_webtech
```

## Backend Setup

Go to the backend folder:

```bash
cd server
```

Create and activate a virtual environment:

```bash
python3 -m venv env
source env/bin/activate
```

Install Python packages:

```bash
pip install -r requirements.txt
```

## Backend Environment Variables

Create or update `server/.env`.

Use this format:

```env
export SECRET_KEY='your-django-secret-key'
export DEBUG=True
export ALLOWED_HOSTS='127.0.0.1,0.0.0.0,localhost,*'

export ENGINE=django.db.backends.postgresql
export NAME=velocity_DB
export DB_USER=postgres
export PASSWORD=postgres
export HOST=localhost
export PORT=5432

export EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
export EMAIL_HOST=smtp.gmail.com
export EMAIL_PORT=587
export EMAIL_USE_TLS=True
export EMAIL_HOST_USER=subhankar.rc@velocitywebtechsolution.com
export EMAIL_HOST_PASSWORD=your-google-app-password
export DEFAULT_FROM_EMAIL=subhankar.rc@velocitywebtechsolution.com
export CONTACT_RECEIVER_EMAIL=subhankar.rc@velocitywebtechsolution.com
```

Important: `EMAIL_HOST_PASSWORD` must be a Google App Password, not the normal Gmail/Google account password.

After editing `.env`, load it in the current terminal:

```bash
source .env
```

## PostgreSQL Database Setup

Login to PostgreSQL:

```bash
sudo -u postgres psql
```

Create the database:

```sql
CREATE DATABASE "velocity_DB";
```

Exit PostgreSQL:

```sql
\q
```

If your PostgreSQL username or password is different, update `DB_USER`, `PASSWORD`, `HOST`, and `PORT` in `server/.env`.

## Run Migrations

From the `server/` folder:

```bash
source env/bin/activate
source .env
python manage.py makemigrations
python manage.py migrate
```

## Create Admin User

```bash
python manage.py createsuperuser
```

Follow the prompts and create your Django admin login.

## Run Backend Server

```bash
python manage.py runserver 0.0.0.0:8000
```

Backend URLs:

- API base: `http://127.0.0.1:8000/api/velocity-webtech/`
- Contact submissions API: `http://127.0.0.1:8000/api/velocity-webtech/contact-submissions/`
- Django admin: `http://127.0.0.1:8000/velocity_webtech_solution/api/admin/`

## Frontend Setup

Open a new terminal and go to the frontend folder:

```bash
cd /home/phenx-02/Downloads/velocity_webtech/frontend
```

Install npm packages:

```bash
npm install
```

Optional: create `frontend/.env.local` if you want to override API URLs:

```env
NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api/velocity-webtech
NEXT_PUBLIC_ACCOUNTS_API_BASE_URL=http://127.0.0.1:8000/api/accounts
NEXT_PUBLIC_DJANGO_ADMIN_URL=http://127.0.0.1:8000/velocity_webtech_solution/api/admin/
```

## Run Frontend Development Server

```bash
npm run dev
```

Frontend URLs:

- Website: `http://localhost:3000/velocity_webtech_solution/`
- Admin enquiries page: `http://localhost:3000/velocity_webtech_solution/admin/enquiries/`
- Services pricing overview: `http://localhost:3000/velocity_webtech_solution/services-pricing/`
- Website pricing page: `http://localhost:3000/velocity_webtech_solution/website-development-services-pricing/`
- Mobile app pricing page: `http://localhost:3000/velocity_webtech_solution/mobile-app-development-services-pricing/`
- Custom software pricing page: `http://localhost:3000/velocity_webtech_solution/custom-software-development-services-pricing/`
- E-commerce pricing page: `http://localhost:3000/velocity_webtech_solution/e-commerce-development-services-pricing/`
- UI/UX pricing page: `http://localhost:3000/velocity_webtech_solution/ui-ux-design-services-pricing/`
- API/backend pricing page: `http://localhost:3000/velocity_webtech_solution/api-backend-development-services-pricing/`
- Cloud/deployment pricing page: `http://localhost:3000/velocity_webtech_solution/cloud-deployment-services-pricing/`

## Build Frontend

```bash
npm run build
```

This project uses static export and the base path:

```text
/velocity_webtech_solution
```

The build output is created in:

```text
frontend/out/
```

## Run Static Frontend Build

After `npm run build`, run:

```bash
npm run start
```

Then open:

```text
http://localhost:3000/velocity_webtech_solution/
```

## Email Setup Notes

For the business email:

```text
subhankar.rc@velocitywebtechsolution.com
```

Enable 2-Step Verification in Google Account, then create an App Password:

Google Account -> Security -> App passwords -> create password for `Velocity Webtech SMTP`.

Put that generated password into:

```env
export EMAIL_HOST_PASSWORD=your-google-app-password
```

Restart Django after changing email settings.

## Contact Form Flow

When a user submits the contact form:

1. Data is saved in `ContactSubmission`.
2. An enquiry email is sent to `CONTACT_RECEIVER_EMAIL`.
3. An automatic thank-you email is sent to the client.
4. The automatic reply is saved in `EnquiryEmailReply`.
5. Admin can view enquiry and reply history from the frontend admin enquiries page.

## Useful Backend Commands

Run Django checks:

```bash
cd server
source env/bin/activate
source .env
python manage.py check
```

Create migrations:

```bash
python manage.py makemigrations
```

Apply migrations:

```bash
python manage.py migrate
```

Collect static files:

```bash
python manage.py collectstatic
```

## Useful Frontend Commands

Run development server:

```bash
cd frontend
npm run dev
```

Build frontend:

```bash
npm run build
```

Serve exported build:

```bash
npm run start
```

## Troubleshooting

If frontend admin data is not showing:

- Make sure Django is running on `http://127.0.0.1:8000`.
- Check `NEXT_PUBLIC_API_BASE_URL`.
- Run `python manage.py check`.
- Confirm PostgreSQL is running.
- Confirm migrations are applied.

If emails are not sending:

- Confirm `EMAIL_BACKEND` is SMTP.
- Confirm `EMAIL_HOST_USER` is the business email.
- Confirm `EMAIL_HOST_PASSWORD` is a Google App Password.
- Restart Django after changing `.env`.
- Check terminal logs for SMTP errors.

If Django admin is not opening:

- Use `http://127.0.0.1:8000/velocity_webtech_solution/api/admin/`.
- From frontend, use `http://localhost:3000/velocity_webtech_solution/api/admin/` to redirect to Django admin.

If port `3000` is busy:

```bash
pgrep -f "next dev"
kill <process_id>
```

Then run:

```bash
npm run dev
```
