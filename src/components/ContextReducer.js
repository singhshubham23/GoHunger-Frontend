import React, { createContext, useContext, useReducer, useEffect } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const loadInitialState = () => {
  try {
    const raw = localStorage.getItem("cart");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const payload = { quantity: 1, ...action.payload };
      // ensure numeric quantity and price
      payload.quantity = Number(payload.quantity) || 1;
      const existingIndex = state.findIndex(
        (item) => item._id === payload._id && item.size === payload.size
      );

      if (existingIndex >= 0) {
        const updated = state.map((item, idx) =>
          idx === existingIndex
            ? { ...item, quantity: item.quantity + payload.quantity }
            : item
        );
        return updated;
      } else {
        return [...state, { ...payload }];
      }
    }

    case "REMOVE":
      return state.filter(
        (item) =>
          !(item._id === action.payload._id && item.size === action.payload.size)
      );

    case "UPDATE_QTY":
      // remove item if quantity <= 0
      return state
        .map((item) =>
          item._id === action.payload._id && item.size === action.payload.size
            ? { ...item, quantity: Number(action.payload.quantity) || 0 }
            : item
        )
        .filter((item) => item.quantity > 0);

    case "CLEAR":
      return [];

    default:
      console.error("Unknown action:", action.type);
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, [], loadInitialState);

  // persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(state));
    } catch (e) {
      console.warn("Could not persist cart", e);
    }
  }, [state]);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartStateContext);
  if (ctx === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
};

export const useCartDispatch = () => {
  const ctx = useContext(CartDispatchContext);
  if (ctx === undefined) {
    throw new Error("useCartDispatch must be used within a CartProvider");
  }
  return ctx;
};
