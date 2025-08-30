# Ireland Carbon Visualization

A web app built for my college project that shows Ireland's electricity carbon emissions in real-time. It visualizes how Ireland generates electricity and its environmental impact.

## What This App Does

- Shows real-time electricity data from Ireland's grid operator (EirGrid)
- Displays carbon intensity (how much CO₂ is produced per kWh of electricity)
- Shows CO₂ emissions breakdown by energy source (wind, gas, coal, etc.)
- Compares different data sources (mock data, Irish data, European data)
- Updates automatically as you change time ranges (24h, 48h, 7 days)

## Real Data Sources I Used

### EirGrid (Ireland's Grid Operator)
- **Live Data**: https://www.eirgridgroup.com/transparency/
- **What it shows**: Live Irish electricity generation and carbon intensity
- **Data includes**: Wind, solar, hydro, gas, coal, biomass, imports
- **Update frequency**: Every 15 minutes
- **No API key needed** - it's public data

### ENTSO-E (European Grid Data)
- **Live Data**: https://transparency.entsoe.eu/
- **What it shows**: European electricity data across countries
- **Data includes**: Cross-border flows, European generation mix
- **Note**: Requires API key to access (not set up in this demo)

### Mock Data (For Testing)
- Simulates realistic Irish electricity patterns
- Works offline for development
- Shows what the app would look like with real data

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build tool**: Vite (fast development server)
- **Charts**: Recharts (for the visualizations)
- **Styling**: Custom CSS with gradients and animations
- **Date handling**: date-fns library
- **Data fetching**: Built-in fetch API

## Environmental Impact

This app helps visualize:
- **Carbon Intensity**: How much CO₂ Ireland's electricity produces
- **Renewable Energy**: Percentage of clean energy sources
- **Grid Stability**: How different energy sources balance the grid
- **Energy Transition**: Progress toward renewable energy goals

## Useful Links

### Live Data Sources (These are the actual sources I used)
- [EirGrid Transparency Platform](https://www.eirgridgroup.com/transparency/) - Live Irish electricity data
- [ENTSO-E Transparency Platform](https://transparency.entsoe.eu/) - European electricity data
- [Irish Wind Energy Association](https://www.iwea.com/) - Wind energy info
- [SEAI Energy Statistics](https://www.seai.ie/data-and-insights/seai-statistics/) - Irish energy stats

### Documentation I Used
- [Recharts Documentation](https://recharts.org/) - Chart library docs
- [React Documentation](https://react.dev/) - React framework docs
- [TypeScript Documentation](https://www.typescriptlang.org/) - TypeScript language docs
- [Vite Documentation](https://vitejs.dev/) - Build tool docs

### Similar Projects I Found
- [Electricity Map](https://electricitymap.org/) - Global electricity carbon intensity
- [Gridwatch](https://gridwatch.co.uk/) - UK electricity monitoring
- [Carbon Intensity API](https://carbonintensity.org.uk/) - UK carbon intensity data

## About This Project

This was built as a college project to learn about:
- Data visualization with charts
- Real-time data integration
- Environmental data analysis

