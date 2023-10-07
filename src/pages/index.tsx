import Head from 'next/head';

import HomeLayout from '~/layouts/HomeLayout';

import {ExchangeForm} from '~/components';

import type {AvailableCurrenciesResponse} from '~/types/IExchangeRequests';

export async function getServerSideProps() {
  const res = await fetch('https://api.changenow.io/v1/currencies?active=true&fixedRate=true');
  const data = await res.json();

  return {props: {data}};
}

export default function Page({data}: {data: AvailableCurrenciesResponse[]}) {
  return (
    <>
      <Head>
        <title>Crypto Exchange</title>
      </Head>
      <HomeLayout>
        <h1>Crypto Exchange</h1>
        <p>Exchange fast and easy</p>
        <ExchangeForm currencies={data} />
      </HomeLayout>
    </>
  );
}
