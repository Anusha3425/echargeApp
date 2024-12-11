# OCPI Server

A basic OCPI server implementation in Node.js for interoperability in EV charging networks.

## Setup

1. Clone the repository:
   ```bash
   git clone <repo_url>
   cd ocpi-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure `.env` file:
   ```env
   PORT=3000
   BASE_URL=http://localhost:3000/ocpi/2.2.1
   OCPI_TOKEN=your_secure_token
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

- `GET /ocpi/versions`: Returns supported API versions.
- `GET /ocpi/2.2.1/locations`: Returns available charging locations.
