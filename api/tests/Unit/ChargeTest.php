<?php

namespace Tests\Feature\Unit;

use App\Common\Charge\ChargeTransaction;
use App\Common\Core\Validator\DBValidator;
use Tests\TestCase;

class ChargeTest extends TestCase
{
    public function testDebtors()
    {
        $charge = new ChargeTransaction(new DBValidator);
        $this->assertFalse($charge->itsDebtor(1));
        $this->assertTrue($charge->itsDebtor(2) != false);
    }
}
