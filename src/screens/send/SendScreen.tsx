import { SendForm } from 'src/features/send-form';
import { Screen, Text } from 'src/shared/ui';
import { Head } from './SendScreen.styles';

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
