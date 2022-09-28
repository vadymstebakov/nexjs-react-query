import type { QueryFunction, QueryKey } from '@tanstack/react-query';
import { PhotosType } from '../types';

export const getQueryKey = (id: string) => ['photo', id];

const getPhotoApi: QueryFunction<PhotosType, QueryKey> = ({ signal, queryKey }): Promise<PhotosType> => {
  const [, id] = queryKey;
  return fetch(`https://jsonplaceholder.typicode.com/photos/${id}`, {
    signal,
  }).then((resp) => resp.json());
};

export default getPhotoApi;
