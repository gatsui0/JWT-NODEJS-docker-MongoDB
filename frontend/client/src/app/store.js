import {configureStore} from '@reduxjs/toolkit';
import incrementToken from './token/token';

export default configureStore({
    name: 'token',
    reducer: {
        token: incrementToken,
    },
})