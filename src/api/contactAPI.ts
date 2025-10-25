import axios from "axios";
import type { Contact } from "../types";

const API_URL = import.meta.env.VITE_BACKEND_URL ; 
console.log("hi",API_URL)

export const getContacts = async (page = 1, limit = 6): Promise<{
    data: Contact[];
    total: number;
    page: number;
    totalPages: number;
  }> => {
    const res = await axios.get(`${API_URL}/contact`, {
      params: { page, limit },
    });
    return res.data; // expects { data, total, page, totalPages }
  };

export const createContact = async (contact: Omit<Contact, "id">): Promise<Contact> => {
  const res = await axios.post(`${API_URL}/contact`, contact);
  return res.data;
};

export const searchContacts = async (query: string): Promise<Contact[]> => {
  const res = await axios.get(`${API_URL}/contact/search`, { params: { query } });
  return res.data;
};

export const updateContact = async (id: number, data: Partial<Contact>): Promise<Contact> => {
  const res = await axios.put(`${API_URL}/contact/${id}`, data);
  return res.data;
};

export const deleteContact = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/contact/${id}`);
};
