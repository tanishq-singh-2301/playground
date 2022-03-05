FROM node:14-alpine as dependencies
WORKDIR /app
COPY package.json ./
RUN npm install

FROM node:14-alpine as builder
WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run build



# Static Build (next export)
RUN npm run build:out

FROM node:12-alpine as runner
WORKDIR /app
ENV NODE_ENV production

RUN npm init -y
RUN npm i -g serve

COPY --from=builder /app/out ./out

EXPOSE 3000
CMD ["serve", "-s", "out"]


# Normal Build
# FROM node:14-alpine as runner
# WORKDIR /app
# ENV NODE_ENV production

# COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package.json ./package.json

# EXPOSE 3000
# CMD ["npm", "start"]



# Standalone Build
# FROM node:14-alpine as runner
# WORKDIR /app
# ENV NODE_ENV production

# COPY --from=builder /app/public ./public
# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# EXPOSE 3000

# ENV PORT 3000

# CMD ["node", "server.js"]