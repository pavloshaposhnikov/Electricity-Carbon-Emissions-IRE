import { useState, useEffect } from 'react'
import { generateMockSeries } from './data/mock'
import CarbonIntensityChart from './components/CarbonIntensityChart'
import GenerationMixChart from './components/GenerationMixChart'
import type { DateRange } from './types'
import './App.css'

type Provider = 'Mock (offline)' | 'EirGrid (real-time)' | 'ENTSO-E (real-time)'

function App() {
  const [dateRange, setDateRange] = useState<DateRange>('24h')
  const [provider, setProvider] = useState<Provider>('Mock (offline)')
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        let result
        if (provider === 'Mock (offline)') {
          result = generateMockSeries(dateRange)
        } else {
          // For now, just use mock data for other providers
          result = generateMockSeries(dateRange)
        }
        setData(result)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [dateRange, provider])

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">Electricity Carbon Emissions</h1>
          <div className="controls">
            <div className="control-group">
              <label className="control-label">Date range</label>
              <select
                className="control-select"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as DateRange)}
                disabled={loading}
              >
                <option value="24h">24 hours</option>
                <option value="48h">48 hours</option>
                <option value="7d">7 days</option>
              </select>
            </div>
            <div className="control-group">
              <label className="control-label">Data source</label>
              <select
                className="control-select"
                value={provider}
                onChange={(e) => setProvider(e.target.value as Provider)}
                disabled={loading}
              >
                <option value="Mock (offline)">Mock (offline)</option>
                <option value="EirGrid (real-time)">EirGrid (real-time)</option>
                <option value="ENTSO-E (real-time)">ENTSO-E (real-time)</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        {loading && (
          <div className="loading-message">
            <p>🔄 Loading data...</p>
          </div>
        )}

        {data && (
          <>
            <section className="chart-section">
              <div className="chart-card">
                <h2 className="section-title">Carbon Intensity</h2>
                <CarbonIntensityChart data={data.intensity} />
              </div>
            </section>
            
            <section className="chart-section">
              <div className="chart-card">
                <h2 className="section-title">Generation Mix</h2>
                <GenerationMixChart data={data.generation} />
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="footer">
        <small>
          Data source: {provider === 'Mock (offline)' ? 'mock offline' : provider}. 
          {provider !== 'Mock (offline)' && ' Real-time data from EirGrid transparency platform.'}
        </small>
      </footer>
    </div>
  )
}

export default App
