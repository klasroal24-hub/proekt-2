import { useState } from 'react'
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import './App.css'

function App() {
  const [revenue, setRevenue] = useState('')
  const [costs, setCosts] = useState('')
  const [fixedCosts, setFixedCosts] = useState('')
  const [marketing, setMarketing] = useState('')
  
  const [profit, setProfit] = useState(null)
  const [margin, setMargin] = useState(null)
  const [breakEven, setBreakEven] = useState(null)
  const [roi, setRoi] = useState(null)
  
  const [activeSection, setActiveSection] = useState(null)
  const [showGraphs, setShowGraphs] = useState(false)
  const [showCatMessage, setShowCatMessage] = useState(true)

  const calculate = () => {
    const rev = parseFloat(revenue)
    const cos = parseFloat(costs)
    const fixed = parseFloat(fixedCosts) || 0
    const market = parseFloat(marketing) || 0
    
    if (!isNaN(rev) && !isNaN(cos) && rev > 0) {
      const profitValue = rev - cos
      setProfit(profitValue)
      
      const marginValue = (profitValue / rev) * 100
      setMargin(marginValue)
      
      const variableCosts = cos - fixed
      if (variableCosts > 0 && rev > variableCosts) {
        const contributionMargin = rev - variableCosts
        const breakEvenPoint = fixed / (contributionMargin / rev)
        setBreakEven(Math.round(breakEvenPoint))
      } else {
        setBreakEven(null)
      }
      
      const totalInvestment = fixed + market
      if (totalInvestment > 0) {
        const roiValue = (profitValue / totalInvestment) * 100
        setRoi(roiValue)
      } else {
        setRoi(null)
      }
      
      setShowGraphs(true)
      setShowCatMessage(false)
      setTimeout(() => setShowCatMessage(true), 3000)
    }
  }

  const profitData = profit !== null ? [
    { name: 'Выручка', value: parseFloat(revenue) },
    { name: 'Затраты', value: parseFloat(costs) },
    { name: 'Прибыль', value: profit }
  ] : []

  const trendData = [
    { month: 'Янв', profit: profit ? profit * 0.8 : 0 },
    { month: 'Фев', profit: profit ? profit * 0.9 : 0 },
    { month: 'Мар', profit: profit ? profit * 1.0 : 0 },
    { month: 'Апр', profit: profit ? profit * 1.2 : 0 },
    { month: 'Май', profit: profit ? profit * 1.4 : 0 },
    { month: 'Июн', profit: profit ? profit * 1.6 : 0 },
  ]

  const COLORS = ['#4ade80', '#f87171', '#60a5fa']

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section)
  }

  return (
    <div className="app">
      <div className="animated-bg">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
        <div className="grid-pattern"></div>
      </div>

      <div className="container">
        <header>
          <div className="logo-container">
            <div className="logo-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 17L9 11L13 15L21 6" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M3 21H21" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#667eea"/>
                    <stop offset="100%" stopColor="#764ba2"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1 className="logo">
              <span className="glow">BizLitics</span>
            </h1>
          </div>
          <p className="subtitle">умный анализ бизнес-показателей</p>
        </header>

        <div className="main-grid">
          <div className="input-section">
            <div className="card glass">
              <h2>📊 Введите данные</h2>
              
              <div className="input-group">
                <label>💰 Выручка</label>
                <input type="number" placeholder="0 ₽" value={revenue} onChange={(e) => setRevenue(e.target.value)} />
              </div>

              <div className="input-group">
                <label>📉 Общие затраты</label>
                <input type="number" placeholder="0 ₽" value={costs} onChange={(e) => setCosts(e.target.value)} />
              </div>

              <button className="calculate-btn" onClick={calculate}>
                <span>✨ Рассчитать показатели</span>
              </button>
            </div>

            <div className="functions-section">
              <div className="function-item" onClick={() => toggleSection('fixed')}>
                <div className="function-header">
                  <span className="function-icon">🏭</span>
                  <span className="function-title">Постоянные затраты</span>
                  <span className="function-arrow">{activeSection === 'fixed' ? '▲' : '▼'}</span>
                </div>
                {activeSection === 'fixed' && (
                  <div className="function-content">
                    <input type="number" placeholder="Введите постоянные затраты" value={fixedCosts} onChange={(e) => setFixedCosts(e.target.value)} />
                    <p className="hint">Аренда, зарплата, коммунальные платежи</p>
                  </div>
                )}
              </div>

              <div className="function-item" onClick={() => toggleSection('marketing')}>
                <div className="function-header">
                  <span className="function-icon">📢</span>
                  <span className="function-title">Маркетинговый бюджет</span>
                  <span className="function-arrow">{activeSection === 'marketing' ? '▲' : '▼'}</span>
                </div>
                {activeSection === 'marketing' && (
                  <div className="function-content">
                    <input type="number" placeholder="Введите бюджет на маркетинг" value={marketing} onChange={(e) => setMarketing(e.target.value)} />
                    <p className="hint">Реклама, продвижение, SMM</p>
                  </div>
                )}
              </div>

              <div className="function-item" onClick={() => toggleSection('insight')}>
                <div className="function-header">
                  <span className="function-icon">💡</span>
                  <span className="function-title">Бизнес-совет</span>
                  <span className="function-arrow">{activeSection === 'insight' ? '▲' : '▼'}</span>
                </div>
                {activeSection === 'insight' && (
                  <div className="function-content">
                    <p>📌 Совет: Оптимизируйте затраты и увеличивайте выручку на 20% для роста прибыли</p>
                    <p>🎯 Цель: Достичь рентабельности 30%</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="results-section">
            {showGraphs && profit !== null && (
              <>
                <div className="cards-grid">
                  <div className="stat-card profit-stat">
                    <div className="stat-icon">💰</div>
                    <div className="stat-info">
                      <h4>Прибыль</h4>
                      <p className={profit >= 0 ? 'positive' : 'negative'}>{profit >= 0 ? '+' : ''}{profit.toLocaleString()} ₽</p>
                    </div>
                  </div>

                  <div className="stat-card margin-stat">
                    <div className="stat-icon">📈</div>
                    <div className="stat-info">
                      <h4>Рентабельность</h4>
                      <p className={margin >= 0 ? 'positive' : 'negative'}>{margin.toFixed(1)}%</p>
                    </div>
                  </div>

                  {breakEven && (
                    <div className="stat-card breakeven-stat">
                      <div className="stat-icon">🎯</div>
                      <div className="stat-info">
                        <h4>Точка безубыточности</h4>
                        <p className="positive">{breakEven.toLocaleString()} ₽</p>
                      </div>
                    </div>
                  )}

                  {roi && (
                    <div className="stat-card roi-stat">
                      <div className="stat-icon">📊</div>
                      <div className="stat-info">
                        <h4>ROI</h4>
                        <p className={roi >= 0 ? 'positive' : 'negative'}>{roi.toFixed(1)}%</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="graphs-container">
                  <div className="graph-card">
                    <h3>📈 Тренд прибыли</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={trendData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="month" stroke="#888" />
                        <YAxis stroke="#888" />
                        <Tooltip contentStyle={{ background: '#1a1a2e', border: 'none', borderRadius: '8px' }} />
                        <Line type="monotone" dataKey="profit" stroke="#60a5fa" strokeWidth={3} dot={{ fill: '#60a5fa', r: 6 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="graph-card">
                    <h3>🥧 Структура выручки</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie data={profitData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                          {profitData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ background: '#1a1a2e', border: 'none', borderRadius: '8px' }} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="insight-card">
                  <h3>💡 Аналитика бизнеса</h3>
                  <div className="insight-content">
                    {profit >= 0 ? (
                      <p>✅ Бизнес прибыльный. Рентабельность: {margin.toFixed(1)}%</p>
                    ) : (
                      <p>⚠️ Бизнес убыточный. Нужно увеличить выручку на {Math.abs((profit / parseFloat(revenue)) * 100).toFixed(0)}%</p>
                    )}
                    {margin >= 30 && profit > 0 && <p>🏆 Отлично! Выше рынка на 15%</p>}
                    {margin < 10 && profit > 0 && <p>📉 Низкая маржинальность. Оптимизируйте затраты</p>}
                    {roi && roi > 50 && <p>🚀 Инвестиции окупаются отлично! ROI: {roi.toFixed(0)}%</p>}
                  </div>
                </div>
              </>
            )}

            {!showGraphs && (
              <div className="card placeholder-card">
                <h3>📊 Введите данные для анализа</h3>
                <p>Получите графики, метрики и бизнес-советы</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Кот в шляпе и очках */}
      <div className="cat-container">
        <div className="cat-character">
          <div className="cat-head">
            <div className="cat-hat">🎩</div>
            <div className="cat-face">🐱</div>
          </div>
          {showCatMessage && (
            <div className="cat-speech">
              <p>📈 Привет! Я BizKit!</p>
              <p>💡 Введи цифры и нажми "Рассчитать"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App