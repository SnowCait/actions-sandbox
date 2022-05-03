<?php
declare(strict_types=1);

$ast_version = phpversion('ast');
file_put_contents('util.php', file_get_contents("https://raw.githubusercontent.com/nikic/php-ast/v{$ast_version}/util.php")); // TODO: delete
require 'util.php';

$version = (int)$argv[1];
$paths_file = $argv[2];
$hashes_file = $argv[3];

$paths = file_get_contents($paths_file);
if ($paths === false) {
    exit(1);
}
$paths = trim($paths);
$paths = explode("\n", $paths);
// $paths = json_decode(getenv('paths'), true);

// $hashes = array_map(function (string $path) use ($version): array {
//     $hash = '';
//     if (file_exists($path)) {
//         $ast = ast\parse_file($path, $version);
//         $hash = md5(ast_dump($ast));
//     }
//     return [
//         'path' => $path,
//         'hash' => $hash,
//     ];
// }, $paths);
// $json = json_encode($hashes);
// echo "::set-output name=json::{$json}";

foreach($paths as $path) {
    $md5 = '';
    if (file_exists($path)) {
        $ast = ast\parse_file($path, $version);
        $md5 = md5(ast_dump($ast));
    }
    file_put_contents($hashes_file, "{$md5},{$path}\n", FILE_APPEND);
}
