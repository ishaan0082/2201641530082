import axios from 'axios';

// The endpoint for the logging service.
const LOG_API_URL = 'http://20.244.56.144/evaluation-service/logs';

// --- IMPORTANT ---
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJpc2hhYW5zYWh1MjEwQGdtYWlsLmNvbSIsImV4cCI6MTc1NzMyMDYwNSwiaWF0IjoxNzU3MzE5NzA1LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNGE5YTRjODctYjNmNy00YjYxLThhYWMtZTQwYWY2OTVjY2NhIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiaXNoYWFuIHNhaHUiLCJzdWIiOiI3OTI4ZWI4MS1jNWM1LTQ5NjEtOGRiZS1kYmFmYTc3Yjk2MTEifSwiZW1haWwiOiJpc2hhYW5zYWh1MjEwQGdtYWlsLmNvbSIsIm5hbWUiOiJpc2hhYW4gc2FodSIsInJvbGxObyI6IjIyMDE2NDE1MzAwODIiLCJhY2Nlc3NDb2RlIjoic0FXVHVSIiwiY2xpZW50SUQiOiI3OTI4ZWI4MS1jNWM1LTQ5NjEtOGRiZS1kYmFmYTc3Yjk2MTEiLCJjbGllbnRTZWNyZXQiOiJWV0haa1ZQU0JtcUhlRHpjIn0.Nn_tO52VLMOnKe7sbMQts8jxA_6Prwg5zo_llBhnzAw";

/**
 * Sends a log message to the evaluation service.
 * @param {'debug' | 'info' | 'warn' | 'error' | 'fatal'} level - The severity level of the log.
 * @param {'component' | 'hook' | 'page' | 'state' | 'style' | 'api' | 'utils'} pkg - The part of the frontend the log is from.
 * @param {string} message - The descriptive log message.
 */
export const sendLog = async (level, pkg, message) => {
  // Do not send logs if the token is not set.
  if (AUTH_TOKEN === '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJpc2hhYW5zYWh1MjEwQGdtYWlsLmNvbSIsImV4cCI6MTc1NzMyMDYwNSwiaWF0IjoxNzU3MzE5NzA1LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNGE5YTRjODctYjNmNy00YjYxLThhYWMtZTQwYWY2OTVjY2NhIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiaXNoYWFuIHNhaHUiLCJzdWIiOiI3OTI4ZWI4MS1jNWM1LTQ5NjEtOGRiZS1kYmFmYTc3Yjk2MTEifSwiZW1haWwiOiJpc2hhYW5zYWh1MjEwQGdtYWlsLmNvbSIsIm5hbWUiOiJpc2hhYW4gc2FodSIsInJvbGxObyI6IjIyMDE2NDE1MzAwODIiLCJhY2Nlc3NDb2RlIjoic0FXVHVSIiwiY2xpZW50SUQiOiI3OTI4ZWI4MS1jNWM1LTQ5NjEtOGRiZS1kYmFmYTc3Yjk2MTEiLCJjbGllbnRTZWNyZXQiOiJWV0haa1ZQU0JtcUhlRHpjIn0.Nn_tO52VLMOnKe7sbMQts8jxA_6Prwg5zo_llBhnzAw"') {
    console.warn('Auth token not set in logger.js. Log will not be sent.');
    return;
  }

  try {
    const response = await axios.post(
      LOG_API_URL,
      {
        stack: 'frontend',
        level: level,
        package: pkg,
        message: message,
      },
      {
        headers: {
          'Authorization': `Bearer ${AUTH_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    // Log the success message from the server to the browser console for debugging.
    console.log('Log sent successfully:', response.data);
  } catch (error) {
    // Log any errors during the API call to the browser console.
    console.error(
      'Failed to send log:',
      error.response ? error.response.data : error.message
    );
  }
};
