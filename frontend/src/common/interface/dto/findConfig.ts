import { findConfig } from "../entity/user";

export interface findOptionDTO
  extends Pick<findConfig, "minAge" | "maxAge" | "sex"> {}
