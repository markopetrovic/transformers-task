import axios from "axios";
import type { Transformer } from "../types/transformer";

const API_URL = import.meta.env.VITE_API_URL;

export const api = {
  getTransformers(): Promise<Transformer[]> {
    return axios.get(`${API_URL}/transformers`);
  },
};