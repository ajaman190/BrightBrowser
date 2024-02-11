# Use Python 3.9 as the base image
FROM python:3.9

# Expose the port the app runs on
EXPOSE 8000

# Set environment variables for Python
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV DEBIAN_FRONTEND noninteractive

# Upgrade pip and install Gunicorn
RUN pip install --no-cache-dir --upgrade pip && \
    pip install gunicorn==20.1.0

# Copy and install requirements
COPY requirements.txt /
RUN pip install --no-cache-dir -r requirements.txt

# Set the working directory and copy the app files
WORKDIR /app
COPY . /app

RUN python manage.py collectstatic --noinput