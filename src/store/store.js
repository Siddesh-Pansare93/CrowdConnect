import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Features/authSlice";
import eventSlice from "./Features/EventSlice";
import { persistStore, persistReducer } from "redux-persist";  // assuming you use redux-persist
import storage from "redux-persist/lib/storage";  // or another storage if needed

const persistConfig = {
  key: 'root',
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,  // use persisted reducer
    event: eventSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types from redux-persist
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      // Optionally ignore specific state paths if needed
      ignoredPaths: ['auth.register'],
    }
  })
});

export const persistor = persistStore(store);

export default store;
