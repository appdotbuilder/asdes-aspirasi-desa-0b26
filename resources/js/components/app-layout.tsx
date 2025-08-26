import React from 'react';
import { AppShell } from '@/components/app-shell';

interface Props {
    children: React.ReactNode;
    breadcrumbs?: Array<{
        title: string;
        href: string;
    }>;
}

export default function AppLayout({ children }: Props) {
    return (
        <AppShell variant="sidebar">
            {children}
        </AppShell>
    );
}