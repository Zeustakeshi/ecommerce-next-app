import { RootState } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface UserState {
    user: {
        username: string;
        email: string;
        phone: number;
        image: string;
        address: string;
        role: "USER" | "SHOP"[];
    } | null;
}

// Define the initial state using that type
const initialState: UserState = {
    user: null,
};

export const userSlice = createSlice({
    name: "user",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        saveUser(state, action: PayloadAction<string>) {
            console.log({ action });
        },
    },
});

export const { saveUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
