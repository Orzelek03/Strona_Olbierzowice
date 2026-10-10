<?php


namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnnouncementController extends Controller{
    public function index(){
        $announcements=Announcement::orderBy('created_at','desc')->orderBy('type','desc')->orderBy('location','desc')->paginate(10);

        return Inertia::render('admin/Announcements/Index',[
            'announcements' => $announcements
        ]);
    }
    public function create(){
        return Inertia::render('admin/Announcements/Create');
    }

    public function store(Request $request){
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'is_published' => 'required|boolean',
            'type' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
        ]);
        if ($validated['type'] === 'katecheza'){
            $validated['location'] = 'Brak';
        }

        Announcement::create($validated);

        return redirect()->route('admin.announcements.index')->with('success','Dodano pomyślnie ogłoszenie.');
    }
    public function edit($id){
        $announcement = Announcement::findOrFail($id);
        return Inertia::render('admin/Announcements/Edit', [
            'announcement' => $announcement
            ]);
    }

    public function update (Request $request, $id){
        $announcement = Announcement::findOrFail($id);

        $validated=$request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'is_published' => 'required|boolean',
            'type' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',
        ]);
        if ($validated['type'] === 'katecheza'){
            $validated['location'] = 'Brak';
        }
        $announcement->update($validated);
        return redirect()->route('admin.announcements.index')->with('success','Ogłoszenie zostało zaktualizowane.');
    }

    public function delete($id){
        $announcement = Announcement::findOrFail($id);
        $announcement->delete();

        return redirect()->back()->with('success', 'Ogłoszenie zostało usunięte.');
    }

    public function lotDelete(Request $request){
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'integer|exists:announcements,id'
        ]);
    
        Announcement::whereIn('id', $request->ids)->delete();
        return redirect()->back()->with('success', 'Zaznaczone ogłoszenia zostały usunięte pomyślnie.');
    }
}