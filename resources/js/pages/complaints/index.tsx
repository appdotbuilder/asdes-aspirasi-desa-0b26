import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Complaint {
    id: number;
    title: string;
    location: string;
    category: string;
    status: string;
    created_at: string;
}

interface Stats {
    total: number;
    pending: number;
    in_progress: number;
    resolved: number;
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
    [key: string]: unknown;
}

export default function ComplaintsIndex({ complaints, stats }: Props) {
    const getStatusColor = (status: string) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            in_progress: 'bg-blue-100 text-blue-800',
            resolved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
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
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-4">
                        <Link href="/" className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">A</span>
                            </div>
                            <span className="text-lg font-semibold text-gray-900">Asdes</span>
                        </Link>
                        <Link href={route('complaints.create')}>
                            <Button className="bg-blue-600 hover:bg-blue-700">
                                📝 Buat Laporan
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        📋 Daftar Laporan Infrastruktur
                    </h1>
                    <p className="text-lg text-gray-600">
                        Pantau semua laporan infrastruktur desa dan statusnya
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
                </div>

                {/* Complaints List */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Semua Laporan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {complaints.data.length > 0 ? (
                            <div className="space-y-4">
                                {complaints.data.map((complaint) => (
                                    <div
                                        key={complaint.id}
                                        className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                                        onClick={() => router.get(route('complaints.show', complaint.id))}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <span className="text-lg">
                                                        {getCategoryIcon(complaint.category)}
                                                    </span>
                                                    <Badge variant="outline" className="text-xs">
                                                        {getCategoryText(complaint.category)}
                                                    </Badge>
                                                    <Badge className={`text-xs ${getStatusColor(complaint.status)}`}>
                                                        {getStatusText(complaint.status)}
                                                    </Badge>
                                                </div>
                                                
                                                <h3 className="font-semibold text-gray-900 mb-1">
                                                    {complaint.title}
                                                </h3>
                                                
                                                <p className="text-sm text-gray-600 mb-2">
                                                    📍 {complaint.location}
                                                </p>
                                                
                                                <p className="text-xs text-gray-500">
                                                    📅 {formatDate(complaint.created_at)}
                                                </p>
                                            </div>
                                            
                                            <div className="text-gray-400">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">📋</div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Belum Ada Laporan
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Belum ada laporan infrastruktur yang masuk
                                </p>
                                <Link href={route('complaints.create')}>
                                    <Button className="bg-blue-600 hover:bg-blue-700">
                                        📝 Buat Laporan Pertama
                                    </Button>
                                </Link>
                            </div>
                        )}

                        {/* Pagination */}
                        {complaints.data.length > 0 && complaints.links && (
                            <div className="flex justify-center mt-8">
                                <div className="flex space-x-1">
                                    {complaints.links.map((link, index: number) => (
                                        <Button
                                            key={index}
                                            variant={link.active ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => link.url && router.get(link.url)}
                                            disabled={!link.url}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}