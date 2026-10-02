<?php

return [

    /*
    |--------------------------------------------------------------------------
    | View Tracking
    |--------------------------------------------------------------------------
    |
    | Configuration for real, de-duplicated post view tracking. A "view" is
    | only recorded when it comes from a genuine browser render (the dedicated
    | tracking endpoint), never from server-side metadata generation or
    | listing requests, and never more than once per visitor per post within
    | the de-duplication window below.
    |
    */

    'dedupe_seconds' => (int) env('VIEWS_DEDUPE_SECONDS', 1800),

    /*
    | Requests flagged as crawlers/bots are ignored so automated traffic does
    | not inflate the numbers shown in the admin area.
    */
    'ignore_bots' => (bool) env('VIEWS_IGNORE_BOTS', true),

    /*
    | Only published + public posts accumulate views. Drafts/previews stay at
    | zero so the admin list reflects genuine readership.
    */
    'only_published' => (bool) env('VIEWS_ONLY_PUBLISHED', true),

    /*
    | A minimal, low-signal bot signature list. Kept intentionally short so the
    | heuristic does not accidentally block real readers.
    */
    'bot_patterns' => [
        'bot',
        'crawler',
        'spider',
        'slurp',
        'curl/',
        'wget/',
        'python-requests',
        'headlesschrome',
        'facebookexternalhit',
        'bingpreview',
        'whatsapp',
        'telegrambot',
        'discordbot',
        'twitterbot',
        'linkedinbot',
        'pinterest',
        'embedly',
        'quora link preview',
        'vkshare',
        'w3c_validator',
        'google-inspectiontool',
    ],

];
