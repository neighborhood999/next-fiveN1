import NextLink from 'next/link';
import {
  Button,
  Flex,
  Heading,
  Link,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

export function About() {
  const heading = useBreakpointValue({ base: '4xl', md: '6xl' });
  return (
    <Flex
      direction="column"
      position="relative"
      bgColor="gray.100"
      p={5}
      justifyContent="center"
      alignItems="center"
      height="calc(100vh - 4rem)"
    >
      <Heading as="h1" fontSize={heading}>
        關於本站
      </Heading>

      <Text mt={10} mb={5}>
        提供更簡單友善的操作介面，快速查詢{' '}
        <Link
          color="#1e8fff"
          href="https://rent.591.com.tw"
          isExternal
          _hover={{ textDecoration: 'none' }}
        >
          591 租屋網
        </Link>
        資料。
      </Text>

      <Text>
        <Text as="b">本站所有資訊來源與版權均為 591 租屋網所有</Text>
        ，如果對於網站有任何問題，歡迎來信到{' '}
        <Link
          isExternal
          href="mailto:im@jiepeng.me"
          color="#1e8fff"
          _hover={{ textDecoration: 'none' }}
        >
          im@jiepeng.me
        </Link>
        ，謝謝！
      </Text>

      <NextLink href="/">
        <Flex position="fixed" top={5} left={2}>
          <Button type="button" fontSize="xl">
            <span role="img" aria-label="back">
              ⬅️
            </span>
            <Text as="span" ml={2}>
              返回查詢
            </Text>
          </Button>
        </Flex>
      </NextLink>
    </Flex>
  );
}
