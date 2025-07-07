import { CartesianGrid, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";

// Custom Tooltip Component for the scatter plot
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-900 text-white p-3 rounded-lg shadow-lg border border-gray-700">
        <p className="font-semibold text-blue-400">{`ID: ${data.id}`}</p>
        <p className="text-sm text-gray-300">{`Metadata: ${data.metadata}`}</p>
        <p className="text-sm text-green-400">{`Distance: ${data.distance.toFixed(4)}`}</p>
        <p className="text-xs text-gray-400">{`X: ${data.x.toFixed(3)}, Y: ${data.y.toFixed(3)}`}</p>
      </div>
    );
  }
  return null;
};
// Peptide Results Plot Component
const PeptideResultsPlot = ({ results }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4">
        <h3 className="text-xl font-bold">Interactive Scatter Plot</h3>
      </div>
      <div className="p-4" style={{ height: '400px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              type="number" 
              dataKey="x" 
              domain={['dataMin - 0.1', 'dataMax + 0.1']}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              domain={['dataMin - 0.1', 'dataMax + 0.1']}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter 
              data={results} 
              fill="#8884d8"
              fillOpacity={0.7}
              stroke="#8884d8"
              strokeWidth={2}
              r={6}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PeptideResultsPlot;