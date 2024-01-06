"use client";

import { store } from "@/store/store";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";

type ProvidersProps = {
    children: React.ReactNode;
};

export default function AppProvider({ children }: ProvidersProps) {
    return (
        <Provider store={store}>
            <SessionProvider>{children}</SessionProvider>
        </Provider>
    );
}
