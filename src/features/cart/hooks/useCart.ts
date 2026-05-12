import {
    addCartItemFn,
    getCartFn,
    removeCartItemFn,
    updateCartItemFn
} from '#/features/cart/server/cart.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';

export const useCart = (userId: string) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const cart = useQuery({
        queryKey: ['cart', userId],
        queryFn: () => getCartFn({ data: { userId } })
    });

    const addItem = useMutation({
        mutationFn: (productId: string) => {
            if (!userId) throw new Error('Not authenticated');
            return addCartItemFn({ data: { userId, productId } });
        },
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart', userId] }),
        onError: () => navigate({ to: '/auth/$pathname', params: { pathname: 'sign-in' } })
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
