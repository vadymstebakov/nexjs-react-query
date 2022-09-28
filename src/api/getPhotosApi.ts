import type { QueryFunction, QueryKey } from '@tanstack/react-query';
import { PhotosType } from '../types';

export const getQueryKey = () => ['photos'];

const getPhotosApi: QueryFunction<PhotosType[], QueryKey> = ({ signal }): Promise<PhotosType[]> => {
  return fetch('https://jsonplaceholder.typicode.com/photos', {
    signal,
  })
    .then((resp) => resp.json());
};

export default getPhotosApi;
