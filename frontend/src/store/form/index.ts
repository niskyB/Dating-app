import { JoiError, ReduxAction } from "./../../common/interface/common/redux";
import { FormState } from "./../../common/interface/redux/form";
import { createSlice } from "@reduxjs/toolkit";

const initialState: FormState = {
  errors: {},
};

export const Form = createSlice({
  name: "Form",
  initialState: initialState,
  reducers: {
    resetError: (state: FormState) => {
      return { ...state, errors: {} };
    },
    setError: (state: FormState, { payload }: ReduxAction<JoiError>) => {
      return {
        ...state,
        errors: payload,
      };
    },
  },
  extraReducers: (builder) => {},
});

export const FormAction = { ...Form.actions };
export default Form.reducer;
