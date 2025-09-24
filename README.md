# Dashboard Widgets
## A small React (Vite) dashboard that renders categories and widgets from a JSON file. You can search, add, and remove widgets per category. Changes persist to localStorage. The Add Widget experience uses a right‑side sheet.

# Run locally

```bash
# clone the repository
git clone <your-repo-url>
cd dashboard_widgets

# install dependencies
npm install

# start dev server (Vite)
npm run dev

# build for production (optional)
npm run build

# preview the production build
npm run preview
```

# Project Structure

`src/
  App.jsx                 # shell: header, toolbar, and sections
  App.css                 # styles (cards, grid, right-side modal, widgets)
  Header.jsx              # search input + icons
  components/
    Dashboard.jsx         # maps categories to sections
    CategorySection.jsx   # section header, grid layout, add-tile inside grid
    WidgetCard.jsx        # card UI; donut charts via Recharts
    AddWidgetModal.jsx    # right-side sheet to assign/create widgets
  data/
    dashboard.json        # catalog + categories
  hooks/
    useDashboardState.js  # state/persistence/search helpers
    `
