<?php

namespace App\Services\Ai;

use App\Services\Ai\Contracts\AiProvider;

class MockProvider implements AiProvider
{
    public function generate(string $systemPrompt, string $userPrompt, string $model): string
    {
        // Deterministic pseudo-random based on the prompt so output is stable per topic.
        $seed = crc32($userPrompt);
        mt_srand($seed);

        // Extract the topic from the user prompt (after "Topic:" marker).
        $topic = 'Your AI Blog Topic';
        if (preg_match('/Topic:\s*(.+)/i', $userPrompt, $m)) {
            $topic = trim($m[1]);
        } elseif (preg_match('/"topic"\s*:\s*"([^"]+)"/i', $userPrompt, $m)) {
            $topic = trim($m[1]);
        }

        // Extract optional trend signals included by the service.
        $searchInterest = null;
        if (preg_match('/Google search interest for this topic:\s*([^\s(]+)/i', $userPrompt, $m)) {
            $searchInterest = trim($m[1]);
        }

        $increasePercent = null;
        if (preg_match('/Google search volume increase for this topic:\s*([^\s%]+)/i', $userPrompt, $m)) {
            $increasePercent = trim($m[1]);
        }

        $title = $this->buildTitle($topic);

        $sections = [
            'Introduction' => "In this article, we explore **{$title}** and why it matters for individuals, businesses, and legal practitioners. "
                . 'Legal landscapes are evolving rapidly, and staying ahead requires understanding both the opportunities and the challenges.',
            'Why This Is Trending' => $this->buildTrendingSection($topic, $searchInterest, $increasePercent),
            'Key Benefits' => "- Protects your rights and interests through informed legal action\n- Reduces risk by ensuring compliance with applicable laws\n- Provides clarity and peace of mind in complex situations\n- Strengthens your position in negotiations or disputes",
            'Practical Steps' => "1. Identify the specific legal issue or question you need to address\n2. Gather all relevant documents and evidence\n3. Consult with a qualified attorney in your jurisdiction\n4. Follow the recommended legal strategy and timeline",
            'Common Pitfalls' => 'Avoid representing yourself in complex legal matters without proper guidance. Legal issues are best handled with professional advice, thorough documentation, and a clear understanding of your jurisdiction\'s laws. '
                . 'Plan for legal costs and timelines from the outset.',
            'Conclusion' => "The legal landscape rewards those who act with knowledge. By understanding **{$title}**, you can make informed decisions and protect your interests in today\'s evolving legal environment.",
        ];

        $body = '';
        foreach ($sections as $heading => $text) {
            $body .= "\n### {$heading}\n\n{$text}\n";
        }

        $excerpt = "An insightful look at {$title} and the practical steps any organization can take to succeed.";

        $json = [
            'title' => $title,
            'excerpt' => $excerpt,
            'content' => $body,
        ];

        mt_srand();

        return json_encode($json, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    }

    public function name(): string
    {
        return 'mock';
    }

    /**
     * Build a compelling, SEO-friendly title from the raw topic query.
     */
    protected function buildTitle(string $topic): string
    {
        $words = preg_split('/[\s,;]+/', trim($topic));
        $words = array_values(array_filter($words ?: [], fn ($w) => $w !== ''));

        $count = count($words);
        if ($count <= 4) {
            return ucwords($topic);
        }

        // Truncate long queries to a readable title (~8 words) and strip trailing punctuation.
        $title = ucwords(implode(' ', array_slice($words, 0, 8)));
        $title = rtrim($title, ".,;:!?");

        return $title;
    }

    /**
     * Build the "Why This Is Trending" section using the supplied trend signals.
     */
    protected function buildTrendingSection(string $topic, ?string $searchInterest, ?string $increasePercent): string
    {
        $intro = "Search interest around **{$topic}** has been climbing, and the numbers tell a clear story: "
            . 'people are actively looking for practical guidance, reliable tools, and proven workflows.';

        $lines = [$intro];

        if ($increasePercent !== null && $increasePercent !== '' && $increasePercent !== '0') {
            $lines[] = "- Search volume for this topic has grown by **{$increasePercent}%** over the period, "
                . 'signaling a surge in demand for fresh, useful content.';
        }

        if ($searchInterest !== null && $searchInterest !== '' && $searchInterest !== '0') {
            $lines[] = "- Current search interest sits at **{$searchInterest}** on Google\u{2019}s relative 0\u{2013}100 scale, "
                . 'placing it well within the mainstream conversation.';
        } else {
            $lines[] = '- The topic is showing **breakout momentum**, with searches spiking far above their historical baseline.';
        }

        $lines[] = '- Early movers who publish now can capture attention while competition is still low.';

        return implode("\n", $lines);
    }
}

