import {
    addCartItemFn,
    getCartFn,
    removeCartItemFn,
    updateCartItemFn
} from '#/features/cart/server/cart.api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { toast } from 'sonner';

export const useCart = (userId: string) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleAuthError = (err: Error) => {
        if (err.message === 'Not authenticated') {
            navigate({ to: '/auth/$pathname', params: { pathname: 'sign-in' } });
            return true;
        }

        return false;
    };

    const cart = useQuery({
        queryKey: ['cart', userId],
        queryFn: () => getCartFn({ data: { userId } }),
        enabled: !!userId
    });

    const addItem = useMutation({
        mutationFn: (productId: string) => {
            if (!userId) throw new Error('Not authenticated');
            return addCartItemFn({ data: { userId, productId } });
        },
        onSuccess: () => {
            toast.success('Added to cart');
            return queryClient.invalidateQueries({ queryKey: ['cart', userId] });
        },
        onError: (err) => {
            if (!handleAuthError(err)) toast.error(err.message);
        }
    });

    const updateItem = useMutation({
        mutationFn: ({ cartItemId, qty }: { cartItemId: string; qty: number }) =>
            updateCartItemFn({ data: { userId, cartItemId, qty } }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart', userId] }),
        onError: (err) => {
            if (!handleAuthError(err)) toast.error(err.message);
        }
    });

    const removeItem = useMutation({
        mutationFn: (cartItemId: string) => removeCartItemFn({ data: { userId, cartItemId } }),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart', userId] }),
        onError: (err) => {
            if (!handleAuthError(err)) toast.error(err.message);
        }
    });

    return { cart, addItem, updateItem, removeItem };
};
