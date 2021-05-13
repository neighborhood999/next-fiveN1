import { Flex, Image, Link, Text } from '@chakra-ui/react';

export function Footer() {
  return (
    <Flex p={5} justifyContent="center" width="100%">
      <Image alt="made with love" src="/static/made-with-love.svg" />
      <Text mx={2}>|</Text>
      <Image src="/static/github.svg" />
      <Link
        ml={2}
        isExternal
        href="https://github.com/neighborhood999"
        _hover={{ textDecoration: 'none' }}
      >
        <Text color="#1e8fff">@neighborhood999</Text>
      </Link>
    </Flex>
  );
}
