FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build -- --configuration production

FROM nginx:alpine AS runtime
RUN rm /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/digital-wallet-client /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
