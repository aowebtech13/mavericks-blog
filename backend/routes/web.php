<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\PostController as AdminPostController;
use App\Http\Controllers\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\TagController as AdminTagController;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

Route::prefix('admin')->name('admin.')->group(function () {
    Route::middleware('guest')->group(function () {
        Route::get('/login', [AdminAuthController::class, 'showLoginForm'])->name('login');
        Route::post('/login', [AdminAuthController::class, 'login'])->name('login.submit');

        Route::get('/forgot-password', [AdminAuthController::class, 'showForgotPasswordForm'])->name('password.request');
        Route::post('/forgot-password', [AdminAuthController::class, 'sendOtp'])->name('password.email');
        Route::get('/reset-password', [AdminAuthController::class, 'showResetPasswordForm'])->name('password.reset');
        Route::post('/reset-password', [AdminAuthController::class, 'resetPassword'])->name('password.update');
    });

    Route::middleware(['auth', 'admin'])->group(function () {
        Route::get('/', function () {
            return redirect()->route('admin.dashboard');
        });

        Route::get('/dashboard', function () {
            return view('admin.dashboard');
        })->name('dashboard');

        Route::resource('posts', AdminPostController::class);
        Route::resource('categories', AdminCategoryController::class);
        Route::resource('tags', AdminTagController::class);
        Route::post('/logout', [AdminAuthController::class, 'logout'])->name('logout');

        Route::get('/password/change', [AdminAuthController::class, 'showChangePasswordForm'])->name('password.change');
        Route::post('/password/change', [AdminAuthController::class, 'changePassword'])->name('password.change.update');
    });
});

// Add a fallback for the default login route to redirect to admin login
Route::get('/login', function () {
    return redirect()->route('admin.login');
})->name('login');

require __DIR__.'/auth.php';
