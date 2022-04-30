<?php
file_put_contents('util.php', file_get_contents('https://raw.githubusercontent.com/nikic/php-ast/master/util.php'));
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
    $md5 = '';
    if (file_exists($path)) {
        $ast = ast\parse_file($path, $version);
        $md5 = md5(ast_dump($ast));
    }
    file_put_contents($file, "{$md5},{$path}\n", FILE_APPEND);
}
