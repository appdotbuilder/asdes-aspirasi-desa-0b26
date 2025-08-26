<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreComplaintRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string|min:10',
            'location' => 'required|string|max:255',
            'category' => 'required|in:road,water,electricity,bridge,drainage,public_facility,other',
            'priority' => 'required|in:low,medium,high,urgent',
            'reporter_name' => 'required|string|max:255',
            'reporter_email' => 'required|email|max:255',
            'reporter_phone' => 'nullable|string|max:20',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Judul laporan wajib diisi.',
            'title.max' => 'Judul laporan maksimal 255 karakter.',
            'description.required' => 'Deskripsi laporan wajib diisi.',
            'description.min' => 'Deskripsi laporan minimal 10 karakter.',
            'location.required' => 'Lokasi wajib diisi.',
            'location.max' => 'Lokasi maksimal 255 karakter.',
            'category.required' => 'Kategori infrastruktur wajib dipilih.',
            'category.in' => 'Kategori infrastruktur tidak valid.',
            'priority.required' => 'Prioritas wajib dipilih.',
            'priority.in' => 'Prioritas tidak valid.',
            'reporter_name.required' => 'Nama pelapor wajib diisi.',
            'reporter_name.max' => 'Nama pelapor maksimal 255 karakter.',
            'reporter_email.required' => 'Email pelapor wajib diisi.',
            'reporter_email.email' => 'Format email tidak valid.',
            'reporter_email.max' => 'Email maksimal 255 karakter.',
            'reporter_phone.max' => 'Nomor telepon maksimal 20 karakter.',
        ];
    }
}