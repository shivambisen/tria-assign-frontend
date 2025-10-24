import axios from "axios";
import type { Contact } from "../types";

const API_URL = "http://localhost:3000"; 

export const getContacts = async (): Promise<Contact[]> => {
  const res = await axios.get(`${API_URL}/contact`);
  return res.data;
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
