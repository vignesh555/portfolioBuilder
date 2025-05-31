'use client';
import userGlobalStore, { IuserGlobalStore } from '@/app/global-store/user-store';
import { IUserResponse } from '@/app/interfaces';
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Spinner from '../ui/spinner';

function Provider({
    children
}: {
    children: React.ReactNode
}) {
    const { user, setUser } = userGlobalStore() as IuserGlobalStore;
    const [isLoading, setIsLoading] = useState(false);

    const fetchUser = useCallback(async () => {
        if (user) {
            return false;
        }
        try {
            setIsLoading(true);
            const data = await fetch('/api/user');
            if (!data.ok) {
                throw new Error('Failed to fetch user');
            }
            const response: IUserResponse = await data.json();
            if (response?.success) {
                setUser(response.data)
            } else {
                throw new Error("Error fetching")
            }
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            } else {
                toast.error("Error fetching user")
            }
        } finally {
            setIsLoading(false);
        }
    }, [setUser, user]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    if (isLoading || (!isLoading && !user)) {
        return (<div className="flex items-center justify-center h-screen">
            <Spinner />
        </div>)
    }
    return (
        <div>
            {children}
        </div>
    )
}

export default Provider