# Use Node.js LTS (20) image
FROM node:20-alpine AS base

# Install system dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies with force flag
RUN npm install --force

# Builder stage
FROM base AS builder
WORKDIR /app

# Copy dependencies
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXT_SHARP_PATH=/tmp/node_modules/sharp
ENV NEXT_DEBUG 1
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY pk_test_ZXRlcm5hbC1sbGFtYS0yLmNsZXJrLmFjY291bnRzLmRldiQ
ENV IG_PROFILE_ID 17841462236884245
ENV IG_ACCESS_TOKEN EAAWvCnSUHdIBO3cDpOxZAg9jct4QaPQrwOZCLG4OoL1b5rGlsN0WIjfQlUil5y7o9TJlnIq4itNZATXQJZCiaXDX8sfffKdRfPDPBufusyfn44zZCbvuh7x3NknE1R8CrFa01hZCuhZB9BBmH1dXEGBuZCb2LuRv9fSM2ddhZB8OOoouJ4PuBofyTcFAxv48ld3rEeF99qJugiQZDZD

# Clean .next folder and build
RUN rm -rf .next
RUN npm run build


# Runner stage
FROM base AS runner
WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Set up .next directory
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose port and set host
EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Start the application
CMD ["node", "server.js"]