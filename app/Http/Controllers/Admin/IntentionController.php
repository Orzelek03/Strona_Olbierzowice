<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Intention;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IntentionController extends Controller
{
    public function index(){

        $intentions = Intention::orderBy('Massdate', 'desc')
        ->orderBy('Masstime', 'desc') -> paginate(15);

        return Inertia::render('admin/Intentions/Index', ['intentions' => $intentions]);
    }

    public function create(){
        return Inertia::render('admin/Intentions/Create');
    }

    public function store(Request $request){
        $validated = $request -> validate([
            'Massdate' => 'required|date',
            'Masstime' => 'required|string|max:5',
            'intention' => 'required|string|max:255',
            'location' => 'required|string|max:255',
        ]);

        Intention::create($validated);

        return redirect()->route('admin.intentions.index')->with('success', 'Intencja została dodana pomyślnie.');
    }

    public function edit($id){
        $intention = Intention::findOrFail($id);
        return Inertia::render('admin/Intentions/Edit', ['intention'=> $intention]);
    }

    public function update(Request $request, $id){
        $intention = Intention::findOrFail($id);

        $validated = $request->validate([
            'Massdate'=> 'required|date|after_or_equal:2026-01-01',
            'Masstime'=> 'required|string|max:5',
            'intention' => 'required|string|max:255',
            'location' => 'required|string|max:255',
        ]);

        $intention->update($validated);

        return redirect()->route('admin.intentions.index')->with('success','Intencja została pomyślnie zaktualizowana.');
    }

    public function delete($id)
    {
        $intention = Intention::findorFail($id);
        $intention -> delete();

        return redirect()->back()->with('success', 'Intencja została usunięta.');
 
        }

    public function lotDelete(Request $request){
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:intentions,id'
                   ]);
        Intention::whereIn('id', $request->ids)->delete();

        return redirect()->back()->with('success', 'Zaznaczone intencje zostały pomyślnie usunięte');
    }
}