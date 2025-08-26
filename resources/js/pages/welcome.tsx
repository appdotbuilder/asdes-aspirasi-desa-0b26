import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
    auth?: {
        user?: {
            id: number;
            name: string;
            email: string;
        };
    };
    [key: string]: unknown;
}

export default function Welcome({ auth }: Props) {
    const handleCreateComplaint = () => {
        router.get(route('complaints.create'));
    };

    const handleViewComplaints = () => {
        router.get(route('complaints.index'));
    };

    const features = [
        {
            icon: '📋',
            title: 'Lapor Mudah',
            description: 'Laporkan masalah infrastruktur desa dengan mudah melalui form online yang sederhana'
        },
        {
            icon: '👁️',
            title: 'Transparansi Penuh',
            description: 'Pantau status dan progress penanganan laporan Anda secara real-time'
        },
        {
            icon: '📊',
            title: 'Dashboard Admin',
            description: 'Pemerintah desa dapat mengelola dan melacak semua laporan dengan mudah'
        },
        {
            icon: '🎯',
            title: 'Prioritas Berbasis Data',
            description: 'Identifikasi masalah umum dan tentukan prioritas pembangunan berdasarkan data real'
        }
    ];

    const categories = [
        { name: 'Jalan', icon: '🛣️', color: 'bg-blue-500' },
        { name: 'Air Bersih', icon: '💧', color: 'bg-cyan-500' },
        { name: 'Listrik', icon: '⚡', color: 'bg-yellow-500' },
        { name: 'Jembatan', icon: '🌉', color: 'bg-purple-500' },
        { name: 'Drainase', icon: '🚰', color: 'bg-green-500' },
        { name: 'Fasilitas Umum', icon: '🏛️', color: 'bg-red-500' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">A</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Asdes</h1>
                                <p className="text-sm text-gray-500">Aspirasi Desa</p>
                            </div>
                        </div>
                        <div className="flex space-x-3">
                            {auth?.user ? (
                                <Link href={route('dashboard')}>
                                    <Button>Dashboard</Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')}>
                                        <Button variant="outline">Masuk</Button>
                                    </Link>
                                    <Link href={route('register')}>
                                        <Button>Daftar</Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        🏘️ <span className="text-blue-600">Asdes</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 mb-4">
                        Platform Aspirasi dan Pelaporan Infrastruktur Desa
                    </p>
                    <p className="text-lg text-gray-500 mb-8 max-w-3xl mx-auto">
                        Laporkan masalah infrastruktur desa dengan mudah dan pantau progress penanganannya. 
                        Bantu pemerintah desa dalam meningkatkan kualitas infrastruktur dan pelayanan publik.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button 
                            size="lg" 
                            onClick={handleCreateComplaint}
                            className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
                        >
                            📝 Buat Laporan
                        </Button>
                        <Button 
                            size="lg" 
                            variant="outline" 
                            onClick={handleViewComplaints}
                            className="text-lg px-8 py-3"
                        >
                            📋 Lihat Laporan
                        </Button>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Fitur Utama
                    </h2>
                    <p className="text-xl text-gray-600">
                        Solusi lengkap untuk pelaporan dan pengelolaan infrastruktur desa
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="text-4xl mb-2">{feature.icon}</div>
                                <CardTitle className="text-lg">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="text-base">
                                    {feature.description}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Categories Section */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Kategori Infrastruktur
                        </h2>
                        <p className="text-xl text-gray-600">
                            Jenis infrastruktur yang dapat dilaporkan
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categories.map((category, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 text-center hover:shadow-md transition-shadow">
                                <div className="text-3xl mb-3">{category.icon}</div>
                                <h3 className="font-medium text-gray-900">{category.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">
                        Siap Melaporkan Masalah Infrastruktur? 🚀
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Bergabunglah dengan warga lainnya dalam membangun desa yang lebih baik
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button 
                            size="lg" 
                            onClick={handleCreateComplaint}
                            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3"
                        >
                            📝 Buat Laporan Sekarang
                        </Button>
                        {!auth?.user && (
                            <Link href={route('register')}>
                                <Button 
                                    size="lg" 
                                    variant="outline"
                                    className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3"
                                >
                                    👥 Daftar sebagai Admin
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">A</span>
                            </div>
                            <span className="text-xl font-bold">Asdes - Aspirasi Desa</span>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Platform digital untuk meningkatkan partisipasi masyarakat dalam pembangunan desa
                        </p>
                        <p className="text-gray-500 text-sm">
                            © 2024 Asdes. Membangun desa bersama teknologi. 🏘️✨
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}