<?php

namespace App\Http\Requests\Ai;

use Illuminate\Foundation\Http\FormRequest;

class GenerateBlogRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'topic' => 'required|string|max:300',
            'provider' => 'nullable|string|in:openai,gemini,mock',
            'model' => 'nullable|string|max:100',
            'tone' => 'nullable|string|max:100',
            'language' => 'nullable|string|max:20',
            'word_count' => 'nullable|integer|min:300|max:4000',
            'keywords' => 'nullable|array',
            'keywords.*' => 'string|max:60',
            'category_id' => 'nullable|exists:categories,id',
            'status' => 'nullable|in:draft,published',
            'scheduled_at' => 'nullable|date|after:now',
        ];
    }
}

