'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';

/* ------------------------------------------------------------------ *
 * Uber vs 렌터카 시뮬레이터 — LA 출산 여정 (2026.6.6 → 8.30)
 * 베이스: 라 카냐다 (La Cañada Flintridge)
 * 모든 숫자는 직접 수정 가능, 입력값은 localStorage에 자동 저장.
 * ------------------------------------------------------------------ */

type Trip = { name: string; n: number; mi: number; rt: boolean };

const DEFAULT_TRIPS: Trip[] = [
  { name: '공항 픽업 (LAX→집) 6/6', n: 1, mi: 32, rt: false },
  { name: '유넬라 정기 산전검진 (주 1회)', n: 7, mi: 13, rt: true },
  { name: '차병원 분만 (입원/퇴원) 7/23', n: 2, mi: 13, rt: true },
  { name: '장보기 (격주)', n: 6, mi: 6, rt: true },
  { name: 'LA Meta Labs', n: 1, mi: 14, rt: true },
  { name: '여권국 (윤여름 여권)', n: 1, mi: 22, rt: true },
  { name: 'Birth Certificate 발급', n: 1, mi: 18, rt: true },
  { name: 'Janet Kim 소아과 (산후 1회)', n: 1, mi: 13, rt: true },
  { name: '캐주얼 LA 외출', n: 4, mi: 15, rt: true },
  { name: '공항 샌딩 (집→LAX) 8/30', n: 1, mi: 32, rt: false },
];

type Fields = {
  // Uber
  uBase: number; uMile: number; uMin: number; uBook: number; uMinFare: number;
  uSpeed: number; uTip: number; uSurge: number; uAirport: number;
  // Rental
  rMode: 'daily' | 'monthly' | 'flat'; rDays: number; rDaily: number;
  rMonthly: number; rFlat: number; rIns: number; rFees: number; rPark: number;
  rGas: number; rMpg: number; rToll: number;
};

const DEFAULT_FIELDS: Fields = {
  uBase: 3, uMile: 1.6, uMin: 0.35, uBook: 3.5, uMinFare: 9,
  uSpeed: 24, uTip: 12, uSurge: 1.15, uAirport: 6,
  rMode: 'daily', rDays: 85, rDaily: 52, rMonthly: 1250, rFlat: 4200,
  rIns: 18, rFees: 120, rPark: 90, rGas: 4.9, rMpg: 28, rToll: 0,
};

const STORE = 'uber_rental_sim_v1';
const money = (v: number) => '$' + Math.round(v).toLocaleString();

const UBER = '#19c37d';
const RENTAL = '#ff8c42';

export default function CalculatorPage() {
  const [trips, setTrips] = useState<Trip[]>(DEFAULT_TRIPS);
  const [f, setF] = useState<Fields>(DEFAULT_FIELDS);
  const [loaded, setLoaded] = useState(false);

  // load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORE);
      if (raw) {
        const saved = JSON.parse(raw);
        if (Array.isArray(saved.trips)) setTrips(saved.trips);
        if (saved.fields) setF({ ...DEFAULT_FIELDS, ...saved.fields });
      }
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  // persist
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORE, JSON.stringify({ trips, fields: f }));
  }, [trips, f, loaded]);

  const setField = useCallback(
    (k: keyof Fields, v: number | string) =>
      setF((prev) => ({ ...prev, [k]: v as never })),
    []
  );

  const updateTrip = (i: number, patch: Partial<Trip>) =>
    setTrips((prev) => prev.map((t, idx) => (idx === i ? { ...t, ...patch } : t)));
  const removeTrip = (i: number) =>
    setTrips((prev) => prev.filter((_, idx) => idx !== i));
  const addTrip = () =>
    setTrips((prev) => [...prev, { name: '새 목적지', n: 1, mi: 10, rt: true }]);
  const resetTrips = () => setTrips(DEFAULT_TRIPS.map((t) => ({ ...t })));

  // --- core math ---
  const uberOneWay = useCallback(
    (mi: number) => {
      const speed = Math.max(1, f.uSpeed);
      const mins = (mi / speed) * 60;
      let fare = (f.uBase + f.uMile * mi + f.uMin * mins) * f.uSurge;
      fare = Math.max(fare, f.uMinFare);
      fare += f.uBook;
      fare *= 1 + f.uTip / 100;
      return fare;
    },
    [f]
  );

  const calc = useMemo(() => {
    let uberTotal = 0;
    let totalMiles = 0;
    let totalTrips = 0;
    const uRows = trips.map((t) => {
      const legs = t.rt ? 2 : 1;
      const isAir = /공항|airport|LAX/i.test(t.name);
      const perTrip = uberOneWay(t.mi) * legs + (isAir ? f.uAirport : 0);
      const sub = perTrip * t.n;
      uberTotal += sub;
      totalMiles += t.mi * legs * t.n;
      totalTrips += t.n;
      return { name: t.name, n: t.n, rtmi: t.mi * legs, per: perTrip, sub };
    });

    const days = f.rDays;
    let vehicle = 0;
    if (f.rMode === 'daily') vehicle = f.rDaily * days;
    else if (f.rMode === 'monthly') vehicle = f.rMonthly * (days / 30);
    else vehicle = f.rFlat;
    const ins = f.rIns * days;
    const gas = (totalMiles / Math.max(1, f.rMpg)) * f.rGas;
    const rentalTotal = vehicle + ins + f.rFees + f.rPark + f.rToll + gas;

    const diff = Math.abs(uberTotal - rentalTotal);
    const cheaper = uberTotal < rentalTotal ? 'Uber' : '렌터카';
    const pct = Math.round(diff / Math.max(uberTotal, rentalTotal, 1) * 100);

    // break-even daily rate (solve rental daily so totals equal)
    const fixedNonVehicle = ins + f.rFees + f.rPark + f.rToll + gas;
    const beDaily = (uberTotal - fixedNonVehicle) / Math.max(1, days);

    const rRows: [string, number][] = [
      [
        f.rMode === 'daily'
          ? `차량요금 ($${f.rDaily}/일 × ${days}일)`
          : f.rMode === 'monthly'
          ? `차량요금 ($${f.rMonthly}/월 × ${(days / 30).toFixed(2)}개월)`
          : '차량요금 (총액)',
        vehicle,
      ],
      [`보험 LDW ($${f.rIns}/일 × ${days}일)`, ins],
      ['1회성 비용 (영업소피·추가운전자 등)', f.rFees],
      ['주차 총액', f.rPark],
      [`주유 (${Math.round(totalMiles)}mi ÷ ${f.rMpg}mpg × $${f.rGas})`, gas],
      ['통행료', f.rToll],
    ];

    return {
      uberTotal, rentalTotal, totalMiles, totalTrips, diff, cheaper, pct,
      beDaily, uRows, rRows,
    };
  }, [trips, f, uberOneWay]);

  const max = Math.max(calc.uberTotal, calc.rentalTotal, 1);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <Link href="/community" className="text-white/60 hover:text-white transition-colors">
            ← Back
          </Link>
          <h1 className="text-xl font-bold">🚗 Uber vs 렌터카 시뮬레이터</h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-5">
        <p className="text-white/50 text-sm">
          LA 출산 여정 (2026.6.6 도착 → 8.30 귀국) · 베이스: 라 카냐다 · 모든 숫자 수정 가능 · 자동 저장
        </p>

        {/* Trip schedule */}
        <section className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5">
          <h2 className="font-bold mb-1 flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-indigo-400" />
            이동 일정
          </h2>
          <p className="text-white/40 text-xs mb-3">
            편도 거리는 베이스 기준 추정치 — 실제 값으로 바꾸세요.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-white/40 text-xs uppercase">
                  <th className="text-left font-medium py-2">목적지</th>
                  <th className="text-right font-medium py-2 w-16">횟수</th>
                  <th className="text-right font-medium py-2 w-20">편도(mi)</th>
                  <th className="text-center font-medium py-2 w-14">왕복</th>
                  <th className="w-8" />
                </tr>
              </thead>
              <tbody>
                {trips.map((t, i) => (
                  <tr key={i} className="border-t border-white/5">
                    <td className="py-1.5 pr-2">
                      <input
                        type="text"
                        value={t.name}
                        onChange={(e) => updateTrip(i, { name: e.target.value })}
                        className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-2 py-1.5 focus:border-indigo-400 outline-none"
                      />
                    </td>
                    <td className="py-1.5 px-1">
                      <input
                        type="number" min={0} step={1} value={t.n}
                        onChange={(e) => updateTrip(i, { n: +e.target.value })}
                        className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-2 py-1.5 text-right focus:border-indigo-400 outline-none"
                      />
                    </td>
                    <td className="py-1.5 px-1">
                      <input
                        type="number" min={0} step={1} value={t.mi}
                        onChange={(e) => updateTrip(i, { mi: +e.target.value })}
                        className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-2 py-1.5 text-right focus:border-indigo-400 outline-none"
                      />
                    </td>
                    <td className="py-1.5 text-center">
                      <input
                        type="checkbox" checked={t.rt}
                        onChange={(e) => updateTrip(i, { rt: e.target.checked })}
                        className="w-4 h-4 accent-indigo-400"
                      />
                    </td>
                    <td className="py-1.5 text-center">
                      <button
                        onClick={() => removeTrip(i)}
                        className="text-red-400/70 hover:text-red-400 text-lg leading-none"
                        title="삭제"
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={addTrip}
              className="text-xs font-medium border border-white/15 text-white/70 rounded-lg px-3 py-2 hover:border-white/40"
            >
              + 행 추가
            </button>
            <button
              onClick={resetTrips}
              className="text-xs font-medium border border-white/15 text-white/70 rounded-lg px-3 py-2 hover:border-white/40"
            >
              기본 일정으로 초기화
            </button>
          </div>
        </section>

        {/* Assumptions */}
        <div className="grid md:grid-cols-2 gap-5">
          {/* Uber */}
          <section className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5">
            <h2 className="font-bold mb-3 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full" style={{ background: UBER }} />
              Uber 가정
            </h2>
            <div className="grid grid-cols-3 gap-2.5">
              <NumField label="기본요금 $" v={f.uBase} step={0.5} onChange={(v) => setField('uBase', v)} />
              <NumField label="마일당 $" v={f.uMile} step={0.05} onChange={(v) => setField('uMile', v)} />
              <NumField label="분당 $" v={f.uMin} step={0.05} onChange={(v) => setField('uMin', v)} />
              <NumField label="예약·서비스피 $" v={f.uBook} step={0.5} onChange={(v) => setField('uBook', v)} />
              <NumField label="최소요금 $" v={f.uMinFare} step={0.5} onChange={(v) => setField('uMinFare', v)} />
              <NumField label="평균 속도 mph" v={f.uSpeed} step={1} onChange={(v) => setField('uSpeed', v)} />
              <NumField label="팁 %" v={f.uTip} step={1} onChange={(v) => setField('uTip', v)} />
              <NumField label="서지(혼잡) ×" v={f.uSurge} step={0.1} onChange={(v) => setField('uSurge', v)} />
              <NumField label="공항 픽업피 $" v={f.uAirport} step={1} onChange={(v) => setField('uAirport', v)} />
            </div>
            <p className="text-white/40 text-xs mt-3">
              요금 = (기본 + 마일×거리 + 분×시간)×서지, 최소요금 보장, +예약피 +팁. 왕복 ×2.
            </p>
          </section>

          {/* Rental */}
          <section className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5">
            <h2 className="font-bold mb-3 flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full" style={{ background: RENTAL }} />
              렌터카 가정
            </h2>
            <div className="grid grid-cols-3 gap-2.5">
              <div className="col-span-2">
                <label className="block text-xs text-white/50 mb-1">요금 방식</label>
                <select
                  value={f.rMode}
                  onChange={(e) => setField('rMode', e.target.value)}
                  className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-2 py-2 outline-none focus:border-orange-400"
                >
                  <option value="daily">일 단위 (1일 요율)</option>
                  <option value="monthly">월 단위 (월 요율)</option>
                  <option value="flat">총액 직접 입력</option>
                </select>
              </div>
              <NumField label="렌트 일수" v={f.rDays} step={1} onChange={(v) => setField('rDays', v)} />
              <NumField label="1일 요율 $" v={f.rDaily} step={1} onChange={(v) => setField('rDaily', v)} />
              <NumField label="월 요율 $" v={f.rMonthly} step={10} onChange={(v) => setField('rMonthly', v)} />
              <NumField label="총액 $" v={f.rFlat} step={10} onChange={(v) => setField('rFlat', v)} />
              <NumField label="보험/일 $ (LDW)" v={f.rIns} step={1} onChange={(v) => setField('rIns', v)} />
              <NumField label="1회성 비용 $" v={f.rFees} step={5} onChange={(v) => setField('rFees', v)} />
              <NumField label="주차 총액 $" v={f.rPark} step={5} onChange={(v) => setField('rPark', v)} />
              <NumField label="휘발유 $/gal" v={f.rGas} step={0.1} onChange={(v) => setField('rGas', v)} />
              <NumField label="연비 MPG" v={f.rMpg} step={1} onChange={(v) => setField('rMpg', v)} />
              <NumField label="통행료 총액 $" v={f.rToll} step={1} onChange={(v) => setField('rToll', v)} />
            </div>
            <p className="text-white/40 text-xs mt-3">
              총 렌트비 = 차량요금 + 보험 + 1회성비용 + 주유 + 주차 + 통행료. 공항 픽업/샌딩 포함.
            </p>
          </section>
        </div>

        {/* Results */}
        <section className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5">
          <h2 className="font-bold mb-4">결과</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-[#0f0f0f] border border-white/10 rounded-xl p-4">
              <div className="text-white/50 text-sm flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded" style={{ background: UBER }} />
                Uber 총비용
              </div>
              <div className="text-3xl font-extrabold mt-1">{money(calc.uberTotal)}</div>
            </div>
            <div className="bg-[#0f0f0f] border border-white/10 rounded-xl p-4">
              <div className="text-white/50 text-sm flex items-center gap-2">
                <span className="inline-block w-3 h-3 rounded" style={{ background: RENTAL }} />
                렌터카 총비용
              </div>
              <div className="text-3xl font-extrabold mt-1">{money(calc.rentalTotal)}</div>
            </div>
          </div>

          {/* Bars */}
          <div className="mt-4 space-y-2">
            <Bar label="Uber" amt={money(calc.uberTotal)} pct={(calc.uberTotal / max) * 100} color={UBER} />
            <Bar label="렌터카" amt={money(calc.rentalTotal)} pct={(calc.rentalTotal / max) * 100} color={RENTAL} />
          </div>

          {/* Verdict */}
          <div className="mt-4 rounded-xl border border-white/10 bg-gradient-to-br from-indigo-950/40 to-[#141414] p-4 text-[15px]">
            이 시나리오에서는{' '}
            <b style={{ color: calc.cheaper === 'Uber' ? UBER : RENTAL }}>{calc.cheaper}</b>가 약{' '}
            <b>{money(calc.diff)}</b> ({calc.pct}%) 더 저렴합니다.
            {calc.diff < calc.uberTotal * 0.1 && ' 차이가 작으니 편의성으로 결정하세요.'}
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-white/50 mt-3">
            <span>총 이동 횟수: <b className="text-white">{calc.totalTrips}</b></span>
            <span>총 주행거리: <b className="text-white">{Math.round(calc.totalMiles).toLocaleString()}</b> mi</span>
            <span>손익분기 일 요율: <b className="text-white">{calc.beDaily > 0 ? '$' + calc.beDaily.toFixed(0) + '/일' : '—'}</b></span>
          </div>

          {/* Breakdown */}
          <details className="mt-4 border border-white/10 rounded-xl bg-[#0f0f0f]">
            <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-white/70">
              📋 항목별 상세 보기
            </summary>
            <div className="px-4 pb-4">
              <h3 className="text-xs font-semibold mt-3 mb-1" style={{ color: UBER }}>Uber — 목적지별</h3>
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-white/40">
                    <th className="text-left py-1.5">목적지</th>
                    <th className="text-right py-1.5">횟수</th>
                    <th className="text-right py-1.5">왕복(mi)</th>
                    <th className="text-right py-1.5">1회 요금</th>
                    <th className="text-right py-1.5">소계</th>
                  </tr>
                </thead>
                <tbody>
                  {calc.uRows.map((r, i) => (
                    <tr key={i} className="border-t border-white/5">
                      <td className="text-left py-1.5">{r.name}</td>
                      <td className="text-right py-1.5">{r.n}</td>
                      <td className="text-right py-1.5">{Math.round(r.rtmi)}</td>
                      <td className="text-right py-1.5">{money(r.per)}</td>
                      <td className="text-right py-1.5">{money(r.sub)}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-white/20 font-bold">
                    <td className="text-left py-1.5">합계</td>
                    <td className="text-right py-1.5">{calc.totalTrips}</td>
                    <td className="text-right py-1.5">{Math.round(calc.totalMiles)}</td>
                    <td />
                    <td className="text-right py-1.5">{money(calc.uberTotal)}</td>
                  </tr>
                </tbody>
              </table>

              <h3 className="text-xs font-semibold mt-5 mb-1" style={{ color: RENTAL }}>렌터카 — 비용 구성</h3>
              <table className="w-full text-xs">
                <tbody>
                  {calc.rRows.map((r, i) => (
                    <tr key={i} className="border-t border-white/5">
                      <td className="text-left py-1.5">{r[0]}</td>
                      <td className="text-right py-1.5">{money(r[1])}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-white/20 font-bold">
                    <td className="text-left py-1.5">합계</td>
                    <td className="text-right py-1.5">{money(calc.rentalTotal)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </details>

          {/* Qualitative factors */}
          <ul className="text-xs text-white/50 mt-4 space-y-1.5 list-disc pl-5">
            <li>💡 <b>숫자 외 고려사항:</b> 임산부·산후 회복기엔 직접 운전 부담이 큼 → Uber는 운전 스트레스 0.</li>
            <li>🍼 신생아 카시트: Uber는 매번 챙겨야 함(또는 Uber Car Seat). 렌터카는 장착 후 유지.</li>
            <li>🕒 분만 시 새벽 호출 — Uber는 대기·서지 가능, 렌터카는 즉시 출발 가능.</li>
            <li>🛒 장보기·짐 많을 때 렌터카가 편리. 주차·주유·반납·사고책임은 렌터카 부담.</li>
          </ul>
          <p className="text-white/30 text-xs mt-3">
            실제 견적(렌트 총액, Uber 요금 캡처)을 넣을수록 정확해집니다.
          </p>
        </section>
      </main>
    </div>
  );
}

/* ---------- small components ---------- */
function NumField({
  label, v, step, onChange,
}: {
  label: string; v: number; step: number; onChange: (v: number) => void;
}) {
  return (
    <div>
      <label className="block text-xs text-white/50 mb-1">{label}</label>
      <input
        type="number"
        value={v}
        step={step}
        onChange={(e) => onChange(+e.target.value)}
        className="w-full bg-[#0f0f0f] border border-white/10 rounded-lg px-2 py-2 outline-none focus:border-white/40"
      />
    </div>
  );
}

function Bar({
  label, amt, pct, color,
}: {
  label: string; amt: string; pct: number; color: string;
}) {
  return (
    <div className="relative h-9 rounded-lg bg-[#0f0f0f] border border-white/10 overflow-hidden">
      <div
        className="h-full rounded-l-lg transition-all duration-300"
        style={{ width: `${pct}%`, background: color }}
      />
      <span className="absolute left-3 top-0 h-full flex items-center text-sm font-bold">{label}</span>
      <span className="absolute right-3 top-0 h-full flex items-center text-sm font-bold">{amt}</span>
    </div>
  );
}
