# Ireland Carbon Visualization

A web app that shows Ireland's electricity carbon emissions and energy mix in real-time. Built for a college project to visualize how Ireland generates electricity and its environmental impact.

## What This App Does

- Shows real-time electricity data from Ireland's grid operator (EirGrid)
- Displays carbon intensity (how much CO₂ is produced per kWh of electricity)
- Visualizes the energy mix (wind, solar, gas, coal, etc.)
- Compares different data sources (mock data, Irish data, European data)
- Updates automatically as you change time ranges (24h, 48h, 7 days)

## Real Data Sources

### EirGrid (Ireland's Grid Operator)
- **Website**: https://www.eirgridgroup.com/transparency/
- **What it shows**: Live Irish electricity generation and carbon intensity
- **Data includes**: Wind, solar, hydro, gas, coal, biomass, imports
- **Update frequency**: Every 15 minutes
- **No API key needed** - it's public data

### ENTSO-E (European Grid Data)
- **Website**: https://transparency.entsoe.eu/
- **What it shows**: European electricity data across countries
- **Data includes**: Cross-border flows, European generation mix
- **Note**: Requires API key to access (not set up in this demo)

### Mock Data (For Testing)
- Simulates realistic Irish electricity patterns
- Works offline for development
- Shows what the app would look like with real data

## How to Run This Project

### Prerequisites
- Node.js 20.19+ (I used nvm to install it)
- npm (comes with Node.js)

### Setup Steps

1. **Clone the project**
   ```bash
   git clone <your-repo-url>
   cd ireland-carbon-viz
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Go to http://localhost:5173

### Using the Dev Script
There's a convenience script that handles Node.js version switching:
```bash
./dev.sh
```

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build tool**: Vite (fast development server)
- **Charts**: Recharts (for the visualizations)
- **Styling**: Custom CSS with gradients and animations
- **Date handling**: date-fns library
- **Data fetching**: Built-in fetch API

## Project Structure

```
src/
├── components/          # React components
│   ├── CarbonIntensityChart.tsx    # Shows CO₂ emissions over time
│   └── GenerationMixChart.tsx      # Shows energy mix breakdown
├── data/               # Data handling
│   ├── mock.ts         # Generates fake data for testing
│   ├── realData.ts     # Fetches real data from APIs
│   └── eirgrid.ts      # EirGrid API integration
├── types.ts            # TypeScript type definitions
├── App.tsx             # Main app component
├── App.css             # Styling
└── main.tsx            # App entry point
```

## How the Charts Work

### Carbon Intensity Chart
- Shows grams of CO₂ per kWh over time
- Uses area chart with gradient fill
- Lower values = cleaner electricity
- Higher values = more polluting electricity

### Generation Mix Chart
- Shows percentage breakdown of energy sources
- Stacked area chart (all sources add up to 100%)
- Color-coded by energy type:
  - 🟦 Wind (blue) - renewable
  - 🟨 Solar (yellow) - renewable  
  - 🟩 Hydro (green) - renewable
  - 🔴 Gas (red) - fossil fuel
  - ⚫ Coal (gray) - fossil fuel
  - 🟢 Biomass (lime) - renewable
  - 🟣 Imports (purple) - from other countries

## Configuration

The app uses environment variables for API keys and settings. Create a `.env` file:

```env
VITE_ENTSOE_API_KEY=your_api_key_here
VITE_EIRGRID_ENABLED=true
VITE_ENTSOE_ENABLED=false
```

## Troubleshooting

### Common Issues

1. **Blank white page**
   - Check Node.js version (needs 20.19+)
   - Clear browser cache
   - Check browser console for errors

2. **Charts not showing**
   - Look at the debug info on the page
   - Check browser console for errors
   - Make sure Recharts is installed

3. **Data not updating**
   - Check if you're switching between providers
   - Look at the debug info to see data counts
   - Check browser console for API errors

### Debug Info
The app shows debug information including:
- Current data source
- Number of data points
- Sample values
- Error messages

## Environmental Impact

This app helps visualize:
- **Carbon Intensity**: How much CO₂ Ireland's electricity produces
- **Renewable Energy**: Percentage of clean energy sources
- **Grid Stability**: How different energy sources balance the grid
- **Energy Transition**: Progress toward renewable energy goals

## Useful Links

### Data Sources
- [EirGrid Transparency Platform](https://www.eirgridgroup.com/transparency/) - Live Irish electricity data
- [ENTSO-E Transparency Platform](https://transparency.entsoe.eu/) - European electricity data
- [Irish Wind Energy Association](https://www.iwea.com/) - Wind energy info
- [SEAI Energy Statistics](https://www.seai.ie/data-and-insights/seai-statistics/) - Irish energy stats

### Documentation
- [Recharts Documentation](https://recharts.org/) - Chart library docs
- [React Documentation](https://react.dev/) - React framework docs
- [TypeScript Documentation](https://www.typescriptlang.org/) - TypeScript language docs
- [Vite Documentation](https://vitejs.dev/) - Build tool docs

### Similar Projects
- [Electricity Map](https://electricitymap.org/) - Global electricity carbon intensity
- [Gridwatch](https://gridwatch.co.uk/) - UK electricity monitoring
- [Carbon Intensity API](https://carbonintensity.org.uk/) - UK carbon intensity data

## Getting Help

If something's not working:
1. Check the troubleshooting section above
2. Look at browser console for error messages
3. Check the debug info on the page
4. Open an issue on GitHub

## About This Project

This was built as a college project to learn about:
- React and TypeScript
- Data visualization with charts
- Real-time data integration
- Environmental data analysis
- Modern web development

The goal was to create something useful that shows real environmental data in an easy-to-understand way.

---

*Built for a sustainable energy future* 🌱
