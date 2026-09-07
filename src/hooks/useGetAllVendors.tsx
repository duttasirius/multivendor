'use client'

import { AppDispatch } from '@/redux/store'
import { setAllVendorsData } from '@/redux/vendorSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useGetAllVendors() {
  
     const dispatch = useDispatch<AppDispatch>()
useEffect(()=>{
   

    const fetchAllVendors = async()=>{
        try {
            const result = await axios.get('/api/vendor/allVendor');
           
            dispatch(setAllVendorsData(result.data.vendors))
        } catch (error) {
            console.log(error)
        }
    }
    fetchAllVendors()
},[])


}

export default useGetAllVendors