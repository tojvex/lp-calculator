'use client'
import React, { useState } from "react";

export default function Home() {
  const [entryPrice, setEntryPrice] = useState(45);
  const [currentPrice, setCurrentPrice] = useState(43.7);
  const [capital, setCapital] = useState(15500);
  const [fees, setFees] = useState(781);
  const [lpValue, setLpValue] = useState(14250);

  // Calculations (same as before)
  const valueIfHeld = (capital / entryPrice) * currentPrice;
  const impermanentLossPercent =
    ((lpValue - valueIfHeld) / valueIfHeld) * 100;
  const netProfitLoss = lpValue + fees - capital;
  const status = netProfitLoss >= 0 ? "✅ PROFIT" : "❌ LOSS";

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl max-w-md w-full p-8 space-y-6">
        <h1 className="text-3xl font-bold text-indigo-700 text-center">
          LP Farming Calculator
        </h1>

        <div className="space-y-4">
          {[
            { label: "Entry Price (HYPE)", value: entryPrice, setter: setEntryPrice },
            { label: "Current Price (HYPE)", value: currentPrice, setter: setCurrentPrice },
            { label: "Capital Provided (USD)", value: capital, setter: setCapital },
            { label: "Fees Collected (USD)", value: fees, setter: setFees },
            { label: "Current LP Value (USD)", value: lpValue, setter: setLpValue },
          ].map(({ label, value, setter }) => (
            <div key={label}>
              <label className="block text-gray-700 font-semibold mb-1">{label}</label>
              <input
                type="number"
                value={value}
                onChange={(e) => setter(parseFloat(e.target.value) || 0)}
                className="w-full border border-indigo-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              />
            </div>
          ))}
        </div>

        <div className="bg-indigo-50 rounded-lg p-4 text-center space-y-2 shadow-inner">
          <p className="text-lg font-semibold text-indigo-700">
            Value If Held: <span className="font-mono">${valueIfHeld.toFixed(2)}</span>
          </p>
          <p className="text-lg font-semibold text-indigo-700">
            Impermanent Loss:{" "}
            <span
              className={`font-mono ${
                impermanentLossPercent < 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {impermanentLossPercent.toFixed(2)}%
            </span>
          </p>
          <p className="text-lg font-semibold text-indigo-700">
            Net Profit/Loss:{" "}
            <span className={`font-mono ${netProfitLoss >= 0 ? "text-green-700" : "text-red-700"}`}>
              ${netProfitLoss.toFixed(2)}
            </span>
          </p>
          <p className={`text-xl font-bold ${netProfitLoss >= 0 ? "text-green-800" : "text-red-800"}`}>
            {status}
          </p>
        </div>
      </div>
    </main>
  );
}

