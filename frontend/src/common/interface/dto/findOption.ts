import { findOption } from "../entity/user";

export interface findOptionDTO
  extends Pick<findOption, "minAge" | "maxAge" | "sexOption"> {}
