export interface PaginationParams {
  limit: number;
  page: number;
  totalPages: number;
  nextPage: number | null;
}

export interface ListResponse<T> {
  status: string;
  results: number;
  data: {
    songs: T[];
  };
  pagination: PaginationParams;
}

export interface ListParams {
  page?: number;
  pageNumber?: number;
  [key: string]: any;
}

export interface Song {
  id?: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

export interface ArtistStat {
  totalSongs: number;
  artist: string;
  totalAlbums: number;
}

export interface AlbumStat {
  totalSongs: number;
  artist: string;
  album: string;
}

export interface GenreStat {
  _id: string;
  totalSongs: number;
}

export interface SongStats {
  totalSongs: number;
  artistStats: ArtistStat[];
  albumStats: AlbumStat[];
  genreStats: GenreStat[];
}

export interface StatsApiResponse {
  status: string;
  data: SongStats;
}

export interface ApiErrorResponse {
  status: string;
  message: string,
  error: {
      message: string
      statusCode: number,
      status: string,
      isOperational: boolean
  },
  errorStack: string
}