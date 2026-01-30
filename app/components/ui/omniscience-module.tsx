"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cloud, TrendingUp, Globe, Wifi, Sun } from 'lucide-react';

export function OmniscienceModule() {
    const [time, setTime] = useState('');
    const [weather, setWeather] = useState<{ temp: number; condition: string } | null>(null);
    const [prices, setPrices] = useState<{ btc: number; eth: number; sol: number } | null>(null);

    useEffect(() => {
        // 1. Time Loop
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        };
        updateTime();
        const timeInterval = setInterval(updateTime, 1000);

        // 2. Weather Fetch (Open-Meteo) - Paris Coordinates
        const fetchWeather = async () => {
            try {
                const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&current=temperature_2m,weather_code');
                const data = await res.json();
                setWeather({
                    temp: Math.round(data.current.temperature_2m),
                    condition: getConditionText(data.current.weather_code)
                });
            } catch (e) { console.error("Weather signal lost", e); }
        };
        fetchWeather();
        const weatherInterval = setInterval(fetchWeather, 600000); // 10 mins

        // 3. Crypto Fetch (CoinGecko)
        const fetchMarkets = async () => {
            try {
                const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd');
                const data = await res.json();
                setPrices({
                    btc: data.bitcoin.usd,
                    eth: data.ethereum.usd,
                    sol: data.solana.usd
                });
            } catch (e) { console.error("Market signal lost", e); }
        };
        fetchMarkets();
        const marketInterval = setInterval(fetchMarkets, 60000); // 1 min

        return () => {
            clearInterval(timeInterval);
            clearInterval(weatherInterval);
            clearInterval(marketInterval);
        };
    }, []);

    // WMO Weather Code Map
    const getConditionText = (code: number) => {
        if (code === 0) return 'CLEAR';
        if (code < 3) return 'CLOUDY';
        if (code < 50) return 'FOG';
        if (code < 80) return 'RAIN';
        return 'STORM';
    };

    return (
        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 p-6">

            {/* Weather Node - Real Data */}
            <div className="md:col-span-1 h-48 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between group hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase tracking-widest text-white/40">Local Enviro</span>
                    <Wifi size={14} className="text-green-500 animate-pulse" />
                </div>
                <div>
                    <div className="flex items-center gap-4 mb-2">
                        {weather ? (
                            <>
                                {weather.condition === 'CLEAR' ? <Sun size={32} className="text-yellow-400" /> : <Cloud size={32} className="text-white" />}
                                <span className="text-4xl font-display text-white tabular-nums">{weather.temp}°</span>
                            </>
                        ) : (
                            <div className="h-8 w-24 bg-white/10 animate-pulse rounded" />
                        )}
                    </div>
                    <div className="text-xs font-mono text-white/60">
                        PARIS, FR <br />
                        STATUS: {weather ? weather.condition : 'SCANNING...'}
                    </div>
                </div>
            </div>

            {/* Market Node - Real Data */}
            <div className="md:col-span-1 h-48 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between group hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase tracking-widest text-white/40">Markets [LIVE]</span>
                    <TrendingUp size={14} className="text-indigo-400" />
                </div>
                <div className="space-y-4 font-mono text-xs">
                    {prices ? (
                        <>
                            <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                <span className="text-white/80">BTC / USD</span>
                                <span className="text-green-400 tabular-nums">${prices.btc.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/10 pb-2">
                                <span className="text-white/80">ETH / USD</span>
                                <span className="text-green-400 tabular-nums">${prices.eth.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-white/80">SOL / USD</span>
                                <span className="text-cyan-400 tabular-nums">${prices.sol.toLocaleString()}</span>
                            </div>
                        </>
                    ) : (
                        <div className="space-y-4">
                            <div className="h-4 w-full bg-white/10 animate-pulse rounded" />
                            <div className="h-4 w-full bg-white/10 animate-pulse rounded" />
                            <div className="h-4 w-full bg-white/10 animate-pulse rounded" />
                        </div>
                    )}
                </div>
            </div>

            {/* Global Feed */}
            <div className="md:col-span-1 h-48 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col justify-between group hover:bg-white/10 transition-colors">
                <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase tracking-widest text-white/40">Network Status</span>
                    <Globe size={14} className="text-cyan-400" />
                </div>
                <div className="font-mono text-xs space-y-3 opacity-80">
                    <p className="line-clamp-2">
                        <span className="text-green-400 mr-2">[UP]</span>
                        Aether Core Services online.
                    </p>
                    <p className="line-clamp-2">
                        <span className="text-green-400 mr-2">[SYNC]</span>
                        External APIs connected (OpenMeteo, CoinGecko).
                    </p>
                </div>
            </div>

            {/* Main Clock */}
            <div className="md:col-span-3 h-32 backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 flex items-center justify-between overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent opacity-50" />

                <div className="relative z-10">
                    <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-2">System Time</span>
                    <span className="text-5xl md:text-6xl font-display text-white tracking-tighter tabular-nums">
                        {time}
                    </span>
                </div>

                <div className="relative z-10 text-right hidden md:block">
                    <div className="text-xs font-mono text-indigo-300 mb-1">API LATENCY</div>
                    <div className="text-3xl font-display text-white">12ms</div>
                </div>
            </div>

        </div>
    );
}
