import {
    addCartItemFn,
    getCartFn,
    removeCartItemFn,
    updateCartItemFn
} from '#/features/cart/server/cart.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useCart = (userId: string) => {
    const queryClient = useQueryClient();

    const cart = useQuery({
        queryKey: ['cart', userId],
        queryFn: () => getCartFn({ data: { userId } })
    });

    const addItem = useMutation({
        mutationFn: (productId: string) => addCartItemFn({ data: { userId, productId } }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart', userId] })
    });

    const updateItem = useMutation({
        mutationFn: ({ cartItemId, qty }: { cartItemId: string; qty: number }) =>
            updateCartItemFn({ data: { userId, cartItemId, qty } }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart', userId] })
    });

    const removeItem = useMutation({
        mutationFn: (cartItemId: string) => removeCartItemFn({ data: { userId, cartItemId } }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart', userId] })
    });

    return { cart, addItem, updateItem, removeItem };
};
