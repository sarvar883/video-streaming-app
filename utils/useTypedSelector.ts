import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { RootState } from '../globalState/reducers/index';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;