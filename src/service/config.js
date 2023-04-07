const devBaseUrl = "http://8.130.77.212:8080";
const proBaseUrl = "http://8.130.77.212:8080";

export const BASE_URL =
  process.env.NODE_ENV === "development" ? devBaseUrl : proBaseUrl;

export const TIMEOUT = 5000;
