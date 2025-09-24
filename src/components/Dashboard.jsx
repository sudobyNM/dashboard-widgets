import React from "react";
import CategorySection from "./CategorySection";

function Dashboard({ categories, catalog, onOpenAdd, onRemoveWidget }) {
  const catalogById = React.useMemo(() => {
    const m = new Map(catalog.map((w) => [w.id, w]));
    return m;
  }, [catalog]);

  return (
    <div className="dashboard">
      {categories.map((cat) => {
        const widgets = (cat.widgets || [])
          .map((id) => catalogById.get(id))
          .filter(Boolean);
        return (
          <CategorySection
            key={cat.id}
            category={cat}
            widgets={widgets}
            onOpenAdd={onOpenAdd}
            onRemoveWidget={onRemoveWidget}
          />
        );
      })}
    </div>
  );
}

export default Dashboard;
