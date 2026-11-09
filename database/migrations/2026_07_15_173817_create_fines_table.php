<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('fines', function (Blueprint $table) {
        $table->id();
        $table->foreignId('member_id'); // සාමාජිකයාගේ ID එක
        $table->string('book_id');
        $table->string('book_title');
        $table->date('return_due_date');
        $table->integer('late_days');
        $table->decimal('fine_amount', 8, 2);
        $table->string('status')->default('pending'); // 'pending' හෝ 'paid'
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fines');
    }
};
