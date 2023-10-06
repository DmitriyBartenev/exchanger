import {Provider} from 'react-redux';

import store from '~/redux/store';

import {Container, Main} from './styles';

export default function HomeLayout(props: React.PropsWithChildren) {
  return (
    <Provider store={store}>
      <Container>
        <Main>{props.children}</Main>
      </Container>
    </Provider>
  );
}
