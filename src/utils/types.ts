import {
  TypedUseSelectorHook,
  useSelector as selectorHook,
  useDispatch as dispatchHook,
} from "react-redux";
import rootReducer from "../services/reducers/rootReducer";
import { TConstructorActions } from "../services/constructorSlice";
import { TIngredientDetailsActions } from "../services/ingredientDetailsSlice";
import { TIngredientsActions } from "../services/ingredientsSlice";
import { TOrderDetailsActions } from "../services/orderSlice";
import { TUserActions } from "../services/userSlice";
import { TLiveTableActions } from "../services/live-table/actions";
import { TLiveTableProfileActions } from "../services/profile-live-table/actions";
import { ThunkAction } from "redux-thunk";
import type {} from "redux-thunk/extend-redux";

export type TAppActions =
  | TConstructorActions
  | TIngredientDetailsActions
  | TIngredientsActions
  | TOrderDetailsActions
  | TUserActions
  | TLiveTableActions
  | TLiveTableProfileActions;

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    TAppActions
>;

type AppDispatch<TReturnType = void> = (
    action: TAppActions | AppThunk<TReturnType>
) => TReturnType;

export type RootState = ReturnType<typeof rootReducer>;
export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;


export const WebsocketStatus  = {
  CONNECTING:  'CONNECTING...',
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE'
}