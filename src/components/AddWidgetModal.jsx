import React, { useMemo, useState } from "react";

function AddWidgetModal({
  open,
  category,
  catalog,
  currentWidgetIds,
  onConfirm,
  onClose,
}) {
  const [query, setQuery] = useState("");
  const [checked, setChecked] = useState(() => new Set(currentWidgetIds));
  const [newName, setNewName] = useState("");
  const [newText, setNewText] = useState("");

  React.useEffect(() => {
    setChecked(new Set(currentWidgetIds));
  }, [currentWidgetIds, open]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return catalog;
    return catalog.filter(
      (w) =>
        w.name.toLowerCase().includes(q) ||
        (w.tags || []).some((t) => t.toLowerCase().includes(q))
    );
  }, [catalog, query]);

  const toggle = (id) => {
    const next = new Set(checked);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setChecked(next);
  };

  const handleConfirm = () => {
    const target = Array.from(checked);
    onConfirm({
      categoryId: category.id,
      selectedWidgetIds: target,
      newWidget:
        newName.trim() || newText.trim()
          ? {
              id: `custom-${Date.now()}`,
              name: newName.trim() || "Untitled Widget",
              text: newText.trim() || "No details provided",
              tags: ["custom"],
            }
          : null,
    });
    setNewName("");
    setNewText("");
    setQuery("");
  };

  if (!open) return null;

  return (
    <div className="modal" role="dialog" aria-modal="true">
      <div className="modal__panel">
        <div className="modal__header">
          <h3>Add Widget</h3>
          <button className="icon-btn icon-btn--close" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="modal__subheader">
          <span>Personalise your dashboard by adding the following widget</span>
        </div>

        <div className="modal__section">
          <label className="field">
            <span className="field__label">Search widgets</span>
            <input
              className="input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search in catalog..."
            />
          </label>
          <div className="catalog-list">
            {filtered.map((w) => (
              <label key={w.id} className="catalog-item">
                <input
                  type="checkbox"
                  checked={checked.has(w.id)}
                  onChange={() => toggle(w.id)}
                />
                <div className="catalog-item__body">
                  <div className="catalog-item__name">{w.name}</div>
                  <div className="catalog-item__text">{w.text}</div>
                </div>
              </label>
            ))}
            {filtered.length === 0 && (
              <div className="catalog-empty">No widgets match your search.</div>
            )}
          </div>
        </div>

        <div className="modal__section">
          <div className="modal__section-title">Create a new widget</div>
          <div className="grid grid--2">
            <label className="field">
              <span className="field__label">Widget name</span>
              <input
                className="input"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g., Cost Overview"
              />
            </label>
            <label className="field">
              <span className="field__label">Widget text</span>
              <input
                className="input"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="Short description"
              />
            </label>
          </div>
         
        </div>

        <div className="modal__footer">
          <button className="btn btn--ghost" onClick={onClose}>Cancel</button>
          <button className="btn btn--primary" onClick={handleConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default AddWidgetModal;
