import { useForm } from 'react-hook-form';

import { sectionListOptions } from '../utils/options';

const INITIAL_STATE = {
  urlJump: '1',
  section: sectionListOptions['1'].section[0].value,
  kind: '0',
  order: 'posttime',
  orderType: 'desc',
  sex: '0',
  hasImage: '',
  notCover: '',
  role: '',
  rentPrice: '',
  area: '',
  floor: '',
  shape: [],
  supportOption: [],
  other: [],
};

export function useOptionsForm() {
  const form = useForm({
    defaultValues: INITIAL_STATE,
  });

  return form;
}
