import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    secret : {}
}

const getScretKey = createSlice({
    name : "sceretkeys",
    initialState,
    reducers : {
        setKeyData : (state,action) => {
            state.secret = action.payload
        }
        },
        
})

export const {setKeyData } = getScretKey.actions;
export default getScretKey.reducer

