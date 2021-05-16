import Link from 'next/link';
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { Controller, useWatch } from 'react-hook-form';

import { sectionListOptions, urlJumpOptions } from '../utils/options';

import { Form } from './Form';

export function Banner({ control, isFetching, setValue, onSubmit }) {
  const watchedSection = useWatch({
    control,
    name: 'section',
  });
  const isSectionEmpty = watchedSection;

  const optionsModal = useDisclosure();
  const drawer = useDisclosure();
  const buttonSize = useBreakpointValue({ base: 'sm', md: 'md' });
  const headingSize = useBreakpointValue({ base: '4xl', md: '5xl', lg: '6xl' });

  return (
    <Grid
      bgColor="gray.100"
      position="relative"
      p={5}
      placeItems="center"
      height="100vh"
    >
      <Stack spacing={{ base: 7, lg: 10 }} direction="column">
        <Text as="h1" color="black" textAlign="center" fontSize={headingSize}>
          租屋搜尋
          <span role="img" aria-label="search">
            🔎
          </span>
        </Text>

        <Stack
          as="form"
          direction={{ base: 'column', md: 'row' }}
          spacing={10}
          onSubmit={onSubmit}
        >
          <Flex>
            <Controller
              control={control}
              name="urlJump"
              render={({ field: { onChange } }) => (
                <Select
                  width="200px"
                  borderColor="gray.300"
                  onChange={event => {
                    const cityID = event.currentTarget.value;

                    onChange(cityID);
                    setValue('section', null);
                  }}
                  _focus={{ borderWidth: '2px', borderColor: 'blue.400' }}
                >
                  {urlJumpOptions.map(jump => (
                    <option key={jump.value} value={jump.value}>
                      {jump.label}
                    </option>
                  ))}
                </Select>
              )}
            />

            <Button
              ml={3}
              type="button"
              colorScheme="blue"
              bgColor="blue.400"
              onClick={event => {
                event.preventDefault();
                drawer.onOpen();
              }}
            >
              選擇鄉鎮 {!isSectionEmpty ? null : `(${watchedSection?.length})`}
            </Button>
          </Flex>

          <Button
            type="submit"
            isLoading={isFetching}
            border="2px solid"
            borderColor="transparent"
            _hover={{
              borderColor: 'black',
            }}
          >
            搜尋
          </Button>
        </Stack>
      </Stack>

      <Link href="/about" passHref>
        <Button
          position="absolute"
          top={5}
          right={5}
          p={2}
          size={buttonSize}
          color="white"
          bgColor="purple.300"
          fontWeight="bold"
          borderRadius="md"
          sx={{
            _hover: {
              bgColor: 'purple.400',
            },
            _active: {
              bgColor: 'purple.500',
            },
          }}
        >
          關於本站
        </Button>
      </Link>

      <Button
        type="button"
        position="absolute"
        bottom={10}
        right={5}
        onClick={() => optionsModal.onOpen()}
      >
        <span role="img" aria-label="collapse">
          ➕
        </span>
        <Text ml={2}>其他選項</Text>
      </Button>

      <OptionsModal
        control={control}
        modal={optionsModal}
        onSubmit={onSubmit}
      />

      <SectionDrawer control={control} drawer={drawer} />
    </Grid>
  );
}

function OptionsModal({ control, modal, onSubmit }) {
  return (
    <Modal {...modal} autoFocus={false} closeOnOverlayClick={false} size="3xl">
      <ModalOverlay>
        <ModalContent
          my={{ base: 0, md: 9 }}
          maxHeight={{ base: '100%', md: 'calc(100vh - 100px)' }}
          overflowY="scroll"
        >
          <ModalCloseButton />
          <ModalBody>
            <Form
              control={control}
              onClose={modal.onClose}
              onSubmit={onSubmit}
            />
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
}

function SectionDrawer({ control, drawer }) {
  const watchedURLJump = useWatch({
    control,
    name: 'urlJump',
  });

  return (
    <Drawer isOpen={drawer.isOpen} placement="right" onClose={drawer.onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>請選擇鄉鎮</DrawerHeader>
        <DrawerBody>
          <Grid templateColumns="repeat(3, 1fr)" width="100%">
            <Controller
              control={control}
              name="section"
              render={({ field: { value, onChange } }) => (
                <CheckboxGroup defaultValue={value} onChange={v => onChange(v)}>
                  {sectionListOptions[Number(watchedURLJump)].section.map(
                    section => (
                      <Checkbox key={section.value} value={section.value}>
                        {section.label}
                      </Checkbox>
                    )
                  )}
                </CheckboxGroup>
              )}
            />
          </Grid>
        </DrawerBody>
        <DrawerFooter>
          <Button onClick={drawer.onClose}>完成</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
