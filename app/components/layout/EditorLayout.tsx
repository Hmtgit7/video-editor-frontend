// app/components/layout/EditorLayout.tsx
'use client';

import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export function EditorLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen bg-gray-950 text-white">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-hidden">{children}</main>
            </div>
        </div>
    );
}