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
        Schema::table('intentions', function (Blueprint $table){
            $table->dropColumn(['Massdate', 'Masstime', 'location', 'intention']);

            $table->string('title')->after('id');
            $table->longtext('content')->after('title');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('intentions', function(Blueprint $table){
            $table->date('Massdate')->nullable();
            $table->string('Masstime')->nullable();
            $table->string('location')->nullable();
            $table->string('intention')->nullable();

            $table->dropColumn(['title', 'content']);

        });
    }
};
