import {
  Box,
  Flex,
  useBreakpointValue,
  useEventListener,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { createURL } from '../utils';
import { useFetch, useOptionsForm } from '../hooks';

import { Banner } from './Banner';
import { SearchResult } from './SearchResult';

export function App() {
  const [page, setNextPage] = useState(0);
  const [options, setOptions] = useState({});
  const [scrollTopVisible, setScrollTopVisible] = useState(false);

  const toast = useToast();
  const iconSize = useBreakpointValue({ base: '4xl', md: '5xl' });
  const { control, formState, setValue, handleSubmit } = useOptionsForm();
  const {
    data,
    error,
    reset: resetFetch,
    isFetching,
    isSuccess,
    totalPages,
  } = useFetch(createURL(page, options), {
    keepPrevious: true,
    enabled: formState.isSubmitted,
  });

  useEventListener('scroll', () => {
    const pageYOffset = window.scrollY;

    if (pageYOffset > 200) {
      setScrollTopVisible(true);
    } else {
      setScrollTopVisible(false);
    }
  });

  useEffect(() => {
    if (error) {
      toast({
        title: '😢 API ERROR! Try again later.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  }, [toast, error]);

  const hasNextPage = !(isSuccess && page + 1 >= totalPages);

  function handleForm(formData) {
    if (formState.isSubmitted) {
      resetFetch();
    }

    setOptions({
      ...formData,
      section: formData.section.join(','),
    });
  }

  function onNextPage() {
    setNextPage(p => p + 1);
  }

  return (
    <Flex
      position="relative"
      direction="column"
      minHeight="100vh"
      maxHeight="100%"
    >
      <Banner
        control={control}
        setValue={setValue}
        isFetching={isFetching}
        onSubmit={handleSubmit(handleForm)}
        onNextPage={onNextPage}
      />

      <SearchResult
        data={data}
        isFetching={isFetching}
        isSuccess={isSuccess}
        onNextPage={onNextPage}
        hasNextPage={hasNextPage}
      />

      <Flex
        position="fixed"
        visibility={scrollTopVisible ? 'visible' : 'hidden'}
        opacity={scrollTopVisible ? 1 : 0}
        bottom={5}
        right={5}
        transition="all 0.2s ease-out"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <Box as="button" fontSize={iconSize}>
          ⬆️
        </Box>
      </Flex>
    </Flex>
  );
}
