<?php
declare(strict_types=1);

use PHPUnit\Framework\TestCase;

final class GinqTest extends TestCase
{
    /**
     * @test
     */
    public function select(): void
    {
        $xs = Ginq::from(range(1, 10))
            ->where(function($x) { return $x % 2 != 0; })
            ->select(function($x) { return $x * $x; });
        $this->assertSame([1, 9, 25, 49, 81], $xs->toList());
    }
}
