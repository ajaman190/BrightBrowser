# Use Python 3.9 as the base image
FROM python:3.9

# Expose the port the app runs on
EXPOSE 8000

# Set environment variables for Python
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV DEBIAN_FRONTEND noninteractive

# Upgrade pip and install Gunicorn
RUN pip install --no-cache-dir --upgrade pip
# RUN pip install gunicorn==20.1.0

# Copy and install requirements
COPY requirements.txt /
RUN pip install --no-cache-dir -r /requirements.txt

# Set the working directory and copy the app files
WORKDIR /app
COPY . /app

# Collect static files
# RUN python manage.py collectstatic --noinput

# Command to run the development server
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

# Specify the command to run the app using Gunicorn
# CMD ["gunicorn", "BrightBrowse_Backend.wsgi:application", "--bind", "0.0.0.0:8000"]