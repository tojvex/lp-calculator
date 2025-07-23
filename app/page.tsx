"use client";

import React, { useState } from "react";

export default function Home() {
  const [entryPrice, setEntryPrice] = useState(45);
  const [currentPrice, setCurrentPrice] = useState(43.7);
  const [capital, setCapital] = useState(15500);
  const [fees, setFees] = useState(781);
  const [lpValue, setLpValue] = useState(14250);

  const valueIfHeld = (capital / entryPrice) * currentPrice;
  const impermanentLossPercent = ((lpValue - valueIfHeld) / valueIfHeld) * 100;
  const netProfitLoss = lpValue + fees - capital;
  const status = netProfitLoss >= 0 ? "Profit" : "Loss";

  return (
    <main className="min-h-screen bg-gradient-to-tr from-gray-50 via-purple-100 to-pink-100 flex items-center justify-center px-4 py-10">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-10 flex flex-col gap-8">
        <h1 className="text-4xl font-extrabold text-purple-700 text-center tracking-wide">
          LP Farming Calculator
        </h1>

        <form className="flex flex-col gap-6">
          {[
            { label: "Entry Price (HYPE)", value: entryPrice, setter: setEntryPrice },
            { label: "Current Price (HYPE)", value: currentPrice, setter: setCurrentPrice },
            { label: "Capital Provided (USD)", value: capital, setter: setCapital },
            { label: "Fees Collected (USD)", value: fees, setter: setFees },
            { label: "Current LP Value (USD)", value: lpValue, setter: setLpValue },
          ].map(({ label, value, setter }) => (
            <div key={label} className="flex flex-col">
              <label className="text-lg font-semibold text-gray-700 mb-1 select-none">{label}</label>
              <input
                type="number"
                value={value}
                onChange={(e) => setter(parseFloat(e.target.value) || 0)}
                className="rounded-lg border-2 border-purple-300 px-4 py-3 text-lg font-medium placeholder-purple-300
                           focus:outline-none focus:ring-4 focus:ring-purple-400 transition"
                placeholder="Enter value"
              />
            </div>
          ))}
        </form>

        <section className="bg-purple-50 rounded-xl p-6 shadow-inner flex flex-col gap-4 text-center">
          <p className="text-xl font-semibold text-purple-800">
            Value If Held:{" "}
            <span className="font-mono text-2xl">${valueIfHeld.toFixed(2)}</span>
          </p>

          <p className="text-xl font-semibold text-purple-800">
            Impermanent Loss:{" "}
            <span
              className={`font-mono text-2xl ${
                impermanentLossPercent < 0 ? "text-red-600" : "text-green-600"
              }`}
            >
              {impermanentLossPercent.toFixed(2)}%
            </span>
          </p>

          <p className="text-xl font-semibold text-purple-800">
            Net Profit/Loss:{" "}
            <span
              className={`font-mono text-2xl ${
                netProfitLoss >= 0 ? "text-green-700" : "text-red-700"
              }`}
            >
              ${netProfitLoss.toFixed(2)}
            </span>
          </p>

          <div
            className={`inline-block mt-3 rounded-full px-8 py-2 font-bold text-white text-2xl tracking-wide select-none
              ${
                netProfitLoss >= 0
                  ? "bg-gradient-to-r from-green-400 via-green-500 to-green-600 shadow-lg"
                  : "bg-gradient-to-r from-red-400 via-red-500 to-red-600 shadow-lg"
              }`}
          >
            {status} {netProfitLoss >= 0 ? "✔️" : "❌"}
          </div>
        </section>
      </div>
    </main>
  );
}
