<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Trending AI Blog Topics
    |--------------------------------------------------------------------------
    |
    | A curated list of trending search queries related to content creation and AI.
    | Each entry contains the search query, its relative search interest (0-100),
    | and the percent increase in search volume over the period.
    |
    | The first entry has an interest of 0 with a "Breakout" increase percent,
    | which Google Trends uses to indicate a massive, sudden spike in searches.
    |
    */

    'topics' => [
        ['query' => 'describe one way that understanding ai-generated misinformation could help protect you or others from false or harmful content.', 'search_interest' => 0, 'increase_percent' => 'Breakout'],
        ['query' => 'digital content creation course', 'search_interest' => 2, 'increase_percent' => 400],
        ['query' => 'mic for content creation', 'search_interest' => 5, 'increase_percent' => 170],
        ['query' => 'social media management and content creation services', 'search_interest' => 1, 'increase_percent' => 110],
        ['query' => 'free ai tools for content creation', 'search_interest' => 2, 'increase_percent' => 90],
        ['query' => 'content creation agencies', 'search_interest' => 5, 'increase_percent' => 80],
        ['query' => 'new york times', 'search_interest' => 1, 'increase_percent' => 70],
        ['query' => 'content creation course', 'search_interest' => 18, 'increase_percent' => 50],
        ['query' => 'ai content creation course', 'search_interest' => 5, 'increase_percent' => 50],
        ['query' => 'digital marketing content creation', 'search_interest' => 8, 'increase_percent' => 50],
        ['query' => 'arizona state university', 'search_interest' => 3, 'increase_percent' => 50],
        ['query' => 'chatgpt for content creation', 'search_interest' => 4, 'increase_percent' => 50],
        ['query' => 'content creation marketing agency', 'search_interest' => 3, 'increase_percent' => 50],
        ['query' => 'digital content creation tools', 'search_interest' => 3, 'increase_percent' => 50],
        ['query' => 'best camera for content creation', 'search_interest' => 4, 'increase_percent' => 40],
        ['query' => 'content creation jobs', 'search_interest' => 12, 'increase_percent' => 40],
        ['query' => 'ai tools for content creation', 'search_interest' => 12, 'increase_percent' => 30],
        ['query' => 'ai content creation tools', 'search_interest' => 18, 'increase_percent' => 30],
        ['query' => 'skyrim creation club content', 'search_interest' => 5, 'increase_percent' => 30],
        ['query' => 'asu content creation major', 'search_interest' => 6, 'increase_percent' => 30],
        ['query' => 'video content creation services', 'search_interest' => 1, 'increase_percent' => 30],
        ['query' => 'capcut', 'search_interest' => 2, 'increase_percent' => 30],
        ['query' => 'best ai tools for content creation', 'search_interest' => 5, 'increase_percent' => 30],
        ['query' => 'ugc content creation', 'search_interest' => 5, 'increase_percent' => 30],
        ['query' => 'seo content creation', 'search_interest' => 14, 'increase_percent' => 20],
        ['query' => 'content creation ideas', 'search_interest' => 9, 'increase_percent' => 20],
        ['query' => 'digital content creation', 'search_interest' => 28, 'increase_percent' => 20],
        ['query' => 'automated content creation', 'search_interest' => 4, 'increase_percent' => 20],
        ['query' => 'ai for content creation', 'search_interest' => 45, 'increase_percent' => 20],
        ['query' => 'content creation ai', 'search_interest' => 100, 'increase_percent' => 20],
        ['query' => 'social media content creation services', 'search_interest' => 3, 'increase_percent' => 20],
        ['query' => 'ai content creation', 'search_interest' => 99, 'increase_percent' => 20],
        ['query' => 'social media content creation', 'search_interest' => 46, 'increase_percent' => 20],
        ['query' => 'content creation meaning', 'search_interest' => 12, 'increase_percent' => 20],
        ['query' => 'describe one way that understanding ai for content creation might help you in your daily life or future career', 'search_interest' => 1, 'increase_percent' => 20],
        ['query' => 'how to do content creation', 'search_interest' => 10, 'increase_percent' => 10],
        ['query' => 'content creation marketing', 'search_interest' => 35, 'increase_percent' => 10],
        ['query' => 'content creation tools', 'search_interest' => 31, 'increase_percent' => 10],
        ['query' => 'social content creation', 'search_interest' => 51, 'increase_percent' => 9],
        ['query' => 'generative ai content creation', 'search_interest' => 10, 'increase_percent' => 9],
        ['query' => 'what is content creation', 'search_interest' => 44, 'increase_percent' => 8],
        ['query' => 'linkedin', 'search_interest' => 10, 'increase_percent' => 8],
        ['query' => 'asu content creation', 'search_interest' => 9, 'increase_percent' => 6],
        ['query' => 'content creation companies', 'search_interest' => 6, 'increase_percent' => 5],
        ['query' => 'video content creation', 'search_interest' => 33, 'increase_percent' => 4],
        ['query' => 'content creation asu', 'search_interest' => 9, 'increase_percent' => 4],
        ['query' => 'web content creation', 'search_interest' => 5, 'increase_percent' => 2],
        ['query' => 'types of content creation', 'search_interest' => 4, 'increase_percent' => 2],
        ['query' => 'content creation agency', 'search_interest' => 17, 'increase_percent' => 1],
        ['query' => 'content creation software', 'search_interest' => 0, 'increase_percent' => 0],
    ],

    /*
    |--------------------------------------------------------------------------
    | Default Sorting
    |--------------------------------------------------------------------------
    |
    | Controls how trending topics are ordered by default.
    | Options: "interest" (highest search interest first), "increase" (largest
    | increase % first), "interest_desc", "increase_desc".
    |
    */

    'default_sort' => env('AI_TOPICS_DEFAULT_SORT', 'interest'),

];

