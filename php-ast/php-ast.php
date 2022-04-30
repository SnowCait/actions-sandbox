<?php
file_put_contents('util.php', file_get_contents('https://raw.githubusercontent.com/nikic/php-ast/master/util.php'));
require 'util.php';

$paths = file_get_contents('paths');
if ($paths === false)
{
    exit(1);
}
$paths = trim($paths);
$paths = explode("\n", $paths);
var_dump($paths);
echo PHP_EOL;

$version = 90;
$ast = ast\parse_file('php-ast/index.php', $version);
echo ast_dump($ast);
echo PHP_EOL;
echo '-------' . PHP_EOL;
echo md5(ast_dump($ast));
