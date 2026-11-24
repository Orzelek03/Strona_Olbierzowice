<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Throwable;

class SiteStat extends Model
{
    protected $fillable = ['key', 'value'];

    protected $casts = [
        'value' => 'integer',
    ];

    public const TOTAL_VISITS_KEY = 'total_visits';

    public static function recordAndGetTotalVisits(Request $request): int
    {
        try {
            if (self::shouldCountVisit($request)) {
                $updated = DB::table('site_stats')
                    ->where('key', self::TOTAL_VISITS_KEY)
                    ->increment('value', 1, ['updated_at' => now()]);

                if ($updated === 0) {
                    DB::table('site_stats')->insertOrIgnore([
                        'key' => self::TOTAL_VISITS_KEY,
                        'value' => 1,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                }

                $request->session()->put('parafia_visit_counted', true);
            }

            $value = DB::table('site_stats')
                ->where('key', self::TOTAL_VISITS_KEY)
                ->value('value');

            return is_numeric($value) ? (int) $value : 0;
        } catch (Throwable) {
            return 0;
        }
    }

    private static function shouldCountVisit(Request $request): bool
    {
        if (! $request->isMethod('GET')) {
            return false;
        }

        if ($request->is('admin', 'admin/*', 'login', 'settings', 'settings/*', 'forgot-password', 'reset-password*', 'two-factor-challenge', 'email/*', 'user/*', 'passkeys/*')) {
            return false;
        }

        if ($request->session()->has('parafia_visit_counted')) {
            return false;
        }

        $userAgent = strtolower((string) $request->userAgent());
        if ($userAgent === '' || preg_match('/bot|crawl|spider|slurp|mediapartners|facebookexternalhit|lighthouse|headless|curl|wget/', $userAgent) === 1) {
            return false;
        }

        return true;
    }
}
