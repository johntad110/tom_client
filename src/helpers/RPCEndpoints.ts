import { isTestnet } from "../config";

export const getTonCenterUrl = () =>
  isTestnet
    ? 'https://testnet.toncenter.com/api/v2/jsonRPC'
    : 'https://toncenter.com/api/v2/jsonRPC';

export const tonScanUrl = () =>
  isTestnet
    ? 'https://testnet.tonscan.org'
    : 'https://tonscan.org'
