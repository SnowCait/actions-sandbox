<?php
file_put_contents('util.php', file_get_contents('https://raw.githubusercontent.com/nikic/php-ast/master/util.php'));
require 'util.php';

$paths = file_get_contents('paths');
if ($paths === false) {
    exit(1);
}
$paths = trim($paths);
$paths = explode("\n", $paths);

$version = 90;
foreach($paths as $path) {
    $ast = ast\parse_file('php-ast/index.php', $version);
    $md5 = md5(ast_dump($ast));
    file_put_contents('head', "{$md5},{$path}\n", FILE_APPEND);
}
