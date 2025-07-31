import React from "react";

/**
 * NotesSidebar - Sidebar to display list of notes and search/create functionality
 * @param {Object} props
 * @param {Array} props.notes - Array<{id, title, updatedAt}>
 * @param {string|null} props.selectedId
 * @param {function} props.onSelect
 * @param {function} props.onCreate
 * @param {function} props.onSearch
 * @param {string} props.searchTerm
 */
export default function NotesSidebar({
  notes = [],
  selectedId = null,
  onSelect,
  onCreate,
  onSearch,
  searchTerm = ""
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <input
          type="text"
          className="search-box"
          placeholder="Search notes…"
          value={searchTerm}
          onChange={e => onSearch(e.target.value)}
          aria-label="Search notes"
        />
        <button className="new-note-btn" type="button" title="Create note" onClick={onCreate}>
          +
        </button>
      </div>
      <div className="notes-list">
        {notes.length === 0 && <div className="no-notes">No notes found.</div>}
        {notes.map(note => (
          <div
            key={note.id}
            className={"note-list-item" + (selectedId === note.id ? " selected" : "")}
            tabIndex={0}
            aria-selected={selectedId === note.id}
            onClick={() => onSelect(note.id)}
          >
            <div className="note-title">{note.title || "Untitled note"}</div>
            {note.updatedAt && (
              <div className="note-date">
                {new Date(note.updatedAt).toLocaleDateString()}
              </div>
            )}
          </div>
        ))}
      </div>
      <style>{`
.sidebar {
  width: 280px;
  min-width: 220px;
  max-width: 320px;
  background: var(--card-bg, #fff);
  border-right: 1px solid var(--border-color, #e0e0e0);
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 8px 0 var(--shadow-color, rgba(0,0,0,0.06));
}
.sidebar-header {
  padding: 14px 14px 10px 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid var(--border-color, #e0e0e0);
  background: var(--bg-color, #fff);
}
.search-box {
  flex: 1;
  padding: 7px 12px;
  border: 1px solid var(--border-color, #ddd);
  border-radius: 7px;
  font-size: 1rem;
  background: #fafbfd;
  outline: none;
  color: var(--text-color);
}
.new-note-btn {
  background: var(--accent, #fbc02d);
  color: #fff;
  font-weight: bold;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 1.65rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;
  box-shadow: 0 2px 6px 0 var(--shadow-color, rgba(0,0,0,0.03));
}
.new-note-btn:hover, .new-note-btn:focus {
  background: #ffd749;
}
.notes-list {
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 8px;
}
.note-list-item {
  border-radius: 8px;
  padding: 12px 10px 10px 12px;
  margin-bottom: 2px;
  background: transparent;
  cursor: pointer;
  transition: background 0.17s;
  outline: none;
  display: flex;
  flex-direction: column;
}
.note-list-item.selected,
.note-list-item:hover,
.note-list-item:focus {
  background: var(--primary, #1976d2);
  color: #fff;
}
.note-title {
  font-size: 1rem;
  font-weight: 500;
}
.note-date {
  font-size: 0.82rem;
  color: var(--text-secondary, #5f6368);
  margin-top: 2px;
}
.no-notes {
  color: var(--text-secondary);
  margin: 1.5em auto;
  text-align: center;
  font-size: 1rem;
}
@media (max-width: 720px) {
  .sidebar {
    width: 95vw;
    min-width: unset;
    max-width: unset;
    height: 38vh;
    border-right: none;
    border-bottom: 1px solid var(--border-color, #e0e0e0);
    flex-direction: row;
    overflow-x: auto;
    position: relative;
  }
  .sidebar-header {
    flex-direction: column;
    gap: 7px;
  }
  .notes-list {
    flex-direction: row;
    display: flex;
    flex-wrap: nowrap;
    padding: 6px;
    overflow-x: auto;
    overflow-y: hidden;
  }
  .note-list-item {
    min-width: 150px;
    max-width: 200px;
    margin-right: 6px;
    margin-bottom: 0;
  }
}
      `}</style>
    </aside>
  );
}
