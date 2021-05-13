import {
  Button,
  Flex,
  Grid,
  Image,
  Link,
  Spinner,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react';

function Loading({ height = '100vh', size = 'lg', speed = '1s' }) {
  return (
    <Grid height={height} width="100%" placeItems="center">
      <Spinner size={size} speed={speed} />
    </Grid>
  );
}

export function RentList({ data, isFetching, hasNextPage, onNextPage }) {
  if (isFetching && data.length === 0) {
    return <Loading />;
  }

  if (data.length === 0) {
    return null;
  }

  return (
    <Flex direction="column" alignItems="center" py={7}>
      <Grid
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gap={5}
        px={5}
        my={7}
        width="100%"
      >
        {data.map(info => (
          <Flex
            key={info.url}
            position="relative"
            direction="column"
            border="1px solid"
            borderColor="gray.300"
            borderRadius="4px"
          >
            <Flex width="100%" height="320px" overflow="hidden">
              <Image
                alt={info.title}
                src={info.preview || '/image/default.jpg'}
                objectFit="cover"
                width="100%"
              />
            </Flex>

            <Stack p={3} spacing={4}>
              <Tooltip label={info.title}>
                <Text noOfLines={1}>
                  <Text as="span" role="img" aria-label="title" mr={2}>
                    🔶
                  </Text>
                  名稱：{info.title}
                </Text>
              </Tooltip>
              <Tooltip label={info.address}>
                <Text noOfLines={1}>
                  <Text as="span" role="img" aria-label="address" mr={2}>
                    📍
                  </Text>
                  地址：{info.address}
                </Text>
              </Tooltip>
              <Text>
                <Text as="span" role="img" aria-label="price" mr={2}>
                  💰
                </Text>
                租金：{info.price}
              </Text>
              <Text>
                <Text as="span" role="img" aria-label="floor" mr={2}>
                  🔝
                </Text>
                {info.floor}
              </Text>
              <Text>
                <Text as="span" role="img" aria-label="optionType" mr={2}>
                  📦
                </Text>
                類型：{info.optionType}
              </Text>
              <Text>
                <Text as="span" role="img" aria-label="ping" mr={2}>
                  ⬛️
                </Text>
                坪數：{info.ping} 坪
              </Text>

              <Link
                isExternal
                alignSelf="flex-end"
                width="98px"
                href={info.url}
                _hover={{ textDecoration: 'none' }}
              >
                <Button variant="outline">點我前往</Button>
              </Link>
            </Stack>
          </Flex>
        ))}
      </Grid>

      <Button
        type="button"
        visibility={hasNextPage ? 'visible' : 'hidden'}
        isLoading={isFetching}
        onClick={() => onNextPage()}
        width="200px"
      >
        載入更多資訊 👆🏻
      </Button>
    </Flex>
  );
}
