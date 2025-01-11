# stage 1
FROM node:18 as builder

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build


# stage 2
FROM node:18

WORKDIR /app

COPY --from=builder /app/dist ./dist 
COPY package-lock.json package.json .

RUN apt update && apt install -y ffmpeg
RUN npm install --only=production

EXPOSE 3000

ENTRYPOINT npm run serve