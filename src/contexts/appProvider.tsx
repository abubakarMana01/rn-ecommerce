import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
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

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const res = await fetch('https://fakestoreapi.com/products/?limit=3');
        const data = await res.json();
        setCart(data);

        let sum = 0;
        for (let i = 0; i < data.length; i++) {
          sum += data[i].price;
        }
        setCartTotal(sum);
      } catch (err: any) {
        console.log(err.message);
      }
    }

    fetchCartItems();
  }, []);

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
