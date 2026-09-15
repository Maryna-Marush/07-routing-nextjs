import axios from 'axios';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';

interface FetchNotesParams {
  page?: number;
  search?: string;
  tag?: string;
}

export const fetchNotes = async ({ page = 1, search = '', tag }: FetchNotesParams = {}) => {
  const params: Record<string, string | number> = {};

  if (page) params.page = page;
  if (search) params.search = search;
  if (tag && tag.toLowerCase() !== 'all') params.tag = tag;

  const response = await axios.get('/notes', { params });
  return response.data;
};


export const fetchNoteById = async (id: string) => {
  const response = await axios.get(`/notes/${id}`);
  return response.data;
};
