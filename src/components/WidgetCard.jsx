import React from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

function WidgetCard({ widget, onRemove }) {
  const hasChartData = Array.isArray(widget.data) && widget.data.length > 0;
  const n = (v) => (typeof v === 'number' ? v.toLocaleString() : v);
  const total = hasChartData ? widget.data.reduce((sum, d) => sum + (d.value || 0), 0) : 0;

  const LegendList = ({ items }) => (
    <ul className="legend">
      {items.map((it) => (
        <li key={it.name} className="legend__item">
          <span className="legend__dot" style={{ background: it.color }} />
          <span className="legend__label">{it.name}</span>
          <span className="legend__count">({n(it.value)})</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="widget-card" data-widget-id={widget.id}>
      <div className="widget-card__header">
        <h4 className="widget-card__title">{widget.name}</h4>
        {onRemove && (
          <button
            className="icon-btn icon-btn--close"
            aria-label="Remove widget"
            title="Remove"
            onClick={() => onRemove(widget.id)}
          >
            ×
          </button>
        )}
      </div>

      <div className="widget-card__body">
        {widget.id === "cloud-accounts" && hasChartData && (
          <div className="chart-row">
            <div className="chart-row__chart">
              <PieChart width={140} height={120}>
                {/* track ring */}
                <Pie
                  data={[{ value: 1 }]}
                  dataKey="value"
                 
                  cy="50%"
                   cx="50%"
                  innerRadius={42}
                  outerRadius={56}
                   
                  startAngle={-270}
                   endAngle={90}
                
                  isAnimationActive={false}
                  fill="#eef2ff"
                 
                />
                <Pie
                  data={widget.data}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={42}
                  outerRadius={56}
                    endAngle={90}
                  startAngle={-270}
                 
                >
                  {widget.data.map((entry, i) => (
                    <Cell key={`ca-${i}`} fill={entry.color} />
                  ))}
                </Pie>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="center-label">
                  <tspan className="center-label__value">{n(total)}</tspan>
                  <tspan x="50%" dy="16" className="center-label__sub">Total</tspan>
                </text>
                <Tooltip />
              </PieChart>
            </div>
            <LegendList items={widget.data} />
          </div>
        )}

        {widget.id === "cloud-risk-assessment" && hasChartData && (
          <div className="chart-row">
            <div className="chart-row__chart">
              <PieChart width={160} height={130}>
                {/* track ring */}
                <Pie
                  data={[{ value: 1 }]}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={64}
                  startAngle={-270}
                  endAngle={90}
                  fill="#eef2ff"
                  isAnimationActive={false}
                />
                <Pie
                  data={widget.data}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={64}
                  startAngle={-270}
                  endAngle={90}
                 
                >
                  {widget.data.map((entry, i) => (
                    <Cell key={`ra-${i}`} fill={entry.color} />
                  ))}
                </Pie>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="center-label">
                  <tspan className="center-label__value">{n(total)}</tspan>
                  <tspan x="50%" dy="16" className="center-label__sub">Total</tspan>
                </text>
                <Tooltip />
              </PieChart>
            </div>
            <LegendList items={[...widget.data].reverse()} />
          </div>
        )}

        {!hasChartData && (widget.text ? (
          // if text is provided, show image and text
          <div style={{ textAlign: 'center', padding: '10px' }}>
            <img src="./src/assets/bars.png" alt="bar chart"  style={{ width: '64px', height: '60px' }} />
            <p className="widget-card__text">{widget.text}</p>
          </div>) : (

            
            
          <div className="widget-card__placeholder">No data available</div>
        ))}
      </div>
    </div>
  );
}

export default WidgetCard;
