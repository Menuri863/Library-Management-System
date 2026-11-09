<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->book_id();
            
            
            $table->string('title');       
            $table->string('author');      
            $table->string('isbn');        
            $table->integer('quantity');   
           
            
            $table->timestamps();
        });
    }

    
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};