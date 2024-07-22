import axios from "axios";
import { Article } from "../features/states/slice";

const API_URL = "https://dummy-rest-api.specbee.site/api/v1/news";

// Function to fetch articles from the API
export const fetchArticlesAPI = async () => {
  try {
    const response = await axios.get<{ articles: Article[] }>(API_URL); 
    return response.data; 
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    throw error;
  }
};
