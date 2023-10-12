import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isAdmin: false,
	error: null,
    user: null,
    token: null,
    items:[]
};


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setItems: (state, action) => {
        	state.items = action.payload.items;
        },
        setUser: (state, action) => {
            state.user = action.payload.user;
        },
        setError: (state, action) => {
            state.error = action.payload.error
        }

    }
});

export const { setLogin,setLogout, setItems, setUser, setPost, setError} = authSlice.actions;
export default authSlice.reducer;