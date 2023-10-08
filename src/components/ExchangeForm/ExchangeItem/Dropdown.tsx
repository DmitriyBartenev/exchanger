import debounce from 'lodash.debounce';
import Image from 'next/image';
import {useEffect, useRef, useState} from 'react';

import type {AvailableCurrenciesResponse} from '~/types/IExchangeRequests';

import {DropdownCSSTransition, StyledDropdown, StyledNotFoundMessage} from '../styles';

interface DropdownProps {
  showDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectCurrency: (ticker: string, image: string) => void;
  searchValue: string;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  buttonRef: React.MutableRefObject<HTMLButtonElement | null>;
  currencies: AvailableCurrenciesResponse[];
}

export const Dropdown: React.FC<DropdownProps> = ({
  showDropdown,
  onSelectCurrency,
  searchValue,
  inputRef,
  buttonRef,
  setShowDropdown,
  currencies,
}) => {
  const [filteredCurrencies, setFilteredCurrencies] = useState<AvailableCurrenciesResponse[]>([]);
  const [visibleCurrencies, setVisibleCurrencies] = useState<AvailableCurrenciesResponse[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const dropdownRef = useRef<HTMLUListElement | null>(null);

  const itemsPerPage = 10;

  const debouncedFilterCurrencies = debounce((input) => {
    const filtered = currencies.filter((currency) =>
      currency.name.toLowerCase().includes(input.toLowerCase()),
    );
    setFilteredCurrencies(filtered);
  }, 500);

  const handleScroll = () => {
    const dropdownElement = dropdownRef.current;

    if (dropdownElement) {
      const scrolledToBottom =
        dropdownElement.scrollTop + dropdownElement.clientHeight >=
        dropdownElement.scrollHeight - 20;

      const hasMoreItemsToLoad = filteredCurrencies.length > visibleCurrencies.length;

      if (scrolledToBottom && hasMoreItemsToLoad) {
        setCurrentPage((prevPage) => prevPage + 1);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>, ticker: string, image: string) => {
    if (e.key == 'Enter') {
      onSelectCurrency(ticker, image);
    }
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  useEffect(() => {
    if (searchValue) {
      debouncedFilterCurrencies(searchValue);
      setCurrentPage(1);
    } else {
      setFilteredCurrencies(currencies);
    }

    return () => {
      debouncedFilterCurrencies.cancel();
    };
  }, [searchValue, currencies]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const loadedCurrencies = filteredCurrencies.slice(0, endIndex);
    setVisibleCurrencies(loadedCurrencies);
  }, [currentPage, filteredCurrencies]);

  return (
    <DropdownCSSTransition
      in={showDropdown}
      nodeRef={dropdownRef}
      classNames="dropdown-fade"
      timeout={500}
      unmountOnExit
      $filteredCurrencies={filteredCurrencies}
    >
      <StyledDropdown ref={dropdownRef} onScroll={handleScroll}>
        {visibleCurrencies.length > 0 ? (
          visibleCurrencies.map((curr) => (
            <li
              key={curr.ticker}
              onClick={() => onSelectCurrency(curr.ticker, curr.image)}
              onKeyDown={(e) => handleKeyDown(e, curr.ticker, curr.image)}
              tabIndex={0}
            >
              {curr.image && <Image src={curr.image} alt={curr.ticker} width={20} height={20} />}
              {curr.ticker.toUpperCase()}
              <span>{curr.name}</span>
            </li>
          ))
        ) : (
          <StyledNotFoundMessage>No results found</StyledNotFoundMessage>
        )}
      </StyledDropdown>
    </DropdownCSSTransition>
  );
};
