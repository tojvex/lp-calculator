"use client";
import { useState } from "react";
import { Card } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";

export default function Home() {
  const [entryPrice, setEntryPrice] = useState(45);
  const [currentPrice, setCurrentPrice] = useState(43.7);
  const [capitalProvided, setCapitalProvided] = useState(15500);
  const [feesCollected, setFeesCollected] = useState(781);
  const [lpValueNow, setLpValueNow] = useState(14250);

  const hodlValue = capitalProvided * ((currentPrice + entryPrice) / (2 * entryPrice));
  const ilPercent = ((lpValueNow / hodlValue) - 1) * 100;
  const netPnL = lpValueNow + feesCollected - hodlValue;
  const netPnLPercent = (netPnL / capitalProvided) * 100;
  const status = netPnL >= 0 ? "✅ PROFIT" : "❌ LOSS";

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">LP Farming Calculator</h1>
        <Card>
          <div className="grid grid-cols-2 gap-4 p-6">
            <div><Label>HYPE Entry Price</Label><Input type="number" value={entryPrice} onChange={e => setEntryPrice(parseFloat(e.target.value))} /></div>
            <div><Label>Current HYPE Price</Label><Input type="number" value={currentPrice} onChange={e => setCurrentPrice(parseFloat(e.target.value))} /></div>
            <div><Label>Capital Provided (USD)</Label><Input type="number" value={capitalProvided} onChange={e => setCapitalProvided(parseFloat(e.target.value))} /></div>
            <div><Label>Fees Collected (USD)</Label><Input type="number" value={feesCollected} onChange={e => setFeesCollected(parseFloat(e.target.value))} /></div>
            <div><Label>Current LP Value (USD)</Label><Input type="number" value={lpValueNow} onChange={e => setLpValueNow(parseFloat(e.target.value))} /></div>
          </div>
        </Card>
        <Card>
          <div className="p-6 space-y-2">
            <p><strong>Value If Held (HODL):</strong> ${hodlValue.toFixed(2)}</p>
            <p><strong>Impermanent Loss:</strong> {ilPercent.toFixed(2)}%</p>
            <p><strong>Net PnL:</strong> ${netPnL.toFixed(2)} ({netPnLPercent.toFixed(2)}%)</p>
            <p><strong>Status:</strong> {status}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
