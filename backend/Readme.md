# Build the Docker image
```
docker build -t my-django-app .
```
# Run the container in detached mode, mapping port 8000
```
docker run -d -p 8000:8000 -v $(pwd)/data:/app/data --name django-container django-app
```
# Try the api
Visit: http://127.0.0.1:8000/api/docs/
