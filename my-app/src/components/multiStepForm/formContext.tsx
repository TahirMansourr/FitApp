'use client'
import React, { createContext, useContext, useState } from "react";

export type User = {
    username: string;
    image: string;
    age: number;
    weight: number;
    height: number;
};

export interface UserContextProps {
    user: User | null;
    updatePropertyForm: (property: User) => void;
}

const initialContext: UserContextProps = {
    user: null,
    updatePropertyForm: () => null,
};

export const FormContext = createContext<UserContextProps | null>(initialContext);

export function useFormContext() {
    const context = useContext(FormContext);
    if (!context) {
        throw new Error("useFormContext must be used within a FormProvider");
    }
    return context;
};

const FormProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    const updatePropertyForm = (property: User) => {
        setUser(property);
    };

    const contextValue = {
        user,
        updatePropertyForm
    };

    return (
        <FormContext.Provider value={contextValue}>
            {children}
        </FormContext.Provider>
    );
};

export default FormProvider;
