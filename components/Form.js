import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Controller, useWatch } from 'react-hook-form';

import * as options from '../utils/options';

export function Form({ control, onClose, onSubmit }) {
  const watchedOrder = useWatch({
    control,
    name: 'order',
  });
  const orderByOptions =
    watchedOrder === 'money'
      ? options.orderTypeByMoneyOptions
      : options.orderTypeByTimeOptions;

  return (
    <Stack py={4} direction="column" spacing={4}>
      <Heading as="h3" fontSize="x-large">
        其他選項
      </Heading>
      <Stack direction="row" spacing={3} alignItems="center">
        <Text
          as="span"
          fontSize={{ base: 'x-large', md: 'xx-large' }}
          role="img"
          aria-label="kind"
        >
          🔎
        </Text>
        <Text fontSize="large">我想要</Text>
        <FormControl id="kind" width="150px">
          <Controller
            control={control}
            name="kind"
            render={({ field: { value, onChange } }) => (
              <Select value={value} onChange={onChange}>
                {options.kindOptions.map(kind => (
                  <option key={kind.value} value={kind.value}>
                    {kind.label}
                  </option>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <Text fontSize="large">租屋類型</Text>
      </Stack>

      <Stack direction="row" spacing={3} alignItems="center">
        <Text
          as="span"
          fontSize={{ base: 'x-large', md: 'xx-large' }}
          role="img"
          aria-label="kind"
        >
          🧐
        </Text>
        <Text fontSize="large">依據</Text>

        <FormControl id="order-by" width="100px">
          <Controller
            control={control}
            name="order"
            render={({ field: { value, onChange } }) => (
              <Select value={value} onChange={onChange}>
                {options.orderOptions.map(order => (
                  <option key={order.value} value={order.value}>
                    {order.label}
                  </option>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <Text fontSize="large">由</Text>

        <FormControl id="order-type" width="150px">
          <Controller
            control={control}
            name="orderType"
            render={({ field: { value, onChange } }) => (
              <Select value={value} onChange={onChange}>
                {orderByOptions.map(orderType => (
                  <option key={orderType.value} value={orderType.value}>
                    {orderType.label}
                  </option>
                ))}
              </Select>
            )}
          />
        </FormControl>
      </Stack>

      <FormControl id="sex">
        <FormLabel>性別</FormLabel>
        <Controller
          control={control}
          name="sex"
          render={({ field: { value, onChange } }) => (
            <RadioGroup value={value} onChange={onChange}>
              <Stack direction="row">
                {options.sexOptions.map(gender => (
                  <Radio key={gender.value} value={gender.value}>
                    {gender.label}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          )}
        />
      </FormControl>

      <Divider />

      <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
        <FormControl id="photo">
          <FormLabel>具備房屋照片</FormLabel>
          <Controller
            control={control}
            name="hasImage"
            render={({ field: { value, onChange } }) => (
              <RadioGroup value={value} onChange={onChange}>
                <Stack direction="row">
                  {options.hasImageOptions.map(option => (
                    <Radio key={option.value} value={option.value}>
                      {option.label}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            )}
          />
        </FormControl>

        <FormControl id="illegal-cover">
          <FormLabel>排除頂樓加蓋</FormLabel>
          <Controller
            control={control}
            name="notCover"
            render={({ field: { value, onChange } }) => (
              <RadioGroup value={value} onChange={onChange}>
                <Stack direction="row">
                  {options.notCoverOptions.map(option => (
                    <Radio key={option.value} value={option.value}>
                      {option.label}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            )}
          />
        </FormControl>

        <FormControl id="post-by-owner">
          <FormLabel>屋主自行刊登</FormLabel>
          <Controller
            control={control}
            name="role"
            render={({ field: { value, onChange } }) => (
              <RadioGroup value={value} onChange={onChange}>
                <Stack direction="row">
                  {options.roleOptions.map(option => (
                    <Radio key={option.value} value={option.value}>
                      {option.label}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            )}
          />
        </FormControl>
      </Stack>

      <Divider />

      <Stack direction="row" spacing={3} alignItems="center">
        <Text
          as="span"
          fontSize={{ base: 'x-large', md: 'xx-large' }}
          role="img"
          aria-label="money"
        >
          💵
        </Text>
        <Text fontSize="large">我的預算在</Text>
        <FormControl id="price" width="150px">
          <Controller
            control={control}
            name="rentPrice"
            render={({ field: { value, onChange } }) => (
              <Select value={value} onChange={onChange}>
                {options.rentPriceOptions.map(price => (
                  <option key={price.value} value={price.value}>
                    {price.label}
                  </option>
                ))}
              </Select>
            )}
          />
        </FormControl>

        <Text fontSize="large">元</Text>
      </Stack>

      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={{ base: 4, md: 8 }}
      >
        <Stack direction="row" spacing={3} alignItems="center">
          <Text
            as="span"
            fontSize={{ base: 'x-large', md: 'xx-large' }}
            role="img"
            aria-label="pin"
          >
            📐
          </Text>
          <Text fontSize="large">坪數</Text>
          <FormControl id="price" width="180px">
            <Controller
              control={control}
              name="area"
              render={({ field: { value, onChange } }) => (
                <Select value={value} onChange={onChange}>
                  {options.areaOptions.map(area => (
                    <option key={area.value} value={area.value}>
                      {area.label}
                    </option>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Stack>

        <Stack direction="row" spacing={3} alignItems="center">
          <Text
            as="span"
            fontSize={{ base: 'x-large', md: 'xx-large' }}
            role="img"
            aria-label="floor"
          >
            🏠
          </Text>
          <Text fontSize="large">樓層</Text>
          <FormControl id="price" width="150px">
            <Controller
              control={control}
              name="floor"
              render={({ field: { value, onChange } }) => (
                <Select value={value} onChange={onChange}>
                  {options.floorOptions.map(floor => (
                    <option key={floor.value} value={floor.value}>
                      {floor.label}
                    </option>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Stack>
      </Stack>

      <Divider />

      <Stack direction={{ base: 'column', md: 'row' }} spacing={6}>
        <Stack direction="row" spacing={3} alignItems="center">
          <Text
            as="span"
            fontSize={{ base: 'x-large', md: 'xx-large' }}
            role="img"
            aria-label="shape"
          >
            🏘
          </Text>
          <Text fontSize="large">房屋類型</Text>
          <FormControl id="price" width="150px">
            <Controller
              control={control}
              name="shape"
              render={({ field: { value, onChange } }) => (
                <Select value={value} onChange={onChange}>
                  {options.shapeOptions.map(shape => (
                    <option key={shape.value} value={shape.value}>
                      {shape.label}
                    </option>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Stack>

        <Stack direction="row" spacing={3} alignItems="center">
          <Text
            as="span"
            fontSize={{ base: 'x-large', md: 'xx-large' }}
            role="img"
            aria-label="suppot"
          >
            📦
          </Text>
          <Text fontSize="large">提供設備</Text>
          <FormControl id="price" width="150px">
            <Controller
              control={control}
              name="supportOption"
              render={({ field: { value, onChange } }) => (
                <Select value={value} onChange={onChange}>
                  {options.supportOptions.map(support => (
                    <option key={support.value} value={support.value}>
                      {support.label}
                    </option>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={3} alignItems="center">
        <Text
          as="span"
          fontSize={{ base: 'x-large', md: 'xx-large' }}
          role="img"
          aria-label="others"
        >
          📄
        </Text>
        <Text fontSize="large">提供設備</Text>
        <FormControl id="price" width="150px">
          <Controller
            control={control}
            name="other"
            render={({ field: { value, onChange } }) => (
              <Select value={value} onChange={onChange}>
                {options.otherOptions.map(other => (
                  <option key={other.value} value={other.value}>
                    {other.label}
                  </option>
                ))}
              </Select>
            )}
          />
        </FormControl>
      </Stack>

      <Divider />

      <Flex justifyContent="flex-end">
        <Button
          type="button"
          width="100px"
          colorScheme="red"
          color="red.500"
          border="2px solid"
          borderColor="red.500"
          bgColor="transparent"
          _active={{
            color: 'white',
            bgColor: 'red.400',
          }}
          _hover={{
            color: 'white',
            bgColor: 'red.500',
          }}
          mr={5}
          onClick={onClose}
        >
          取消
        </Button>
        <Button
          type="button"
          width="100px"
          border="2px solid"
          borderColor="blue.500"
          color="blue.500"
          bgColor="transparent"
          onClick={() => {
            onClose();
            onSubmit();
          }}
          _active={{
            color: 'white',
            bgColor: 'blue.400',
          }}
          _hover={{
            color: 'white',
            bgColor: 'blue.500',
          }}
        >
          確認
        </Button>
      </Flex>
    </Stack>
  );
}
