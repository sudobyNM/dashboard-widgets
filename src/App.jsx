import React from 'react'
import { useState, useEffect,useMemo } from 'react'
import Header from './Header'
import Dashboard from './components/Dashboard'
import AddWidgetModal from './components/AddWidgetModal'
import data from './data/dashboard.json'
import useDashboardState from './hooks/useDashboardState'

import './App.css'

function App() {
  // Use a tiny custom hook so the app reads like orchestration instead of plumbing
  const {
    widgetCatalog: catalog,
    categories,
    query: search,
    setQuery: setSearch,
    activeCategory,
    openAdd,
    closeAdd,
    removeWidget,
    confirmAdd,
    filteredCatalog,
  } = useDashboardState(data)

  return (
    <div >
      <Header search={search} onSearch={setSearch} />

      {/* Global searchable list of all widgets */}
      <section className="all-widgets">
        <div className="all-widgets__header">
          <h2 className="page-title">CNAPP Dashboard</h2>
          {/* <div className="all-widgets__meta">{filteredCatalog.length} widgets in catalog</div> */}
          <div className="toolbar"> 
            <button className='btn1 btn--ghost' onClick={() => openAdd(categories[0]?.id)}>Add Widget +</button>
            <button className='btn btn--ghost' aria-label='More options'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-vertical"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
            </button>
            <button className='btn btn--primary' aria-label='Time range' style={{display:'flex', alignItems:'center'}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              <span style={{borderLeft:'1px solid white', margin: ' 0px 3px'}}>&nbsp;Last 2 days</span>
            </button>
          </div>
        </div>
        {/* <div className="all-widgets__list">
          {filteredCatalog.map((w) => (
            <div key={w.id} className="all-widgets__item">
              <div className="all-widgets__name">{w.name}</div>
              <div className="all-widgets__text">{w.text}</div>
            </div>
          ))}
          {filteredCatalog.length === 0 && (
            <div className="catalog-empty">No widgets match your search.</div>
          )}
        </div> */}
      </section>

      <Dashboard
        categories={categories}
        catalog={catalog}
        onOpenAdd={openAdd}
        onRemoveWidget={removeWidget}
      />

      <AddWidgetModal
        open={!!activeCategory}
        category={activeCategory}
        catalog={catalog}
        currentWidgetIds={activeCategory?.widgets || []}
        onConfirm={confirmAdd}
        onClose={closeAdd}
      />
    </div>
  )
}

export default App
