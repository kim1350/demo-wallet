import { useMemo } from 'react';
import { View } from 'react-native';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Asset, useAssets } from '@entities/wallet';
import { useSendMutation } from '@entities/transaction';
import { Button, Card, Icon, Skeleton, Text } from '@shared/ui';
import { formatAmount, shortenAddress } from '@shared/lib/format';
import { SendFormValues } from '../../types';
import { AssetPicker } from '../AssetPicker';
import { Group, Input, SuccessIcon } from './SendForm.styles';

const SendFormFields = ({ assets }: { assets: Asset[] }) => {
  const mutation = useSendMutation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SendFormValues>({
    defaultValues: { assetId: assets[0]?.id ?? '', recipient: '', amount: '' },
  });

  const selectedId = useWatch({ control, name: 'assetId' });
  const selectedAsset = useMemo(
    () => assets.find((a) => a.id === selectedId),
    [assets, selectedId],
  );

  const onSubmit = (values: SendFormValues) =>
    mutation.mutate({
      assetId: values.assetId,
      recipient: values.recipient.trim(),
      amount: Number(values.amount),
    });

  const onSendAnother = () => {
    mutation.reset();
    reset();
  };

  if (mutation.isSuccess) {
    const tx = mutation.data.transaction;
    return (
      <Card>
        <SuccessIcon>
          <Icon
            name="check"
            size={30}
            color="#3FE0D0"
          />
        </SuccessIcon>
        <Text
          variant="title"
          align="center"
        >
          Sent
        </Text>
        <Text
          variant="body"
          color="textMuted"
          align="center"
        >
          {formatAmount(tx.amount, tx.assetTicker)} to {shortenAddress(tx.counterparty)}
        </Text>
        <View style={{ height: 16 }} />
        <Text
          variant="caption"
          color="textMuted"
          align="center"
        >
          {shortenAddress(tx.hash, 10, 8)}
        </Text>
        <View style={{ height: 20 }} />
        <Button
          label="Send another"
          variant="secondary"
          onPress={onSendAnother}
        />
      </Card>
    );
  }

  return (
    <Card>
      <Group>
        <Text
          variant="caption"
          color="textMuted"
        >
          ASSET
        </Text>
        <Controller
          control={control}
          name="assetId"
          render={({ field: { value, onChange } }) => (
            <AssetPicker
              assets={assets}
              selectedId={value}
              onSelect={onChange}
            />
          )}
        />
      </Group>

      <Group>
        <Text
          variant="caption"
          color="textMuted"
        >
          RECIPIENT
        </Text>
        <Controller
          control={control}
          name="recipient"
          rules={{
            required: 'Recipient is required',
            minLength: { value: 8, message: 'Address looks too short' },
          }}
          render={({ field: { value, onChange, onBlur } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="0x…"
              placeholderTextColor="#9B95B8"
              autoCapitalize="none"
              autoCorrect={false}
            />
          )}
        />
        {errors.recipient && (
          <Text
            variant="caption"
            color="danger"
          >
            {errors.recipient.message}
          </Text>
        )}
      </Group>

      <Group>
        <Text
          variant="caption"
          color="textMuted"
        >
          AMOUNT
        </Text>
        <Controller
          control={control}
          name="amount"
          rules={{
            required: 'Amount is required',
            validate: (raw) => {
              const num = Number(raw);
              if (Number.isNaN(num) || num <= 0) return 'Enter a valid amount';
              if (selectedAsset && num > selectedAsset.amount) return 'Insufficient balance';
              return true;
            },
          }}
          render={({ field: { value, onChange, onBlur } }) => (
            <Input
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="0.0"
              placeholderTextColor="#9B95B8"
              keyboardType="decimal-pad"
            />
          )}
        />
        {selectedAsset && (
          <Text
            variant="caption"
            color="textMuted"
          >
            Available: {formatAmount(selectedAsset.amount, selectedAsset.ticker)}
          </Text>
        )}
        {errors.amount && (
          <Text
            variant="caption"
            color="danger"
          >
            {errors.amount.message}
          </Text>
        )}
      </Group>

      {mutation.isError && (
        <Text
          variant="caption"
          color="danger"
        >
          {(mutation.error as Error).message}
        </Text>
      )}

      <View style={{ height: 8 }} />
      <Button
        label="Send"
        onPress={handleSubmit(onSubmit)}
        loading={mutation.isPending}
      />
    </Card>
  );
};

export const SendForm = () => {
  const { data: assets, isLoading } = useAssets();

  if (isLoading || !assets) {
    return (
      <Card>
        <Group>
          <Skeleton
            height={20}
            width="40%"
          />
          <Skeleton height={54} />
        </Group>
        <Skeleton height={54} />
      </Card>
    );
  }

  return <SendFormFields assets={assets} />;
};
