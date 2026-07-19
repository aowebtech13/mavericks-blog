<x-mail::message>
# Admin Password Reset OTP

You are receiving this email because we received a password reset request for your account.

Your OTP is: **{{ $otp }}**

If you did not request a password reset, no further action is required.

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
