import React from "react";
import WidgetCard from "./WidgetCard";

function CategorySection({ category, widgets, onRemoveWidget, onOpenAdd }) {
  return (
    <section className="category">
      <div className="category__header">
        <h3 className="category__title">{category.name}</h3>
      </div>
      <div className="category__grid">
        {widgets.length === 0 ? (
          <div className="category__empty">No widgets yet. Click "Add Widget" to get started.</div>
        ) : (
          widgets.map((w) => (
            <WidgetCard key={w.id} widget={w} onRemove={(id) => onRemoveWidget(category.id, id)} />
          ))
        )}
        {/* Add-widget tile inside the grid */}
        <button className="add-card" onClick={() => onOpenAdd(category.id)}>
          <span className="add-card__icon">+</span>
          <span className="add-card__label">Add Widget</span>
        </button>
      </div>
    </section>
  );
}

export default CategorySection;
