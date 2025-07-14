'use client'
import {
    createContext,
    useContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
} from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext(undefined)

export const StateProvider = ({ children }) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [qty, setQty] = useState(1)

    const incrementQty = () => {
        setQty((prevQty) => prevQty + 1)
    }

    const decrementQty = () => {
        setQty((prevQty) => (prevQty > 1 ? prevQty - 1 : 1))
    }

    const addToCart = (product, quantity) => {
        const checkProductInCart = cartItems.find(
            (item) => item._id === product._id
        );
        setTotalPrice((prevTotal) => prevTotal + product.price * quantity);
        setTotalQuantities((prevTotal) => prevTotal + quantity);
        if (checkProductInCart) {
            const updatedCartItems = cartItems.map((item) => {
                if (item._id === product._id) {
                    return {
                        ...item,
                        quantity: item.quantity + quantity
                    }
                }
                return item;
            });
            setCartItems(updatedCartItems);
        } else {
            product.quantity = quantity;
            setCartItems([...cartItems, { ...product }]);
        }
        toast.success(`${quantity} ${product.name} added to the cart.`)

    }

    const toggleCartItemQuantity = (id, value) => {
        const foundProduct = cartItems.find((item) => item._id === id);
        const updatedCartItems = cartItems.map((item) => {
            if (item._id === id) {
                if (value === 'inc') {
                    return { ...item, quantity: item.quantity + 1 }
                } else if (value === 'dec') {
                    if (item.quantity - 1 < 1) {
                        return item;
                    }
                    return { ...item, quantity: item.quantity - 1 }
                }
            }
            return item;
        });
        setCartItems(updatedCartItems);
        setTotalPrice((prevTotal) => {
            const productPrice = foundProduct.price;
            if (value === 'inc') {
                return prevTotal + productPrice;
            } else if (value === 'dec') {
                return prevTotal - productPrice;
            }
            return prevTotal;
        });
        setTotalQuantities((prevTotal) => {
            if (value === 'inc') {
                return prevTotal + 1;
            } else if (value === 'dec') {
                if (foundProduct.quantity - 1 < 1) {
                    return prevTotal;
                }
                return prevTotal - 1;
            }
            return prevTotal;
        });
        if (value === 'dec' && foundProduct.quantity - 1 < 1)
            toast.error(`${foundProduct.name} removed from the cart.`)
        else if (value === 'inc')
            toast.success(`${foundProduct.name} quantity increased.`)
    }

    const onRemove = (product) => {
        const foundProduct = cartItems.find((item) => item._id === product._id);
        const updatedCartItems = cartItems.filter((item) => item._id !== product._id);
        setCartItems(updatedCartItems);
        setTotalPrice((prevTotal) => prevTotal - foundProduct.price * foundProduct.quantity);
        setTotalQuantities((prevTotal) => prevTotal - foundProduct.quantity);
        toast.error(`${foundProduct.name} removed from the cart.`)
    }

    return (
        <CartContext.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incrementQty,
                decrementQty,
                addToCart,
                setShowCart,
                toggleCartItemQuantity,
                onRemove,
                setCartItems,
                setTotalPrice,
                setTotalQuantities,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCartContext = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error('useStateContext must be used within a StateProvider')
    }
    return context
}
