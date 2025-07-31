import React, { useState, useEffect } from "react";
import NotesSidebar from "./NotesSidebar.jsx";
import NoteEditor from "./NoteEditor.jsx";

// Helper to generate a new note
function newNoteTmpl() {
  return {
    id: Math.random().toString(36).slice(2, 12),
    title: "",
    content: "",
    updatedAt: new Date().toISOString()
  };
}

// PUBLIC_INTERFACE
/** Main notes app component (PUBLIC_INTERFACE for main entry page). */
export default function NotesApp() {
  let initialNotes = [];
  if (typeof window !== "undefined") {
    try {
      initialNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    } catch { initialNotes = []; }
  }
  const [notes, setNotes] = useState(initialNotes);
  const [selectedId, setSelectedId] = useState(initialNotes?.[0]?.id || null);
  const [searchTerm, setSearchTerm] = useState("");
  const [editing, setEditing] = useState(false);     // true if creating a new note
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    // Reset draft when selectedId or notes changes
    const selected = notes.find(n => n.id === selectedId);
    setDraft(selected ? { ...selected } : null);
    setEditing(false);
  }, [selectedId, notes]);

  function handleSelect(id) {
    setSelectedId(id);
    setEditing(false);
  }

  function handleCreate() {
    setDraft({ ...newNoteTmpl() });
    setEditing(true);
    setSelectedId(null);
  }

  function handleSave(note) {
    if (editing) {
      // create new
      const newList = [{...note, updatedAt: new Date().toISOString()}, ...notes];
      setNotes(newList);
      setSelectedId(note.id);
    } else {
      // update
      setNotes(notes.map(n =>
        n.id === note.id ? { ...n, ...note, updatedAt: new Date().toISOString() } : n
      ));
    }
    setEditing(false);
  }

  function handleDelete(id) {
    setNotes(notes.filter(n => n.id !== id));
    setSelectedId(notes.length > 1
      ? notes.find(n => n.id !== id)?.id ?? null
      : null);
    setEditing(false);
    setDraft(null);
  }

  function handleDraftChange(note) {
    setDraft(note);
  }

  function handleSearch(term) {
    setSearchTerm(term ?? "");
  }

  const filteredNotes = searchTerm
    ? notes.filter(n =>
      (n.title && n.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (n.content && n.content.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : notes;

  const isNew = editing;

  return (
    <div className="notes-app-root">
      <NotesSidebar
        notes={filteredNotes}
        selectedId={selectedId}
        onSelect={handleSelect}
        onCreate={handleCreate}
        onSearch={handleSearch}
        searchTerm={searchTerm}
      />
      <main className="main-area">
        {isNew || draft ? (
          <NoteEditor
            note={draft || newNoteTmpl()}
            isNew={isNew}
            onSave={handleSave}
            onDelete={handleDelete}
            onChange={handleDraftChange}
          />
        ) : (
          <div className="empty-state">
            <h3>Welcome to your notes!</h3>
            <p>
              Select a note from the sidebar or create a new one <span style={{color: "var(--accent)"}}>+</span>.
            </p>
          </div>
        )}
      </main>
      <style>{`
.notes-app-root {
  display: flex;
  height: 100vh;
  background: var(--bg-color);
}
.main-area {
  flex: 1 1 auto;
  padding: 0;
  background: var(--bg-color);
  display: flex;
  min-width: 0;
  min-height: 100vh;
  align-items: stretch;
  overflow: auto;
  justify-content: center;
}
.empty-state {
  text-align: center;
  margin: auto;
  color: var(--text-secondary);
}
.empty-state h3 {
  color: var(--primary, #1976d2);
  font-weight: 700;
  font-size: 1.8em;
  margin: 0 0 0.5em 0;
}
.empty-state p { font-size: 1.1em; }
@media (max-width: 720px) {
  .notes-app-root { flex-direction: column; }
}
      `}</style>
    </div>
  );
}
