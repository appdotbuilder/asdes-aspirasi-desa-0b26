import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import AppLayout from '@/components/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

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
    created_at: string;
}



interface Props {
    complaint: Complaint;
    [key: string]: unknown;
}

export default function EditComplaint({ complaint }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Edit Laporan', href: `/complaints/${complaint.id}/edit` },
    ];

    const { data, setData, put, processing, errors } = useForm({
        status: complaint.status,
        priority: complaint.priority,
        admin_notes: complaint.admin_notes || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('complaints.update', complaint.id));
    };

    const statuses = [
        { value: 'pending', label: '⏳ Menunggu', description: 'Laporan belum ditangani' },
        { value: 'in_progress', label: '🔧 Sedang Ditangani', description: 'Sedang dalam proses penanganan' },
        { value: 'resolved', label: '✅ Selesai', description: 'Masalah telah diselesaikan' },
        { value: 'rejected', label: '❌ Ditolak', description: 'Laporan ditolak dengan alasan tertentu' },
    ];

    const priorities = [
        { value: 'low', label: '🟢 Rendah', description: 'Tidak mendesak' },
        { value: 'medium', label: '🟡 Sedang', description: 'Perlu perhatian' },
        { value: 'high', label: '🟠 Tinggi', description: 'Perlu segera ditangani' },
        { value: 'urgent', label: '🔴 Mendesak', description: 'Sangat mendesak' },
    ];

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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Laporan #${complaint.id} - Asdes`} />
            
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        ✏️ Edit Laporan #{complaint.id}
                    </h1>
                    <p className="text-lg text-gray-600">
                        Kelola status dan catatan untuk laporan infrastruktur
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Original Report Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">📋 Informasi Laporan</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label className="text-sm font-medium text-gray-600">Judul Laporan</Label>
                                <p className="text-lg font-medium text-gray-900">
                                    {getCategoryIcon(complaint.category)} {complaint.title}
                                </p>
                            </div>

                            <div>
                                <Label className="text-sm font-medium text-gray-600">Kategori</Label>
                                <Badge variant="outline" className="ml-2">
                                    {getCategoryText(complaint.category)}
                                </Badge>
                            </div>

                            <div>
                                <Label className="text-sm font-medium text-gray-600">Lokasi</Label>
                                <p className="text-gray-900">📍 {complaint.location}</p>
                            </div>

                            <div>
                                <Label className="text-sm font-medium text-gray-600">Deskripsi</Label>
                                <div className="p-3 bg-gray-50 rounded-lg">
                                    <p className="text-gray-800 whitespace-pre-wrap">{complaint.description}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                <div>
                                    <Label className="text-sm font-medium text-gray-600">Pelapor</Label>
                                    <p className="text-gray-900">👤 {complaint.reporter_name}</p>
                                    <p className="text-sm text-gray-600">📧 {complaint.reporter_email}</p>
                                    {complaint.reporter_phone && (
                                        <p className="text-sm text-gray-600">📞 {complaint.reporter_phone}</p>
                                    )}
                                </div>
                                <div>
                                    <Label className="text-sm font-medium text-gray-600">Tanggal Lapor</Label>
                                    <p className="text-gray-900">📅 {formatDate(complaint.created_at)}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Edit Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl">⚙️ Kelola Laporan</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Status */}
                                <div>
                                    <Label htmlFor="status">Status Laporan *</Label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(value) => setData('status', value)}
                                    >
                                        <SelectTrigger className="mt-2">
                                            <SelectValue placeholder="Pilih status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {statuses.map((status) => (
                                                <SelectItem key={status.value} value={status.value}>
                                                    <div>
                                                        <div>{status.label}</div>
                                                        <div className="text-xs text-gray-500">{status.description}</div>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.status && <p className="text-sm text-red-600 mt-1">{errors.status}</p>}
                                </div>

                                {/* Priority */}
                                <div>
                                    <Label htmlFor="priority">Tingkat Prioritas *</Label>
                                    <Select
                                        value={data.priority}
                                        onValueChange={(value) => setData('priority', value)}
                                    >
                                        <SelectTrigger className="mt-2">
                                            <SelectValue placeholder="Pilih prioritas" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {priorities.map((priority) => (
                                                <SelectItem key={priority.value} value={priority.value}>
                                                    <div>
                                                        <div>{priority.label}</div>
                                                        <div className="text-xs text-gray-500">{priority.description}</div>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.priority && <p className="text-sm text-red-600 mt-1">{errors.priority}</p>}
                                </div>

                                {/* Admin Notes */}
                                <div>
                                    <Label htmlFor="admin_notes">Catatan Admin</Label>
                                    <Textarea
                                        id="admin_notes"
                                        value={data.admin_notes}
                                        onChange={(e) => setData('admin_notes', e.target.value)}
                                        placeholder="Tambahkan catatan atau update untuk pelapor..."
                                        rows={4}
                                        className="mt-2"
                                    />
                                    <p className="text-sm text-gray-500 mt-1">
                                        Catatan ini akan terlihat oleh pelapor dan masyarakat umum
                                    </p>
                                    {errors.admin_notes && <p className="text-sm text-red-600 mt-1">{errors.admin_notes}</p>}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col space-y-3 pt-6">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="w-full bg-blue-600 hover:bg-blue-700"
                                    >
                                        {processing ? 'Menyimpan...' : '💾 Simpan Perubahan'}
                                    </Button>
                                    
                                    <div className="grid grid-cols-2 gap-3">
                                        <Link href={route('complaints.show', complaint.id)}>
                                            <Button type="button" variant="outline" className="w-full">
                                                👁️ Lihat Laporan
                                            </Button>
                                        </Link>
                                        <Link href={route('dashboard')}>
                                            <Button type="button" variant="outline" className="w-full">
                                                ← Kembali
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Status Change Guidelines */}
                <Card className="border-blue-200 bg-blue-50">
                    <CardContent className="pt-6">
                        <div className="flex items-start space-x-3">
                            <div className="text-blue-600 text-xl">💡</div>
                            <div>
                                <h3 className="font-medium text-blue-900 mb-2">Panduan Perubahan Status</h3>
                                <div className="text-sm text-blue-800 space-y-1">
                                    <p>• <strong>Menunggu:</strong> Laporan baru yang belum ditangani</p>
                                    <p>• <strong>Sedang Ditangani:</strong> Tim telah mulai menangani masalah</p>
                                    <p>• <strong>Selesai:</strong> Masalah telah diperbaiki atau diselesaikan</p>
                                    <p>• <strong>Ditolak:</strong> Laporan tidak valid atau tidak dapat ditangani</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}