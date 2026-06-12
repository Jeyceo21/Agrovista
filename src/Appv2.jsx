import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function App() {
return ( <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6"> <div className="max-w-7xl mx-auto"> <Header /> <MainDashboard />

```
    <footer className="mt-10 text-center text-slate-500 border-t pt-6">
      AgroVista © 2026 • AI-Powered Smart Agriculture Platform
    </footer>
  </div>
</div>
```

);
}


function Header() {
  return (
    <header className="mb-8">
      <div className="bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 rounded-3xl p-10 shadow-2xl text-white">
        <div className="flex flex-col lg:flex-row justify-between gap-8">

          <div className="flex-1">
            <h1 className="text-5xl font-extrabold mb-2">
              🌱 AgroVista
            </h1>

            <p className="text-xl text-green-100">
              AI-Powered Smart Agriculture Platform
            </p>

            <p className="mt-4 max-w-3xl text-green-50 text-lg">
              Monitor crop health, analyze soil conditions,
              predict pest risks, and optimize farming decisions
              using intelligent analytics.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 min-w-[320px]">

            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
              <div className="text-3xl">🌾</div>
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm">Active Fields</div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
              <div className="text-3xl">🌡️</div>
              <div className="text-2xl font-bold">29°C</div>
              <div className="text-sm">Temperature</div>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
              <div className="text-3xl">🐛</div>
              <div className="text-2xl font-bold">15%</div>
              <div className="text-sm">Pest Risk</div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}


function MainDashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4000/api/summary").then(r => setSummary(r.data));
  }, []);

  return (
  <>
    <div className="grid md:grid-cols-4 gap-4 mb-6">

      <div className="bg-white p-5 rounded-2xl shadow-lg">
        <p className="text-slate-500 text-sm">Fields Monitored</p>
        <p className="text-3xl font-bold text-green-600">12</p>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-lg">
        <p className="text-slate-500 text-sm">Crop Health</p>
        <p className="text-3xl font-bold text-green-600">92%</p>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-lg">
        <p className="text-slate-500 text-sm">Pest Alerts</p>
        <p className="text-3xl font-bold text-red-500">3</p>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-lg">
        <p className="text-slate-500 text-sm">Water Savings</p>
        <p className="text-3xl font-bold text-blue-500">28%</p>
      </div>

    </div>

    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 lg:col-span-9 space-y-6">
  <OverviewCard summary={summary} />
  <HealthScore />
  <SensorTrends />
</div>
            <div className="col-span-12 lg:col-span-3">
        <InsightsCard summary={summary} />
      </div>
    </div>
    </>
  );
}

function OverviewCard({ summary }) {
  if (!summary) return <div className="card-modern">Loading...</div>;

  return (
    <section className="card-modern">
      <h2 className="text-2xl font-bold mb-5 text-green-700">Farm Intelligence Dashboard</h2>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Crop Health" value={summary.cropHealth.status} hint={summary.cropHealth.scoreText} />
        <StatCard title="Soil Status" value={summary.soil.health} hint={summary.soil.summary} />
        <StatCard title="Pest Risk" value={summary.pest.risk} hint={summary.pest.probText} />
        <StatCard title="Temperature" value={`${summary.weather.temp}°C`} hint={summary.weather.desc} />
      </div>
    </section>
  );
}

function StatCard({ title, value, hint }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-lg border-l-4 border-green-500">
      <div className="text-slate-500 text-sm">{title}</div>
      <div className="text-3xl font-bold mt-3">{value}</div>
      <div className="mt-3 inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">{hint}</div>
    </div>
  );
}

function HealthScore() {
  return (
    <section className="bg-white p-6 rounded-3xl shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-green-700">
          🌱 Farm Health Score
        </h3>

        <span className="text-3xl font-bold text-green-600">
          92%
        </span>
      </div>

      <div className="w-full bg-slate-200 rounded-full h-4">
        <div
          className="bg-green-500 h-4 rounded-full"
          style={{ width: "92%" }}
        />
      </div>

      <p className="mt-3 text-slate-600">
        Excellent crop conditions detected based on NDVI,
        soil moisture, temperature and pest analysis.
      </p>
    </section>
  );
}



function InsightsCard({ summary }) {
  if (!summary) return <div className="card-modern">Loading...</div>;
  return (
    <section className="card-modern">
      <h3 className="text-2xl font-bold mb-6 text-green-700">🤖 AI Recommendations</h3>
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-xl"><b>💧 Irrigation</b><div>{summary.recommendations.irrigation}</div></div>
        <div className="bg-green-50 p-4 rounded-xl"><b>🌾 Fertilization</b><div>{summary.recommendations.fertilization}</div></div>
        <div className="bg-red-50 p-4 rounded-xl"><b>🐛 Pest Management</b><div>{summary.recommendations.pest}</div></div>
      </div>
    </section>
  );
}

function SensorTrends() {
  const [data, setData] = useState(null);
  useEffect(() => {
    axios.get("http://localhost:4000/api/trends").then(r => setData(r.data));
  }, []);

  if (!data) return <div className="card-modern">Loading chart...</div>;

  const chartData = {
    labels: data.map(r => r.date),
    datasets: [
      { label: "Moisture %", data: data.map(r => +r.moisture), borderColor: "green" },
      { label: "pH", data: data.map(r => +r.ph), borderColor: "blue" },
      { label: "Pest %", data: data.map(r => +r.pest_prob * 100), borderColor: "red" }
    ]
  };

  return (
    <section className="card-modern">
      <h3 className="text-2xl font-bold mb-4 text-green-700">📈 Farm Analytics</h3>
      <Line data={chartData} />
    </section>
  );
}
