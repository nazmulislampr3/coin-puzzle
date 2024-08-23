export type CoinGrid = undefined | 1 | 2;
export type Player = 1 | 2;
export type Coin = {
  player?: Player;
  index: number;
  xIndex: number;
};
