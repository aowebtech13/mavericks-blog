<?php

namespace App\Http\Requests\Media;

use App\Models\Media;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UploadMediaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->is_admin ?? false;
    }

    public function rules(): array
    {
        return [
            'files' => ['required', 'array', 'min:1', 'max:20'],
            'files.*' => [
                'required',
                'file',
                'max:10240', // 10 MB per file
                Rule::file()
                    ->extensions(Media::IMAGE_EXTENSIONS)
                    ->extensions(['pdf', 'mp4', 'webm', 'mp3', 'wav', 'ogg', 'doc', 'docx', 'zip']),
            ],
            'folder' => ['nullable', 'string', 'max:100'],
            'alt_text' => ['nullable', 'string', 'max:255'],
        ];
    }

    public function messages(): array
    {
        return [
            'files.required' => 'Please choose at least one file to upload.',
            'files.max' => 'You can upload up to 20 files at a time.',
            'files.*.max' => 'Each file must be smaller than 10 MB.',
            'files.*.file' => 'Each entry must be a valid file.',
        ];
    }

    // Sanitize the folder name so uploads can never escape the media root.
    protected function prepareForValidation(): void
    {
        if ($this->filled('folder')) {
            $folder = preg_replace('/[^A-Za-z0-9\/_-]/', '', (string) $this->input('folder'));
            $folder = trim($folder, '/');
            $folder = preg_replace('#/+#', '/', $folder);

            $this->merge(['folder' => $folder !== '' ? $folder : 'library']);
        }
    }
}
