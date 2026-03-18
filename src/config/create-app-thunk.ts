import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "./create-store";
import type { Dependencies } from "./dependencies";
import { getErrorState } from "../shared/errors/getErrorState";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  extra: Dependencies;
}>();

interface OwnProps<T> {
  apiCall: Promise<T>;
  rejectWithValue: (value: unknown) => any;
  error?: (data: T) => boolean;
  errorResponse?: (data: T) => Partial<T>;
  onSuccess?: (data: T) => void;
}

export const apiMiddleware = async <T>(
  props: OwnProps<T>
): Promise<ReturnType<typeof props.rejectWithValue> | T> => {
  const { apiCall, rejectWithValue, error, errorResponse, onSuccess } = props;
  try {
    const response = await apiCall;
    if (!!error?.(response)) {
      return rejectWithValue(
        getErrorState(errorResponse?.(response) ?? response)
      );
    }
    onSuccess?.(response);
    return response;
  } catch (error) {
    return rejectWithValue(getErrorState(error));
  }
};
