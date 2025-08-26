import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Complaint {
    id: number;
    title: string;
    description: string;
    location: string;
    category: string;
    priority: string;
    status: string;
    reporter_name: string;
    reporter_email: string;
    reporter_phone: string | null;
    admin_notes: string | null;
    resolved_at: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    complaint: Complaint;
    [key: string]: unknown;
}

export default function ShowComplaint({ complaint }: Props) {
    const getStatusColor = (status: string) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            in_progress: 'bg-blue-100 text-blue-800 border-blue-200',
            resolved: 'bg-green-100 text-green-800 border-green-200',
            rejected: 'bg-red-100 text-red-800 border-red-200',
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    const getPriorityColor = (priority: string) => {
        const colors = {
            low: 'bg-green-100 text-green-800 border-green-200',
            medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            high: 'bg-orange-100 text-orange-800 border-orange-200',
            urgent: 'bg-red-100 text-red-800 border-red-200',
        };
        return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
    };

    const getStatusText = (status: string) => {
        const texts = {
            pending: '⏳ Menunggu',
            in_progress: '🔧 Sedang Ditangani',
            resolved: '✅ Selesai',
            rejected: '❌ Ditolak',
        };
        return texts[status as keyof typeof texts] || status;
    };

    const getPriorityText = (priority: string) => {
        const texts = {
            low: '🟢 Rendah',
            medium: '🟡 Sedang',
            high: '🟠 Tinggi',
            urgent: '🔴 Mendesak',
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
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusProgress = (status: string) => {
        const progress = {
            pending: 25,
            in_progress: 50,
            resolved: 100,
            rejected: 100,
        };
        return progress[status as keyof typeof progress] || 0;
    };

    const getProgressColor = (status: string) => {
        const colors = {
            pending: 'bg-yellow-500',
            in_progress: 'bg-blue-500',
            resolved: 'bg-green-500',
            rejected: 'bg-red-500',
        };
        return colors[status as keyof typeof colors] || 'bg-gray-500';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-4">
                        <Link href="/" className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">A</span>
                            </div>
                            <span className="text-lg font-semibold text-gray-900">Asdes</span>
                        </Link>
                        <div className="flex space-x-3">
                            <Link href={route('complaints.index')}>
                                <Button variant="outline">📋 Semua Laporan</Button>
                            </Link>
                            <Link href={route('complaints.create')}>
                                <Button className="bg-blue-600 hover:bg-blue-700">📝 Buat Laporan</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <div className="mb-6">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Link href="/" className="hover:text-blue-600">Beranda</Link>
                        <span>›</span>
                        <Link href={route('complaints.index')} className="hover:text-blue-600">Laporan</Link>
                        <span>›</span>
                        <span className="text-gray-900">#{complaint.id}</span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="space-y-6">
                    {/* Status Card */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between mb-4">
                                <h1 className="text-2xl font-bold text-gray-900">
                                    {getCategoryIcon(complaint.category)} {complaint.title}
                                </h1>
                                <Badge className={`text-sm ${getStatusColor(complaint.status)}`}>
                                    {getStatusText(complaint.status)}
                                </Badge>
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-gray-600">Progress</span>
                                    <span className="text-sm text-gray-600">{getStatusProgress(complaint.status)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(complaint.status)}`}
                                        style={{ width: `${getStatusProgress(complaint.status)}%` }}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-600">ID Laporan:</span>
                                    <p className="font-medium">#{complaint.id}</p>
                                </div>
                                <div>
                                    <span className="text-gray-600">Kategori:</span>
                                    <p className="font-medium">{getCategoryText(complaint.category)}</p>
                                </div>
                                <div>
                                    <span className="text-gray-600">Prioritas:</span>
                                    <Badge className={`text-xs ${getPriorityColor(complaint.priority)}`}>
                                        {getPriorityText(complaint.priority)}
                                    </Badge>
                                </div>
                                <div>
                                    <span className="text-gray-600">Tanggal Lapor:</span>
                                    <p className="font-medium">{formatDate(complaint.created_at)}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Details Card */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Detail Laporan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="font-medium text-gray-900 mb-2">📍 Lokasi</h3>
                                <p className="text-gray-700">{complaint.location}</p>
                            </div>
                            
                            <div>
                                <h3 className="font-medium text-gray-900 mb-2">📝 Deskripsi Masalah</h3>
                                <p className="text-gray-700 whitespace-pre-wrap">{complaint.description}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Reporter Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">Informasi Pelapor</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <span className="text-sm text-gray-600">Nama:</span>
                                    <p className="font-medium">{complaint.reporter_name}</p>
                                </div>
                                <div>
                                    <span className="text-sm text-gray-600">Email:</span>
                                    <p className="font-medium">{complaint.reporter_email}</p>
                                </div>
                            </div>
                            {complaint.reporter_phone && (
                                <div>
                                    <span className="text-sm text-gray-600">Telepon:</span>
                                    <p className="font-medium">{complaint.reporter_phone}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Admin Notes */}
                    {complaint.admin_notes && (
                        <Card className="border-blue-200 bg-blue-50">
                            <CardHeader>
                                <CardTitle className="text-xl text-blue-900">💬 Catatan Admin</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-blue-800 whitespace-pre-wrap">{complaint.admin_notes}</p>
                            </CardContent>
                        </Card>
                    )}

                    {/* Timeline */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">📅 Timeline</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                    <div>
                                        <p className="font-medium">Laporan dibuat</p>
                                        <p className="text-sm text-gray-600">{formatDate(complaint.created_at)}</p>
                                    </div>
                                </div>
                                
                                {complaint.status !== 'pending' && (
                                    <div className="flex items-center space-x-3">
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                        <div>
                                            <p className="font-medium">Status diperbarui</p>
                                            <p className="text-sm text-gray-600">{formatDate(complaint.updated_at)}</p>
                                        </div>
                                    </div>
                                )}
                                
                                {complaint.resolved_at && (
                                    <div className="flex items-center space-x-3">
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <div>
                                            <p className="font-medium">Laporan diselesaikan</p>
                                            <p className="text-sm text-gray-600">{formatDate(complaint.resolved_at)}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center space-x-4 mt-8">
                    <Link href={route('complaints.index')}>
                        <Button variant="outline" className="px-6">
                            ← Kembali ke Daftar
                        </Button>
                    </Link>
                    <Link href={route('complaints.create')}>
                        <Button className="bg-blue-600 hover:bg-blue-700 px-6">
                            📝 Buat Laporan Baru
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}