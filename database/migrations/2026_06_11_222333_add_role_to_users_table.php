<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
{
   Schema::create('users', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('email')->unique();
    $table->string('username')->unique(); // මෙය අනිවාර්යයෙන් එක් කරන්න
    $table->string('password');
    $table->string('role');               // මෙය එක් කරන්න
    $table->string('gender');
    $table->string('phonenumber');        // මෙය එක් කරන්න
    $table->timestamp('email_verified_at')->nullable();
    $table->rememberToken();
    $table->timestamps();
});
}

public function down(): void
{
    Schema::table('users', function (Blueprint $table) {
        $table->dropColumn(['role', 'username']);
    });
}
};
