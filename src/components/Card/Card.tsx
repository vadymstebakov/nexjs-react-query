import Image from 'next/image';
import Link from 'next/link';
import { PhotosType } from '../../types';
import styles from './Card.module.css';

const Card = ({ id, title, url }: PhotosType) => {
  return (
    <article className={styles.image}>
      <Link href={`/${id}`}>
        <a>
          <Image alt={title} src={url} width={200} height={200} unoptimized />
        </a>
      </Link>
      <h2>{title}</h2>
    </article>
  );
};

export default Card;
