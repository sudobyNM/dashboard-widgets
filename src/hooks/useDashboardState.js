import { useEffect, useMemo, useState } from 'react';

// A small, hand-rolled state manager for the dashboard.
// - Persists to localStorage so a page refresh keeps the layout
export default function useDashboardState(seed) {
  const STORAGE_KEY = 'dashboard_state';

  const [widgetCatalog, setWidgetCatalog] = useState(seed.catalog);
  const [categories, setCategories] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return parsed.categories || seed.categories;
      }
    } catch (_) {}
    return seed.categories;
  });

  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  //lightweight snapshot. Keeping it tiny keeps it resilient.
  useEffect(() => {
    const snapshot = { categories, catalog: widgetCatalog };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  }, [categories, widgetCatalog]);

  const openAdd = (categoryId) => {
    const match = categories.find((c) => c.id === categoryId);
    setActiveCategory(match || null);
  };
  const closeAdd = () => setActiveCategory(null);

  const removeWidget = (categoryId, widgetId) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId
          ? { ...c, widgets: (c.widgets || []).filter((id) => id !== widgetId) }
          : c
      )
    );
  };

  const confirmAdd = ({ categoryId, selectedWidgetIds, newWidget }) => {
    if (newWidget) {
      setWidgetCatalog((prev) => (prev.some((w) => w.id === newWidget.id) ? prev : [...prev, newWidget]));
      selectedWidgetIds = Array.from(new Set([...(selectedWidgetIds || []), newWidget.id]));
    }
    setCategories((prev) =>
      prev.map((c) => (c.id === categoryId ? { ...c, widgets: Array.from(new Set(selectedWidgetIds)) } : c))
    );
    closeAdd();
  };

  const filteredCatalog = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return widgetCatalog;
    return widgetCatalog.filter((w) => {
      const text = `${w.name} ${w.text || ''}`.toLowerCase();
      const tags = (w.tags || []).join(' ').toLowerCase();
      return text.includes(q) || tags.includes(q);
    });
  }, [widgetCatalog, query]);

  return {
    widgetCatalog,
    categories,
    query,
    setQuery,
    activeCategory,
    openAdd,
    closeAdd,
    removeWidget,
    confirmAdd,
    filteredCatalog,
  };
}
