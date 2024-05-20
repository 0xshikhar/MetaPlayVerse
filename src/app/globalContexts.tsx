"use client";

import { WalletKitProvider } from "@mysten/wallet-kit";
import Navbar from "./components/navbar/Navbar";
import { Toaster } from 'react-hot-toast';
import Footer from "@/app/components/footer/Footer";
import { WalletProvider } from '@suiet/wallet-kit';
import '@suiet/wallet-kit/style.css';
import {
    LivepeerConfig,
    ThemeConfig,
    createReactClient,
} from "@livepeer/react";
import React, { createContext, useMemo } from "react";
import LivepeerClient from "../client/index";

export default function GlobalContexts({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <LivepeerConfig client={LivepeerClient}>
            <WalletProvider>
                <WalletKitProvider>
                    <Toaster position="top-center" toastOptions={{
                        style: {
                            border: '1px solid #713200',
                            color: '#713200',
                        },
                    }} />
                    <Navbar />
                    <main className="min-h-screen">
                        {children}
                    </main>
                    <Footer />
                </WalletKitProvider>
            </WalletProvider>
        </LivepeerConfig>
    );
}
