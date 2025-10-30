# Use a slim Python base image
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy pyproject.toml (and uv.lock if present)
COPY pyproject.toml ./
COPY uv.lock ./

# Install uv (dependency manager)
RUN pip install uv

# Install dependencies using uv
RUN uv pip install --system --no-cache .

# Copy your source code
COPY . .

# Expose FastAPI's port
EXPOSE 8080

# Run the app using uvicorn
CMD ["uv", "run", "fastapi", "dev", "--port", "8080", "--host", "0.0.0.0"]