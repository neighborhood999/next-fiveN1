import { Flex } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

import { RentList } from './RentList';

export function SearchResult({ data, isSuccess, ...props }) {
  const ref = useRef();
  useEffect(() => {
    if (data.length > 0 && isSuccess) {
      ref?.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [data, isSuccess]);

  return (
    <Flex ref={ref} direction="column" width="100%">
      <RentList data={data} {...props} />
    </Flex>
  );
}
