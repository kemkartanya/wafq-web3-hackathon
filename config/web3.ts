import { configureChains, createClient } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { haqqTestnet } from './chains'; // You'll need to define this

export const { chains, provider, webSocketProvider } = configureChains(
  [haqqTestnet],
  [publicProvider()]
);

export const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});