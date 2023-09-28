import {Dispatch, SetStateAction, useState} from 'react';

export const useToggleState = (
  initialValue = false,
): [boolean, Dispatch<SetStateAction<boolean>>, () => void] => {
  const [state, setState] = useState<boolean>(initialValue);

  const toggle = () => {
    setState((prev) => !prev);
  };

  return [state, setState, toggle];
};
