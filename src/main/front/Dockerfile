# frontend/Dockerfile

# Stage 1: Build the React app
FROM node:16 AS build

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the React app with Nginx
FROM nginx:alpine
RUN rm /etc/nginx/conf.d/default.conf

# 메인 nginx.conf 파일을 /etc/nginx/nginx.conf로 복사
COPY ./default.conf /etc/nginx/default.conf

# 개별 서버 설정 파일을 conf.d 디렉토리에 복사
COPY ./server.conf /etc/nginx/conf.d/server.conf

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
