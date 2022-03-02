<?php
declare(strict_types=1);

use PHPUnit\Framework\TestCase;
use Pinq\Traversable, Pinq\Collection;

final class PinqTest extends TestCase
{
    /**
     * @test
     */
    public function selectTraversable(): void
    {
        $xs = Traversable::from(range(1, 10))
            ->where(fn($x) => $x % 2 != 0)
            ->select(fn($x) => $x * $x);
        $this->assertSame([0, 2, 4, 6, 8], $xs->keys()->asArray());
        $this->assertSame([1, 9, 25, 49, 81], array_values($xs->asArray()));
    }

    /**
     * @test
     */
    public function selectCollection(): void
    {
        $xs = Collection::from(range(1, 10))
            ->where(fn($x) => $x % 2 != 0)
            ->select(fn($x) => $x * $x);
        $this->assertSame([0, 2, 4, 6, 8], $xs->keys()->asArray());
        $this->assertSame([1, 9, 25, 49, 81], array_values($xs->asArray()));
    }
}
