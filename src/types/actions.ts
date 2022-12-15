import { z } from "zod";

export const ActionsLiterals = z.enum([
  "UniV3SwapSetAmountIn",
  "UniV3SwapSetAmountOut",
  "AaveV2Borrow",
  "AaveV2Lend",
  "LidoStake",
  "ConvexStake",
]);

export const Actions = ActionsLiterals.Enum;

export const Venues: Record<z.infer<typeof ActionsLiterals>, string> = {
  LidoStake: "0x5a98fcbea516cf06857215779fd812ca3bef1b32",
  ConvexStake: "0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b",
};

export const ActionPatternMembers = {
  Swap1: [Actions.UniV3SwapSetAmountIn, Actions.UniV3SwapSetAmountOut],
  Lend1: [Actions.AaveV2Lend],
  Borrow1: [Actions.AaveV2Borrow],
  Stake1: [Actions.LidoStake],
};

const _UniV3SwapBase = z.object({
  tokenIn: z.string(),
  tokenOut: z.string(),
  slippage: z.number().optional(),
  feeTier: z.number().optional(),
});

const UniV3SwapSetAmountIn = _UniV3SwapBase.extend({
  action: z.literal(Actions.UniV3SwapSetAmountIn),
  amountIn: z.string(),
  amountOutMinimum: z.string(),
});
export type UniV3SwapSetAmountIn = z.infer<typeof UniV3SwapSetAmountIn>;

const UniV3SwapSetAmountOut = _UniV3SwapBase.extend({
  action: z.literal(Actions.UniV3SwapSetAmountOut),
  amountOut: z.string(),
  amountInMaximum: z.string(),
});
export type UniV3SwapSetAmountOut = z.infer<typeof UniV3SwapSetAmountOut>;

const AaveV2Borrow = z.object({
  action: z.literal(Actions.AaveV2Borrow),
  token: z.string(),
  amount: z.string(),
  interestRateMode: z.enum(["Stable", "Variable"]),
  borrow: z.boolean(),
});
export type AaveV2Borrow = z.infer<typeof AaveV2Borrow>;

const AaveV2Lend = z.object({
  action: z.literal(Actions.AaveV2Lend),
  token: z.string(),
  amount: z.string(),
  deposit: z.boolean(),
});
export type AaveV2Lend = z.infer<typeof AaveV2Lend>;

const LidoStakeParamToken = z.enum([
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
]);

const LidoStake = z.object({
  action: z.literal(Actions.LidoStake),
  token: LidoStakeParamToken,
  amount: z.string(),
});
export type LidoStake = z.infer<typeof LidoStake>;

const ConvexStakeParamToken = z.enum([
  "0xd533a949740bb3306d119cc777fa900ba034cd52",
  "0x4e3fbd56cd56c3e72c1403e103b45db9da5b9d2b",
  "0x06325440d014e39736583c165c2963ba99faf14e",
]);

const ConvexStake = z.object({
  action: z.literal(Actions.ConvexStake),
  token: LidoStakeParamToken,
  amount: z.string(),
});
export type ConvexStake = z.infer<typeof ConvexStake>;

// todo: create or() function to chain an array of these together for readability
export const ActionsSchemas = UniV3SwapSetAmountIn.or(UniV3SwapSetAmountOut)
  .or(AaveV2Borrow)
  .or(AaveV2Lend)
  .or(LidoStake)
  .or(ConvexStake);

export type ActionsSchemas = z.infer<typeof ActionsSchemas>;
