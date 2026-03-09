import { apiMiddleware, createAppAsyncThunk } from "../../../config/create-app-thunk";
import { GetProfileResponse } from "./GetProfileResponse";

export const GetProfileAsync = createAppAsyncThunk<GetProfileResponse>(
  "get/profile",
  async (_, { extra: { profileGateway }, rejectWithValue }) => {
    return apiMiddleware({
      apiCall: profileGateway.getProfile(),
      rejectWithValue,
    });
  },
);
