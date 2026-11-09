<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::table('reports', function (Blueprint $table) {
        // Status තීරුව එකතු කිරීම
        $table->string('Status')->nullable(); 
    });
}

public function down(): void
{
    Schema::table('reports', function (Blueprint $table) {
        // Rollback කිරීමේදී Status තීරුව ඉවත් කිරීම
        $table->dropColumn('status');
    });
}
};
