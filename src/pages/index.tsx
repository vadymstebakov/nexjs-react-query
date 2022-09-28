import { useEffect, useMemo, useState, useTransition } from 'react';
import { dehydrate, useQuery, QueryClient } from '@tanstack/react-query';
import getPhotosApi, { getQueryKey } from '../api/getPhotosApi';
import Cards from '../components/Cards';
import styles from '../styles/Home.module.css';

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  queryClient.setDefaultOptions({
    queries: {
      cacheTime: 1000,
    },
  });
  await queryClient.prefetchQuery(getQueryKey(), getPhotosApi, { cacheTime: 1000 });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const Home = () => {
  const { data: photos } = useQuery(getQueryKey(), getPhotosApi, {
    cacheTime: 1000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
  const [isLoading, startTransition] = useTransition();
  const [localValueFilter, setLocalValueFilter] = useState<string>('');
  const [filter, setFilter] = useState('');
  const filteredPhotos = useMemo(
    () => photos?.filter((p) => p.title.toLowerCase().includes(filter.toLowerCase())) ?? [],
    [filter, photos]
  );

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValueFilter(e.target.value);
    startTransition(() => {
      setFilter(e.target.value);
    });
  };

  return (
    <div className={styles.main}>
      <div>
        <input type="text" value={localValueFilter} onChange={changeHandler} className={styles.search} />
      </div>
      <div className={styles.container}>{isLoading ? <p>Loading...</p> : <Cards list={filteredPhotos} />}</div>
    </div>
  );
};

export default Home;
