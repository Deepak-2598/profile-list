import { configureStore } from '@reduxjs/toolkit'
import commonSlice from './common/commonSlice'
import userSilce from './common/userSilce'

const store = configureStore({ reducer: {
    common: commonSlice,
    user: userSilce,
}})

export default store