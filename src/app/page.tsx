import {Metadata} from 'next';

import {Calculator} from './components/Calculator/Calculator';

export const metadata: Metadata = {
  title: 'Crypto Exchange',
  description: 'Crypto Exchange Calculator',
  applicationName: 'Crypto Exchanger',
  keywords: ['Crypto', 'React', 'Calcualator', 'JavaScript', 'Exchange', 'Bitcoin', 'Ethereum'],
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function IndexPage() {
  return <Calculator />;
}
