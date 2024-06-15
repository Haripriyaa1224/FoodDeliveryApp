import React, { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";


export const StoreContext = createContext(null);

//ProviderFunction


const StoreContextProvider = (props)=>{

    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState('');

    const url = "http://localhost:10000";

    //addtocart functionality
    const addToCart =(itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev, [itemId]: 1}))
        }
        else{
            setCartItems((prev)=>({...prev, [itemId]:prev[itemId]+1}))
        }
    }

    //remove cart

    const removeFromCart =(itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}))
    }

    // useEffect(()=>{
    //     console.log(cartItems)
    // },[cartItems])

    //carttotal

    const getTotalCartAmount =()=>{
        let totalAmount = 0;
        for (const item in cartItems){
            if(cartItems[item]>0){
                let itemInfo = food_list.find((product)=>product._id === item)
                totalAmount += itemInfo.price*cartItems[item];
            }
            
        }
        return totalAmount;
    }

const contextValue = {
food_list,
cartItems,
setCartItems,
addToCart,
removeFromCart,
getTotalCartAmount,
url,
token,
setToken
}

return(
    <StoreContext.Provider value={contextValue}>
        {props.children}
    </StoreContext.Provider>
)
}

export default StoreContextProvider;