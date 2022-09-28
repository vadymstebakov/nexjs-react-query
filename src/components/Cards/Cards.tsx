import { memo } from 'react';
import { PhotosType } from '../../types';
import Card from '../Card';

const Cards = ({ list }: { list: PhotosType[] }) => {
  // const { filteredPokemons, setPokemons } = usePokemonsStore();

  // if (filteredPokemons) {
  //   return (
  //     <>
  //       {filteredPokemons.map((item) => (
  //         <Card key={item.id} id={item.id} name={item.name} image={item.image} />
  //       ))}
  //     </>
  //   );
  // }

  return (
    <>
      {list.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          title={item.title}
          url={item.url}
          albumId={item.albumId}
          thumbnailUrl={item.thumbnailUrl}
        />
      ))}
    </>
  );
};

export default memo(Cards);
