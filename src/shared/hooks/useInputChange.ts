import {ChangeEvent, Dispatch, SetStateAction, useState} from 'react';

export const useInputChange = <T>(
  initValue: T,
): [T, Dispatch<SetStateAction<T>>, (event: ChangeEvent<HTMLInputElement>) => void] => {
  const [value, setValue] = useState<T>(initValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    if (typeof initValue === 'object') {
      setValue((prevValue) => ({
        ...prevValue,
        [name]: value,
      }));
    } else {
      setValue(value as T);
    }
  };

  return [value, setValue, handleChange];
};
