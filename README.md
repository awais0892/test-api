# Node.js Back-End Test

## Description

This project implements a simple RESTful API using Node.js and Express.js that communicates with the Calendarific API to retrieve holidays for a specific country and year.

## API Endpoints

- `GET /holidays?country=PAK&year=2024`: Fetch holidays for the specified country and year.
- `GET /countries`: Fetch the list of supported countries from the Calendarific API.

## Data Handling

- Fetch holiday data from the Calendarific API.
- Cache responses using in-memory cache or Redis.

## Tech Stack

- Node.js
- Express.js
- Axios or node-fetch
- (Optional) Redis or node-cache for caching

## Configuration

- Store the Calendarific API key securely using environment variables (e.g., using dotenv).
- Create a configuration file or environment setup to handle the API URL, cache TTL, etc.

## Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/your-repository.git
    cd your-repository
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables in a `.env` file:
    ```plaintext
    CALENDARIFIC_API_KEY=your_api_key
    ```

4. Start the server:
    ```bash
    npm start
    ```

## Testing

- Write unit tests for the API using Jest or Mocha.
- Ensure proper error handling for API failures and invalid inputs.

## License

This project is licensed under the MIT License.
