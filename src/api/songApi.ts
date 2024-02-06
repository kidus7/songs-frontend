
import axiosClient from './axiosClient';
import { ListParams, ListResponse, Song } from 'models/song';

const songsApi = {
  getSongs(params: ListParams): Promise<ListResponse<Song>> {
    const url = '/song';
    return axiosClient.get(url, {
      params,
    });
  },

  getStats(): Promise<Song> {
    const url = '/song/stats';
    return axiosClient.get(url);
  },

  getSongById(id: string): Promise<Song> {
    const url = `/song/${id}`;
    return axiosClient.get(url);
  },

  createSong(data: Song): Promise<Song> {
    const url = '/song';
    return axiosClient.post(url, data);
  },

  updateSong(id: string, data: Partial<Song>): Promise<Song> {
    const url = `/song/${id}`;
    return axiosClient.patch(url, data);
  },

  deleteSong(id: string): Promise<any> { 
    const url = `/song/${id}`;
    return axiosClient.delete(url);
  },
};

export default songsApi;
