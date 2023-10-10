import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {MinimalExchangeAmountResponse} from '~/types/IExchangeRequests';

const api_key = process.env.NEXT_PUBLIC_API_KEY;

export const exchangeApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: '/api.changenow.io/v1/'}),
  endpoints: (builder) => ({
    getMinimalExchangeAmount: builder.query<
      MinimalExchangeAmountResponse,
      {from: string; to: string}
    >({
      query: ({from, to}) => `min-amount/${from}_${to}?api_key=${api_key}`,
    }),
  }),
});

export const {useGetMinimalExchangeAmountQuery} = exchangeApi;
