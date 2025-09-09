import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'
import type { GenerationMixPoint } from '../types'
import { format } from 'date-fns'

type Props = { data: GenerationMixPoint[] }

const COLORS: Record<string, string> = {
  wind: '#06b6d4',
  solar: '#f59e0b',
  hydro: '#22c55e',
  gas: '#ef4444',
  coal: '#6b7280',
  biomass: '#84cc16',
  imports: '#a855f7',
}

const GRADIENTS: Record<string, { id: string, colors: string[] }> = {
  wind: { id: 'windGradient', colors: ['#06b6d4', '#0891b2'] },
  solar: { id: 'solarGradient', colors: ['#f59e0b', '#d97706'] },
  hydro: { id: 'hydroGradient', colors: ['#22c55e', '#16a34a'] },
  gas: { id: 'gasGradient', colors: ['#ef4444', '#dc2626'] },
  coal: { id: 'coalGradient', colors: ['#6b7280', '#4b5563'] },
  biomass: { id: 'biomassGradient', colors: ['#84cc16', '#65a30d'] },
  imports: { id: 'importsGradient', colors: ['#a855f7', '#9333ea'] },
}

export default function GenerationMixChart({ data }: Props) {
  if (!data || data.length === 0) {
    return (
      <div style={{ 
        height: 360, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        color: '#6b7280',
        fontSize: '1.125rem'
      }}>
        No data available
      </div>
    )
  }

  const chartData = data.map(d => ({
    time: d.timestamp.getTime(),
    wind: d.mix.wind,
    solar: d.mix.solar,
    hydro: d.mix.hydro,
    gas: d.mix.gas,
    coal: d.mix.coal,
    biomass: d.mix.biomass,
    imports: d.mix.imports,
  }))

  return (
    <ResponsiveContainer width="100%" height={360}>
      <AreaChart data={chartData} margin={{ top: 8, right: 16, bottom: 8, left: 0 }} stackOffset="expand">
        <defs>
          {Object.entries(GRADIENTS).map(([key, gradient]) => (
            <linearGradient key={key} id={gradient.id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={gradient.colors[0]} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={gradient.colors[1]} stopOpacity={0.6}/>
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" opacity={0.5} />
        <XAxis
          dataKey="time"
          type="number"
          domain={[chartData[0]?.time ?? 'dataMin', chartData[chartData.length - 1]?.time ?? 'dataMax']}
          tickFormatter={(v) => format(new Date(v), 'HH:mm')}
          tick={{ fontSize: 12, fill: '#6b7280' }}
          axisLine={{ stroke: '#d1d5db', strokeWidth: 1 }}
        />
        <YAxis 
          width={40} 
          tickFormatter={(v) => `${Math.round(v * 100)}`}
          label={{ value: '%', position: 'insideLeft', angle: -90, style: { textAnchor: 'middle', fill: '#374151', fontSize: 12 } }}
          tick={{ fontSize: 12, fill: '#6b7280' }}
          axisLine={{ stroke: '#d1d5db', strokeWidth: 1 }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            border: '1px solid rgba(209, 213, 219, 0.5)',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)'
          }}
          labelFormatter={(v) => format(new Date(v), 'EEE HH:mm')}
          formatter={(value, name) => [`${Math.round((value as number) * 100)}%`, name]}
        />
        <Legend 
          wrapperStyle={{
            paddingTop: '10px',
            fontSize: '12px'
          }}
        />
        {['wind', 'solar', 'hydro', 'gas', 'coal', 'biomass', 'imports'].map((key) => (
          <Area 
            key={key} 
            type="monotone" 
            dataKey={key} 
            stackId="1" 
            stroke={COLORS[key]} 
            fill={`url(#${GRADIENTS[key].id})`}
            strokeWidth={1}
            strokeOpacity={0.8}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  )
}


