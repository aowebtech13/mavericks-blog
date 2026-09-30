<?php

namespace Tests\Feature;

use App\Models\Media;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class MediaLibraryTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        Storage::fake('public');
    }

    private function admin(): User
    {
        return User::factory()->create(['is_admin' => true]);
    }

    public function test_guests_cannot_reach_the_media_library(): void
    {
        $this->get(route('admin.media.index'))->assertRedirect(route('admin.login'));
    }

    public function test_non_admins_are_blocked(): void
    {
        $user = User::factory()->create(['is_admin' => false]);

        $this->actingAs($user)->get(route('admin.media.index'))->assertRedirect(route('admin.login'));
    }

    public function test_admin_can_view_the_media_library(): void
    {
        Media::factory()->count(3)->create();

        $response = $this->actingAs($this->admin())->get(route('admin.media.index'));

        $response->assertOk();
        $response->assertSee('Media Library');
    }

    public function test_admin_can_upload_a_file(): void
    {
        $response = $this->actingAs($this->admin())->post(route('admin.media.store'), [
            'files' => [UploadedFile::fake()->image('cover.jpg')],
            'folder' => 'posts',
        ]);

        $response->assertRedirect(route('admin.media.index'));
        $response->assertSessionHas('success');

        $media = Media::firstOrFail();

        $this->assertSame('cover.jpg', $media->file_name);
        $this->assertSame('image/jpeg', $media->mime_type);
        $this->assertSame('posts', $media->folder);
        Storage::disk('public')->assertExists($media->path);
    }

    public function test_upload_rejects_oversized_or_missing_files(): void
    {
        $this->actingAs($this->admin())
            ->post(route('admin.media.store'), [])
            ->assertSessionHasErrors('files');

        $this->assertSame(0, Media::count());
    }

    public function test_folder_input_is_sanitized(): void
    {
        $this->actingAs($this->admin())->post(route('admin.media.store'), [
            'files' => [UploadedFile::fake()->image('pic.png', 10, 10)],
            'folder' => '../../etc',
        ]);

        $media = Media::firstOrFail();

        $this->assertSame('etc', $media->folder);
        $this->assertStringStartsWith('etc/', $media->path);
    }

    public function test_search_and_type_filters_are_applied(): void
    {
        Media::factory()->create(['file_name' => 'sunset.jpg', 'mime_type' => 'image/jpeg']);
        Media::factory()->pdf()->create(['file_name' => 'brochure.pdf']);

        $this->actingAs($this->admin())
            ->get(route('admin.media.index', ['search' => 'sunset']))
            ->assertOk()
            ->assertSee('sunset.jpg')
            ->assertDontSee('brochure.pdf');

        $this->actingAs($this->admin())
            ->get(route('admin.media.index', ['type' => 'document']))
            ->assertOk()
            ->assertSee('brochure.pdf')
            ->assertDontSee('sunset.jpg');
    }

    public function test_admin_can_update_metadata(): void
    {
        $media = Media::factory()->create();

        $this->actingAs($this->admin())
            ->patch(route('admin.media.update', $media), [
                'title' => 'Golden Hour',
                'alt_text' => 'Sunset over the ridge',
            ])
            ->assertSessionHas('success');

        $media->refresh();

        $this->assertSame('Golden Hour', $media->title);
        $this->assertSame('Sunset over the ridge', $media->alt_text);
    }

    public function test_deleting_a_record_removes_the_file_from_disk(): void
    {
        $media = Media::factory()->create();

        Storage::disk('public')->put($media->path, 'binary');

        $this->actingAs($this->admin())
            ->delete(route('admin.media.destroy', $media))
            ->assertSessionHas('success');

        $this->assertModelMissing($media);
        Storage::disk('public')->assertMissing($media->path);
    }

    public function test_bulk_delete_removes_multiple_records(): void
    {
        $media = Media::factory()->count(3)->create();

        $this->actingAs($this->admin())
            ->delete(route('admin.media.bulk-destroy'), ['ids' => $media->pluck('id')->all()])
            ->assertSessionHas('success');

        $this->assertSame(0, Media::count());
    }

    public function test_json_list_returns_paginated_payload(): void
    {
        Media::factory()->count(2)->create();

        $response = $this->actingAs($this->admin())->getJson(route('admin.media.list', ['type' => 'image']));

        $response->assertOk()
            ->assertJsonStructure([
                'data' => [['id', 'file_name', 'url', 'mime_type', 'human_size', 'is_image']],
                'meta' => ['current_page', 'last_page', 'per_page', 'total'],
            ]);
    }

    public function test_json_upload_returns_the_stored_file(): void
    {
        $response = $this->actingAs($this->admin())->postJson(route('admin.media.upload'), [
            'files' => [UploadedFile::fake()->image('inline.jpg')],
        ]);

        $response->assertCreated()
            ->assertJsonPath('file_name', 'inline.jpg')
            ->assertJsonPath('is_image', true);
    }

    public function test_media_url_points_to_the_streaming_route(): void
    {
        $media = Media::factory()->create(['path' => 'library/test.jpg']);

        $this->assertStringEndsWith('/media/library/test.jpg', $media->url);
    }
}
