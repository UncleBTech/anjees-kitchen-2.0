# ---- Stage 1: build the Vite frontend ----
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VITE_CONTACT_API_URL=/api/contact
ENV VITE_CONTACT_API_URL=$VITE_CONTACT_API_URL
RUN npm run build

# ---- Stage 2: install the Node backend deps ----
FROM node:20-alpine AS server-builder
WORKDIR /srv
COPY server/package*.json ./
RUN npm install --omit=dev
COPY server/. ./

# ---- Stage 3: runtime image with nginx + node ----
FROM nginx:alpine
RUN apk add --no-cache nodejs
COPY --from=frontend-builder /app/dist /usr/share/nginx/html
COPY --from=frontend-builder /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=server-builder /srv /srv
COPY docker-entrypoint.sh /docker-entrypoint-combined.sh
RUN chmod +x /docker-entrypoint-combined.sh
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1/healthz || exit 1
CMD ["/docker-entrypoint-combined.sh"]
