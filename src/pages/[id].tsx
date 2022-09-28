import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { dehydrate, useQuery, QueryClient } from '@tanstack/react-query';
import getPhotoApi, { getQueryKey } from '../api/getPhotoApi';
import styles from '../styles/Home.module.css';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.query?.id as string;

  if (!id) {
    return {
      notFound: true,
    };
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(getQueryKey(id), getPhotoApi);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const PokemonPage = () => {
  const router = useRouter();
  const id = typeof router.query?.id === 'string' ? router.query.id : '';
  const { data: photo } = useQuery(getQueryKey(id), getPhotoApi, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return (
    <div className={styles.main}>
      <div>
        <Link href="/">⬅️ Go back</Link>
      </div>
      <div className={styles.imgWrap}>
        <Image src={photo?.url ?? ''} alt={photo?.title ?? 'Some image'} width={400} height={400} unoptimized />
      </div>
      <h1>{photo?.title ?? 'Some title'}</h1>
    </div>
  );
};

export default PokemonPage;
