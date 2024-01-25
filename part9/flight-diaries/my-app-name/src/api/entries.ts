import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Entry, NewEntry } from '../types';

const getEntries = async () => {
  const res = await axios.get<Entry[]>(`${apiBaseUrl}/diaries`);
  return res.data;
};

const saveEntry = async (entry: NewEntry) => {
  const res = await axios.post(`${apiBaseUrl}/diaries`, entry);
  return res.data;
};

export { getEntries, saveEntry };
