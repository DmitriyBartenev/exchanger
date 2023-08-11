// List of available currencies

export interface AvailableCurrenciesResponse {
  ticker: string;
  name: string;
  image: string;
  hasExternalId: boolean;
  isFiat: boolean;
  featured: boolean;
  isStable: boolean;
  supportsFixedRate: boolean;
}

export interface AvailableCurrenciesError {
  error: string;
}

// Minimal exchange amount

export interface MinimalExchangeAmountResponse {
  minAmount: number;
}

export interface MinimalExchangeAmountQueryParams {
  from: string;
  to: string;
}

export interface MinimalExchangeAmountError {
  error: string;
}

// Estimated exchange amount

export interface EstimatedExchangeAmountResponse {
  estimatedAmount: number;
  transactionSpeedForecast: string;
  warningMessage: string | null;
}

export interface EstimatedExchangeAmountQueryParams {
  send_amount: string;
  from: string;
  to: string;
}

export interface EstimatedExchangeAmountError {
  error: string;
  message: string;
}
