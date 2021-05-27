import { useForm } from 'react-hook-form';

export const INITIAL_STATE = {
  urlJump: '1',
  section: null,
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
  // TODO: can select multiple options
  shape: '',
  supportOption: '',
  other: '',
};

export function useOptionsForm() {
  const form = useForm({
    defaultValues: INITIAL_STATE,
  });

  return form;
}
