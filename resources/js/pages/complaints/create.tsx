import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';



export default function CreateComplaint() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        location: '',
        category: '',
        priority: 'medium',
        reporter_name: '',
        reporter_email: '',
        reporter_phone: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('complaints.store'));
    };

    const categories = [
        { value: 'road', label: '🛣️ Jalan' },
        { value: 'water', label: '💧 Air Bersih' },
        { value: 'electricity', label: '⚡ Listrik' },
        { value: 'bridge', label: '🌉 Jembatan' },
        { value: 'drainage', label: '🚰 Drainase' },
        { value: 'public_facility', label: '🏛️ Fasilitas Umum' },
        { value: 'other', label: '📋 Lainnya' },
    ];

    const priorities = [
        { value: 'low', label: '🟢 Rendah' },
        { value: 'medium', label: '🟡 Sedang' },
        { value: 'high', label: '🟠 Tinggi' },
        { value: 'urgent', label: '🔴 Mendesak' },
    ];

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
                        <Link href={route('complaints.index')}>
                            <Button variant="outline">📋 Lihat Laporan</Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        📝 Buat Laporan Infrastruktur
                    </h1>
                    <p className="text-lg text-gray-600">
                        Laporkan masalah infrastruktur di desa Anda untuk segera ditindaklanjuti
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Form Laporan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Title */}
                            <div>
                                <Label htmlFor="title">Judul Laporan *</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Contoh: Jalan berlubang di RT 01"
                                    className="mt-1"
                                />
                                {errors.title && <p className="text-sm text-red-600 mt-1">{errors.title}</p>}
                            </div>

                            {/* Description */}
                            <div>
                                <Label htmlFor="description">Deskripsi Masalah *</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Jelaskan masalah infrastruktur secara detail..."
                                    rows={4}
                                    className="mt-1"
                                />
                                {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
                            </div>

                            {/* Location */}
                            <div>
                                <Label htmlFor="location">Lokasi *</Label>
                                <Input
                                    id="location"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    placeholder="Contoh: RT 01, RW 02, Desa Sukamaju"
                                    className="mt-1"
                                />
                                {errors.location && <p className="text-sm text-red-600 mt-1">{errors.location}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Category */}
                                <div>
                                    <Label>Kategori Infrastruktur *</Label>
                                    <Select
                                        value={data.category}
                                        onValueChange={(value) => setData('category', value)}
                                    >
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Pilih kategori" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.value} value={category.value}>
                                                    {category.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.category && <p className="text-sm text-red-600 mt-1">{errors.category}</p>}
                                </div>

                                {/* Priority */}
                                <div>
                                    <Label>Tingkat Prioritas *</Label>
                                    <Select
                                        value={data.priority}
                                        onValueChange={(value) => setData('priority', value)}
                                    >
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Pilih prioritas" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {priorities.map((priority) => (
                                                <SelectItem key={priority.value} value={priority.value}>
                                                    {priority.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.priority && <p className="text-sm text-red-600 mt-1">{errors.priority}</p>}
                                </div>
                            </div>

                            <hr />

                            <div className="space-y-6">
                                <h3 className="text-lg font-medium text-gray-900">Data Pelapor</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Reporter Name */}
                                    <div>
                                        <Label htmlFor="reporter_name">Nama Lengkap *</Label>
                                        <Input
                                            id="reporter_name"
                                            value={data.reporter_name}
                                            onChange={(e) => setData('reporter_name', e.target.value)}
                                            placeholder="Masukkan nama lengkap"
                                            className="mt-1"
                                        />
                                        {errors.reporter_name && <p className="text-sm text-red-600 mt-1">{errors.reporter_name}</p>}
                                    </div>

                                    {/* Reporter Phone */}
                                    <div>
                                        <Label htmlFor="reporter_phone">Nomor Telepon</Label>
                                        <Input
                                            id="reporter_phone"
                                            value={data.reporter_phone}
                                            onChange={(e) => setData('reporter_phone', e.target.value)}
                                            placeholder="08xxxxxxxxxx"
                                            className="mt-1"
                                        />
                                        {errors.reporter_phone && <p className="text-sm text-red-600 mt-1">{errors.reporter_phone}</p>}
                                    </div>
                                </div>

                                {/* Reporter Email */}
                                <div>
                                    <Label htmlFor="reporter_email">Alamat Email *</Label>
                                    <Input
                                        id="reporter_email"
                                        type="email"
                                        value={data.reporter_email}
                                        onChange={(e) => setData('reporter_email', e.target.value)}
                                        placeholder="nama@email.com"
                                        className="mt-1"
                                    />
                                    {errors.reporter_email && <p className="text-sm text-red-600 mt-1">{errors.reporter_email}</p>}
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <Button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                                >
                                    {processing ? 'Mengirim...' : '📤 Kirim Laporan'}
                                </Button>
                                <Link href="/">
                                    <Button type="button" variant="outline" className="w-full sm:w-auto">
                                        ❌ Batal
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Info Box */}
                <Card className="mt-8 border-blue-200 bg-blue-50">
                    <CardContent className="pt-6">
                        <div className="flex items-start space-x-3">
                            <div className="text-blue-600 text-xl">ℹ️</div>
                            <div>
                                <h3 className="font-medium text-blue-900 mb-2">Informasi Penting</h3>
                                <ul className="text-sm text-blue-800 space-y-1">
                                    <li>• Pastikan data yang diisi sudah benar dan lengkap</li>
                                    <li>• Anda akan menerima notifikasi email tentang status laporan</li>
                                    <li>• Tim akan menindaklanjuti laporan dalam 1-3 hari kerja</li>
                                    <li>• Anda dapat memantau progress laporan melalui platform ini</li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}