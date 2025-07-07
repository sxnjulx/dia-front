import { Search } from 'lucide-react';
import React, { useState } from 'react';

function SearchEngine() {
  const [k, setK] = useState(16);
  const [useGPU, setUseGPU] = useState(true);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const vector = [
    49.64, -246.25, 175.03, -43.14, 98.58, 341.88, -348.45, -2.01,
    -32.66, -276.75, -9.95, 95.70, 48.24, -187.02, 59.30, 174.22,
    127.61, 132.05, 0.61, -13.93, -256.23, 222.30, -41.74, -366.34,
    167.35, -39.19, -46.08, -61.22, -423.06, 150.93, -71.91, -29.03
  ];

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/search", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ vector, k, use_gpu: useGPU })
      });

      const data = await response.json();
      if (data.status === "success") {
        setResults(data.results);
      } else {
        alert("Search failed.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Backend not reachable or returned an error.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">Spectral Vector Search</h1>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <label className="font-medium">K:</label>
          <input
            type="number"
            value={k}
            onChange={(e) => setK(Number(e.target.value))}
            className="w-20 px-2 py-1 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={useGPU}
            onChange={() => setUseGPU(!useGPU)}
            className="form-checkbox"
          />
          Use GPU
        </label>

        <button
          onClick={handleSearch}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          <Search size={18} />
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {results.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Results</h2>
          {results.map((res) => (
            <div key={res.id} className="border border-gray-300 p-4 rounded shadow-sm bg-white">
              <p><span className="font-semibold">ID:</span> {res.id}</p>
              <p><span className="font-semibold">Metadata:</span> {res.metadata}</p>
              <p><span className="font-semibold">Distance:</span> {res.distance}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchEngine;
