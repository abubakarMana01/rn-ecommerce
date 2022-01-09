import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

export type AppContextTypes = {
  cart: {}[];
  setCart: Dispatch<SetStateAction<{}[]>>;
  cartTotal: number;
  setCartTotal: Dispatch<SetStateAction<number>>;
};

export const AppContext = createContext<AppContextTypes | null>(null);

export default function AppProvider({children}: {children: React.ReactNode}) {
  const [cart, setCart] = useState<{}[]>([]);
  const [cartTotal, setCartTotal] = useState(0);

  return (
    <AppContext.Provider
      value={{
        cart,
        setCart,
        cartTotal,
        setCartTotal,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
