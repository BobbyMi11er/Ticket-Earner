# Use an official node image as the base image
FROM node:14

# Set the working directory to /app
WORKDIR /Ticket-Earner

# Copy both client and server package.json files separately
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install client dependencies
RUN cd client && npm install

# Install server dependencies
RUN cd server && npm install

# Copy the entire application code into the container
COPY . .

# Build the React app (this will create the static files for production)
RUN cd client && npm run build

# Serve the built React static files through Express in production
WORKDIR /app/server

# Expose the server port (assuming it runs on port 5000)
EXPOSE 8000

# Command to run both client and server concurrently
CMD ["sh", "-c", "cd server && npm start & cd ../client && npm start"]
