import {
  CartesianGrid,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

// Custom Tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-gray-900 text-white p-3 rounded-lg shadow-lg border border-gray-700">
        <p className="font-semibold text-blue-400">{`ID: ${data.id}`}</p>
        <p className="text-sm text-green-400">{`X: ${data.x.toFixed(6)}, Y: ${data.y.toFixed(6)}`}</p>
      </div>
    );
  }
  return null;
};

// Peptide Results Plot Component
const PeptideResultsPlot = ({ results }) => {
  // Extract and convert
  const { neighbors, query } = results;

  const neighborPoints = neighbors.x.map((x, index) => ({
    x,
    y: neighbors.y[index],
    id: `Neighbor ${index + 1}`
  }));

  const queryPoint = {
    x: query.x,
    y: query.y,
    id: 'Query Peptide'
  };

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
              domain={['dataMin - 0.00001', 'dataMax + 0.00001']}
              tick={{ fontSize: 12 }}
            />
            <YAxis
              type="number"
              dataKey="y"
              domain={['dataMin - 0.00001', 'dataMax + 0.00001']}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter
              name="Query"
              data={[queryPoint]}
              fill="#34D399" // green
              stroke="#059669"
              r={8}
            />
            <Scatter
              name="Neighbors"
              data={neighborPoints}
              fill="#818CF8" // purple
              stroke="#6366F1"
              r={5}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PeptideResultsPlot;
