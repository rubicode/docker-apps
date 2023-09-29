# Using Docker

bikin untuk masing masing apps

## client
### create image
```
cd docker-apps/client
docker build -t client-react .
```
### build container
```
docker run -p 3000:3000 client-react
```
### create volume (optional)
```
docker run --name client-react-container -p 3000:3000 -v /Users/rubihenjaya/Desktop/docker-apps/client:/app -v /app/node_modules client-react
```


## server
### create image
```
cd docker-apps/server
docker build -t server-odm .
```
### build container
```
docker run -p 3001:3001 server-odm
```
### create volume (optional)
```
docker run --name server-odm-container -p 3000:3000 -v /Users/rubihenjaya/Desktop/docker-apps/server:/app -v /app/node_modules server-odm
```

## Docker Compose

digabung client server dan mongodbnya bisa menggunakan Docker Compose

### build docker
```
cd dockers-apps
docker-compose build
```

### starting the service
```
docker-compose up
```

### stopped the service
```
docker-compose stop
```

## push to dockerhub

### list of images
```
docker images
```
### stop container
```
docker ps
docker container ls -a
docker stop $(docker ps -a -q)  ## stop all running containers
docker rm $(docker ps -a -q) ## delete all stopped containers 
docker rmi <image_id> <image_id> ## delete image, you can using -f options to force delete

```

### after remove, create again with new tagname
```
cd client
docker build -t rubicode/docker-apps:client .
cd ../server
docker build -t rubicode/docker-apps:server .
```

### push to dockerhub
```
docker login
docker push rubicode/docker-apps:client
docker push rubicode/docker-apps:server
```
