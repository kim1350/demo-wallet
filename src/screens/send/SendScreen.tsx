import styled from 'styled-components/native';
import { SendForm } from 'src/features/send-form';
import { Screen, Text } from 'src/shared/ui';

const Head = styled.View`
  margin-bottom: ${({ theme }) => theme.space(5)}px;
`;

export const SendScreen = () => (
  <Screen>
    <Head>
      <Text variant="title">Send</Text>
      <Text
        variant="body"
        color="textMuted"
      >
        Transfer assets to any address
      </Text>
    </Head>
    <SendForm />
  </Screen>
);
