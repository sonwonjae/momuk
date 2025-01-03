import { RQ, ResponseMap, RQDefaultParams } from "./base";
import {
  RQInfinity,
  InfinityResponseMap,
  RQInfinityDefaultParams,
} from "./infinity";

type RQParams<
  TQueryFnData extends ResponseMap[ReqURL],
  ReqURL extends keyof ResponseMap,
> = RQDefaultParams<TQueryFnData, ReqURL>;

export class RQClient<
  ReqURL extends keyof ResponseMap,
  TQueryFnData extends ResponseMap[ReqURL],
> extends RQ<ReqURL, TQueryFnData> {
  constructor({
    url,
    params,
    customQueryOptions,
  }: RQParams<TQueryFnData, ReqURL>) {
    super({ url, params, customQueryOptions });
  }
}

type RQInfinityParams<ReqURL extends keyof InfinityResponseMap> =
  RQInfinityDefaultParams<ReqURL>;

export class RQInfinityClient<
  TQueryFnData extends InfinityResponseMap[ReqURL],
  ReqURL extends keyof InfinityResponseMap,
> extends RQInfinity<ReqURL, TQueryFnData> {
  constructor({ url, params }: RQInfinityParams<ReqURL>) {
    super({ url, params });
  }
}
