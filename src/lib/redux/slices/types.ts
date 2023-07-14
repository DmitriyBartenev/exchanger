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

export interface MinExchangeAmountResponse {
  minAmount: number;
}

export interface EstimatedExchangeAmountResponse {
  estimatedAmount: number;
  transactionSpeedForecast: string;
  warningMessage: string | null;
}
