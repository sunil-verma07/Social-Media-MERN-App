import { configureStore } from '@reduxjs/toolkit';
import { authReducer, getUsersReducer,followUsersReducer} from './Reducers/UserReducer';
import { addNewPostReducer, postReducer } from './Reducers/PostReducer';
import { chatReducer } from './Reducers/ChatReducer';

const Store = configureStore( {
    reducer:{
          auth:authReducer,
          post:postReducer,
          newPost:addNewPostReducer,
          getUsers:getUsersReducer,
          followUser:followUsersReducer,
          chat:chatReducer,
    },

});

export default Store;