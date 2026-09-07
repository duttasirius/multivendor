import { IProduct } from "@/model/product.model"
import { IUser } from "@/model/user.model"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface IVendorData {
    allVendorsData: IUser[],
    allProductsData:IProduct[]
}
const initialState: IVendorData = {
    allVendorsData: [],
    allProductsData:[]
}
const vendorSlice = createSlice({
    name: "vendor",
    initialState,
    reducers: {
        setAllVendorsData: (state, action: PayloadAction<IUser[]>) => {
            state.allVendorsData = action.payload
        },
        setAllProductsData:(state , action: PayloadAction<IProduct[]>)=>{
            state.allProductsData = action.payload
        }

    }
})
export const { setAllVendorsData } = vendorSlice.actions
export const {setAllProductsData} = vendorSlice.actions
export default vendorSlice.reducer