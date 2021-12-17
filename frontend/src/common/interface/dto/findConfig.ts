import { findConfig } from "./../entity/findConfig";
export interface findOptionDTO
  extends Pick<findConfig, "minAge" | "maxAge" | "sex"> {}
