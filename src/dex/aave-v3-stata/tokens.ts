import { Network } from '../../constants';
import { StataToken, TokenType } from './types';

export const Tokens: { [network: number]: { [symbol: string]: StataToken } } =
  {};

const TokensByAddress: {
  [network: number]: { [address: string]: StataToken };
} = {};

export function setTokensOnNetwork(network: Network, tokens: StataToken[]) {
  for (let token of tokens) {
    token.address = token.address.toLowerCase();
    token.underlying = token.underlying.toLowerCase();
    token.underlyingAToken = token.underlyingAToken.toLowerCase();

    if (Tokens[network] === undefined) {
      Tokens[network] = {};
    }
    if (TokensByAddress[network] === undefined) {
      TokensByAddress[network] = {};
    }
    Tokens[network][token.stataSymbol] = token;
    TokensByAddress[network][token.address] = token;
    TokensByAddress[network][token.underlying] = token;
    TokensByAddress[network][token.underlyingAToken] = token;
  }
}

export function getTokenType(network: Network, address: string): TokenType {
  const token = TokensByAddress[network]?.[address];
  if (!token) return TokenType.UNKNOWN;
  if (token.address === address) return TokenType.STATA_TOKEN;
  if (token.underlying === address) return TokenType.UNDERLYING;
  return TokenType.A_TOKEN;
}
