import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

interface Complaint {
    id: number;
    title: string;
    location: string;
    category: string;
    priority: string;
    status: string;
    reporter_name: string;
    reporter_email: string;
    created_at: string;
    updated_at: string;
}

interface Stats {
    total: number;
    pending: number;
    in_progress: number;
    resolved: number;
    rejected: number;
}

interface Props {
    complaints: {
        data: Complaint[];
        links: Array<{
            active: boolean;
            label: string;
            url: string | null;
        }>;
        meta: {
            current_page: number;
            total: number;
        };
    };
    stats: Stats;
    categoryStats: Record<string, number>;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard Admin',
        href: '/dashboard',
    },
];

export default function Dashboard({ complaints, stats, categoryStats }: Props) {
    const getStatusColor = (status: string) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            in_progress: 'bg-blue-100 text-blue-800',
            resolved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const getPriorityColor = (priority: string) => {
        const colors = {
            low: 'bg-green-100 text-green-800',
            medium: 'bg-yellow-100 text-yellow-800',
            high: 'bg-orange-100 text-orange-800',
            urgent: 'bg-red-100 text-red-800',
        };
        return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const getStatusText = (status: string) => {
        const texts = {
            pending: 'Menunggu',
            in_progress: 'Sedang Ditangani',
            resolved: 'Selesai',
            rejected: 'Ditolak',
        };
        return texts[status as keyof typeof texts] || status;
    };

    const getPriorityText = (priority: string) => {
        const texts = {
            low: 'Rendah',
            medium: 'Sedang',
            high: 'Tinggi',
            urgent: 'Mendesak',
        };
        return texts[priority as keyof typeof texts] || priority;
    };

    const getCategoryIcon = (category: string) => {
        const icons = {
            road: '🛣️',
            water: '💧',
            electricity: '⚡',
            bridge: '🌉',
            drainage: '🚰',
            public_facility: '🏛️',
            other: '📋',
        };
        return icons[category as keyof typeof icons] || '📋';
    };

    const getCategoryText = (category: string) => {
        const texts = {
            road: 'Jalan',
            water: 'Air Bersih',
            electricity: 'Listrik',
            bridge: 'Jembatan',
            drainage: 'Drainase',
            public_facility: 'Fasilitas Umum',
            other: 'Lainnya',
        };
        return texts[category as keyof typeof texts] || category;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Admin - Asdes" />
            
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        🏛️ Dashboard Admin Desa
                    </h1>
                    <p className="text-lg text-gray-600">
                        Kelola dan pantau semua laporan infrastruktur desa
                    </p>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Laporan</p>
                                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                                </div>
                                <div className="text-3xl">📊</div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Menunggu</p>
                                    <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                                </div>
                                <div className="text-3xl">⏳</div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Sedang Ditangani</p>
                                    <p className="text-2xl font-bold text-blue-600">{stats.in_progress}</p>
                                </div>
                                <div className="text-3xl">🔧</div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Selesai</p>
                                    <p className="text-2xl font-bold text-green-600">{stats.resolved}</p>
                                </div>
                                <div className="text-3xl">✅</div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Ditolak</p>
                                    <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                                </div>
                                <div className="text-3xl">❌</div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Category Statistics */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">📊 Statistik per Kategori</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {Object.entries(categoryStats).map(([category, count]) => (
                                <div key={category} className="text-center p-3 bg-gray-50 rounded-lg">
                                    <div className="text-2xl mb-1">{getCategoryIcon(category)}</div>
                                    <p className="text-sm font-medium text-gray-900">{getCategoryText(category)}</p>
                                    <p className="text-lg font-bold text-blue-600">{count}</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Complaints */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-xl">📋 Laporan Terbaru</CardTitle>
                        <Link href={route('complaints.index')}>
                            <Button variant="outline" size="sm">
                                Lihat Semua
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        {complaints.data.length > 0 ? (
                            <div className="space-y-4">
                                {complaints.data.slice(0, 10).map((complaint) => (
                                    <div key={complaint.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <span className="text-lg">{getCategoryIcon(complaint.category)}</span>
                                                <Badge variant="outline" className="text-xs">
                                                    #{complaint.id}
                                                </Badge>
                                                <Badge className={`text-xs ${getStatusColor(complaint.status)}`}>
                                                    {getStatusText(complaint.status)}
                                                </Badge>
                                                <Badge className={`text-xs ${getPriorityColor(complaint.priority)}`}>
                                                    {getPriorityText(complaint.priority)}
                                                </Badge>
                                            </div>
                                            
                                            <h3 className="font-medium text-gray-900 mb-1">
                                                {complaint.title}
                                            </h3>
                                            
                                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                                                <span>📍 {complaint.location}</span>
                                                <span>👤 {complaint.reporter_name}</span>
                                                <span>📅 {formatDate(complaint.created_at)}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="flex space-x-2">
                                            <Link href={route('complaints.show', complaint.id)}>
                                                <Button variant="outline" size="sm">
                                                    👁️ Lihat
                                                </Button>
                                            </Link>
                                            <Link href={route('complaints.edit', complaint.id)}>
                                                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                                    ✏️ Edit
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-4xl mb-2">📋</div>
                                <p className="text-gray-600">Belum ada laporan masuk</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">⚡ Aksi Cepat</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Link href={route('complaints.index')}>
                                <Button className="w-full h-16 bg-blue-600 hover:bg-blue-700">
                                    <div className="text-center">
                                        <div className="text-2xl mb-1">📋</div>
                                        <div>Kelola Semua Laporan</div>
                                    </div>
                                </Button>
                            </Link>
                            
                            <Link href="/">
                                <Button variant="outline" className="w-full h-16">
                                    <div className="text-center">
                                        <div className="text-2xl mb-1">🌐</div>
                                        <div>Lihat Situs Publik</div>
                                    </div>
                                </Button>
                            </Link>
                            
                            <Link href={route('complaints.create')}>
                                <Button variant="outline" className="w-full h-16">
                                    <div className="text-center">
                                        <div className="text-2xl mb-1">📝</div>
                                        <div>Buat Laporan Baru</div>
                                    </div>
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}