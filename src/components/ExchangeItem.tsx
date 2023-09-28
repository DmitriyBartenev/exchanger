import debounce from 'lodash.debounce';
import Image from 'next/image';
import React, {useEffect, useRef, useState} from 'react';

import {useAppSelector} from '~/redux/hooks';
import {rootSelector} from '~/redux/slices/selectors';
import {AvailableCurrenciesResponse} from '~/redux/slices/types';

import {useInputChange, useToggleState} from '~/shared/hooks';
import {ExchangeInput, SelectCurrencyButton} from '~/shared/ui';

import {
  DropdownCSSTransition,
  StyledDropdown,
  StyledExchangeError,
  StyledExchangeItem,
  StyledExchangeItemBox,
  StyledNotFoundMessage,
} from './styles';

interface ExchangeItemProps {
  handleCurrencyChange: (ticker: string, image: string, index: number) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCurrency: {ticker: string; image: string};
  value: string | undefined;
  isLoadingInput: boolean;
  disabledInput: boolean;
  disabledButton: boolean;
  index: number;
  name: string;
}

export const ExchangeItem: React.FC<ExchangeItemProps> = ({
  handleCurrencyChange,
  onChange,
  selectedCurrency,
  value,
  isLoadingInput,
  disabledInput,
  disabledButton,
  index,
  name,
}) => {
  const [searchValue, _, handleSearchValue] = useInputChange<string>('');
  const [showDropdown, setShowDropdown, toggleDropdown] = useToggleState(false);

  const {isError, availableCurrencies} = useAppSelector(rootSelector);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const onSelectCurrency = (ticker: string, image: string) => {
    handleCurrencyChange(ticker, image, index);
    toggleDropdown();
  };

  useEffect(() => {
    if (showDropdown) {
      inputRef.current?.focus();
    }
  }, [showDropdown]);

  return (
    <StyledExchangeItemBox>
      <StyledExchangeItem $showDropdown={showDropdown} $isError={isError}>
        <ExchangeInput
          value={showDropdown ? searchValue : value ?? ''}
          onChange={showDropdown ? handleSearchValue : onChange}
          placeholder={showDropdown ? 'Search' : ''}
          name={name}
          disabled={showDropdown ? false : disabledInput}
          inputRef={inputRef}
          isLoading={isLoadingInput && !showDropdown}
        />

        <SelectCurrencyButton
          image={selectedCurrency?.image}
          ticker={selectedCurrency?.ticker?.toUpperCase()}
          onClick={toggleDropdown}
          buttonRef={buttonRef}
          showDropdown={showDropdown}
          isLoading={availableCurrencies.status === 'loading'}
          disabled={disabledButton}
        />
      </StyledExchangeItem>
      <Dropdown
        onSelectCurrency={onSelectCurrency}
        showDropdown={showDropdown}
        searchValue={searchValue}
        inputRef={inputRef}
        buttonRef={buttonRef}
        setShowDropdown={setShowDropdown}
      />
      <ExchangeError index={index} />
    </StyledExchangeItemBox>
  );
};

function Dropdown(props: {
  showDropdown: boolean;
  setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectCurrency: (ticker: string, image: string) => void;
  searchValue: string;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  buttonRef: React.MutableRefObject<HTMLButtonElement | null>;
}) {
  const {showDropdown, onSelectCurrency, searchValue, inputRef, buttonRef, setShowDropdown} = props;
  const {availableCurrencies} = useAppSelector(rootSelector);

  const [filteredCurrencies, setFilteredCurrencies] = useState<AvailableCurrenciesResponse[]>([]);
  const [visibleCurrencies, setVisibleCurrencies] = useState<AvailableCurrenciesResponse[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const dropdownRef = useRef<HTMLUListElement | null>(null);

  const itemsPerPage = 10;

  const debouncedFilterCurrencies = debounce((input) => {
    const filtered = availableCurrencies.availableCurrencies.filter((currency) =>
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
      setFilteredCurrencies(availableCurrencies.availableCurrencies);
    }

    return () => {
      debouncedFilterCurrencies.cancel();
    };
  }, [searchValue, availableCurrencies.availableCurrencies]);

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
}

function ExchangeError(props: {index: number}) {
  const {index} = props;
  const {minimalExchangeAmount, estimatedExchangeAmount, availableCurrencies} =
    useAppSelector(rootSelector);

  const errorToRender =
    minimalExchangeAmount.error?.error ||
    availableCurrencies.error?.error ||
    estimatedExchangeAmount.error?.error;

  const renderError = (errorMessage: string) => (
    <StyledExchangeError>{errorMessage}</StyledExchangeError>
  );

  if (index === 1 && errorToRender) return renderError(errorToRender);

  return null;
}
