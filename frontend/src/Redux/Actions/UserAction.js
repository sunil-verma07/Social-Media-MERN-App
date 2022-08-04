import {LOGIN_USER_FAIL,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    CLEAR_ERRORS,
    GET_USER_PROFILE_REQUEST,
    GET_USER_PROFILE_SUCCESS,
    GET_USER_PROFILE_FAIL,
    EDIT_USER_PROFILE_REQUEST,
    EDIT_USER_PROFILE_SUCCESS,
    EDIT_USER_PROFILE_FAIL,
    SEARCH_USER_PROFILE_REQUEST,
    SEARCH_USER_PROFILE_SUCCESS,
    SEARCH_USER_PROFILE_FAIL,
    FOLLOW_USER_REQUEST,
    FOLLOW_USER_SUCCESS,
    FOLLOW_USER_FAIL,
    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAIL,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAIL,
    UPDATE_AVATAR_REQUEST,
    UPDATE_AVATAR_SUCCESS,
    UPDATE_AVATAR_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    } from '../Constants/UserContants'

import axios from 'axios'

export const loginUser = (email,password) =>async(dispatch)=>{
try {
    dispatch({type: LOGIN_USER_REQUEST})

    const config ={headers:{'Content-Type': 'application/json'}}

    const {data} = await axios.post('/user/login',{email,password},config)

    dispatch({type: LOGIN_USER_SUCCESS,payload:data})

    
} catch (error) {
    dispatch({type: LOGIN_USER_FAIL,payload:error.response.data.message})
    
}
}

export const registerUser = (name,userName,email,password) => async(dispatch)=>{
    try {
        dispatch({type:REGISTER_USER_REQUEST})
        
        const config ={headers:{'Content-Type': 'application/json'}}

        const {data} = await axios.post('/user/register',{name,userName,email,password},config)

        dispatch({type:REGISTER_USER_SUCCESS,payload:data})

        
    } catch (error) {
        dispatch({type:REGISTER_USER_FAIL,payload:error.response.data.message})        
    }
}

export const loadUser = ()=>async(dispatch)=>{
   try {
    dispatch({type:LOAD_USER_REQUEST})

    const {data} = await axios.get('/user/profile')

    dispatch({type:LOAD_USER_SUCCESS,payload:data.user})
    
   } catch (error) {

    dispatch({type:LOAD_USER_FAIL,payload:error.response.message})
    
   }
}

export const getUserProfile = (id)=>async(dispatch)=>{
    try {
        dispatch({type:GET_USER_PROFILE_REQUEST})

        const {data} = await axios.get(`/user/search/${id}`)

        dispatch({type:GET_USER_PROFILE_SUCCESS,payload:data.user})
        
        
    } catch (error) {

        dispatch({type:GET_USER_PROFILE_FAIL,payload:error.response.message})
        
    }
}

export const editUserProfile = (name,userName,email)=>async(dispatch)=>{
    try {

        dispatch({type:EDIT_USER_PROFILE_REQUEST})
        
        const config ={headers:{'Content-Type': 'application/json'}}

        const {data} = await axios.put('/user/update/profile',{name,email,userName},config)

        dispatch({type:EDIT_USER_PROFILE_SUCCESS,payload:data.user})

    } catch (error) {

        dispatch({type:EDIT_USER_PROFILE_FAIL,payload:error.response.data.message})
        
    }
}

export const searchUserProfile = (userName)=>async(dispatch)=>{
    try {

        dispatch({type:SEARCH_USER_PROFILE_REQUEST})

        const {data} = await axios.get(`/user/search?userName=${userName}`)
        
        dispatch({type:SEARCH_USER_PROFILE_SUCCESS,payload:data.users})
        
    } catch (error) {
        dispatch({type:SEARCH_USER_PROFILE_FAIL,payload:error.response.data.message})

    }
}

export const followUser = (userId)=>async(dispatch)=>{
    try {
        dispatch({type:FOLLOW_USER_REQUEST})

        const {data} = await axios.get(`/user/follow/${userId}`)

        dispatch({type:FOLLOW_USER_SUCCESS,payload:data})

    } catch (error) {

        dispatch({type:FOLLOW_USER_FAIL,payload:error.response.message})
        
    }
}

export const logoutUser = ()=>async(dispatch)=>{
    try {
        dispatch({type:LOGOUT_USER_REQUEST})

        const {data} = await axios.get('/user/logout')

        dispatch({type:LOGOUT_USER_SUCCESS,payload:data})
        
    } catch (error) {

        dispatch({type:LOGOUT_USER_FAIL,payload:error.response.data.message})
        
    }
}
export const changePassword = (oldPassword,newPassword)=>async(dispatch)=>{
    try {
        dispatch({type:CHANGE_PASSWORD_REQUEST})

        const config ={headers:{'Content-Type': 'application/json'}}

        const {data} = await axios.put('/user/update/password',{oldPassword,newPassword},config)

        dispatch({type:CHANGE_PASSWORD_SUCCESS,payload:data})
        
    } catch (error) {

        dispatch({type:CHANGE_PASSWORD_FAIL,payload:error.response.data.message})
        
    }
}

export const updateAvatar = (avatar)=>async(dispatch)=>{
    try {
        dispatch({type:UPDATE_AVATAR_REQUEST})

        const {data} = await axios.put('/user/update/avatar',{avatar})

        dispatch({type:UPDATE_AVATAR_SUCCESS,payload:data.message})
        console.log(data.message)
        
    } catch (error) {

        dispatch({type:UPDATE_AVATAR_FAIL,payload:error.response.data.message})
    }
}

export const removeUser = ()=> async(dispatch)=>{
    try {
        dispatch({type:DELETE_USER_REQUEST})

        const {data} = await axios.delete('/user/remove')

        dispatch({type:DELETE_USER_SUCCESS,payload:data.message})
        
    } catch (error) {
        dispatch({type:DELETE_USER_FAIL,payload:error.response.data.message})
    }
}
export const clearErrors = ()=>(dispatch)=>{
    dispatch({ type:CLEAR_ERRORS})
  }

  
