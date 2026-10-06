<?php
$html = file_get_contents(__DIR__ . '/resources/views/admin/layout.blade.php');

$tags = ['head', 'body', 'script', 'style', 'html'];
foreach ($tags as $t) {
    $open = preg_match_all('/<' . $t . '[\s>]/i', $html);
    $close = preg_match_all('/<\/' . $t . '\s*>/i', $html);
    $status = ($open === $close) ? 'OK' : 'MISMATCH';
    echo str_pad($t, 8) . " open=$open close=$close $status\n";
}

echo '@stack occurrences: ' . substr_count($html, "@stack(") . "\n";

// Order check: first <head> before first <body>, single </html> at end
$headPos = strpos($html, '<head>');
$bodyPos = strpos($html, '<body');
$closeHead = strpos($html, '</head>');
$closeBody = strrpos($html, '</body>');
$closeHtml = strrpos($html, '</html>');
echo "order: head($headPos) < body($bodyPos), </head>($closeHead) < </body>($closeBody) < </html>($closeHtml)\n";
echo ($headPos < $bodyPos && $closeHead < $closeBody && $closeBody < $closeHtml) ? "STRUCTURE OK\n" : "STRUCTURE BROKEN\n";
