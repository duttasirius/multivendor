import { AppDispatch } from '@/redux/store'
import { setAllProductsData } from '@/redux/vendorSlice'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useGetAllProducts() {
    // called currentUser.jsx
  const dispatch = useDispatch<AppDispatch>()
  useEffect(()=>{
        const fetchAllProducts = async()=>{
            try {
                const result = await axios.get('/api/vendor/allProduct')
                dispatch(setAllProductsData(result.data.products))
               
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllProducts()
  },[])
}

export default useGetAllProducts