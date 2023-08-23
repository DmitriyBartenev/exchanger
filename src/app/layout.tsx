import Head from 'next/head';
import {Providers} from '~/lib/providers';

import './styles/globals.css';
import styles from './styles/layout.module.css';

export default function RootLayout(props: React.PropsWithChildren) {
  return (
    <Providers>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <html lang="en">
        <body>
          <section className={styles.container}>
            <main className={styles.main}>{props.children}</main>
          </section>
        </body>
      </html>
    </Providers>
  );
}
