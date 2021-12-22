import { FindOption } from "../../common/interface/entity/findOption";

export interface findOptionDTO
  extends Pick<FindOption, "minAge" | "maxAge" | "sexOption"> {}
