<?php
declare(strict_types=1);

use PHPUnit\Framework\TestCase;

final class YaLinqoTest extends TestCase
{
    /**
     * @test
     */
    public function select(): void
    {
        $xs = from(range(1, 10))
            ->where(fn($x) => $x % 2 != 0)
            ->select(fn($x) => $x * $x);
        $this->assertSame([1, 9, 25, 49, 81], $xs->toList());
    }
}
