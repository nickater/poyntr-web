import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '.';

// Define a type for the slice state
interface UserState {
  userId: string | null;
  username: string | null;
}

// Define the initial state using that type
const initialState: UserState = {
  userId: null,
  username: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserId: (state, action: PayloadAction<string | null>) => {
      state.userId = action.payload
    },
    setUsername: (state, action: PayloadAction<string | null>) => {
      state.username = action.payload
    }
  },
})

export const { setUserId, setUsername } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const getUserId = (state: RootState) => state.user.userId

export default userSlice.reducer