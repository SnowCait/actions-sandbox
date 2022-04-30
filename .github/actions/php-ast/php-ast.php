<?php
require 'util.php';

$version = $argv[1];
$paths_file = $argv[2];
$file = $argv[3];

$paths = file_get_contents($paths_file);
if ($paths === false) {
    exit(1);
}
$paths = trim($paths);
$paths = explode("\n", $paths);

foreach($paths as $path) {
    $hash = '';
    if (file_exists($path)) {
        $ast = ast\parse_file($path, $version);
        $hash = md5(ast_dump($ast));
    }
    file_put_contents($file, "{$hash},{$path}\n", FILE_APPEND);
}

echo __LINE__;

$hashes = array_map(function (string $path) use ($version): array {
    $hash = '';
    if (file_exists($path)) {
        $ast = ast\parse_file($path, $version);
        $hash = md5(ast_dump($ast));
    }
    return [
        'path' => $path,
        'hash' => $hash,
    ];
}, $paths);
var_dump(json_encode($hashes));
echo PHP_EOL;
var_dump(phpversion('ast'));
