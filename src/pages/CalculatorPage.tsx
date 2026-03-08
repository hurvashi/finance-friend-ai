import { useState } from "react";
import { TrendingUp, DollarSign, Info, ArrowRight } from "lucide-react";

const currencies = [
  { symbol: "$", code: "USD", label: "USD ($)", locale: "en-US" },
  { symbol: "₹", code: "INR", label: "INR (₹)", locale: "en-IN" },
  { symbol: "€", code: "EUR", label: "EUR (€)", locale: "de-DE" },
  { symbol: "£", code: "GBP", label: "GBP (£)", locale: "en-GB" },
];

export default function CalculatorPage() {
  const [principal, setPrincipal] = useState(1000);
  const [monthly, setMonthly] = useState(100);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(10);
  const [currIdx, setCurrIdx] = useState(0);

  const curr = currencies[currIdx];
  const monthlyRate = rate / 100 / 12;
  const totalMonths = years * 12;

  let futureValue = principal * Math.pow(1 + monthlyRate, totalMonths);
  if (monthlyRate > 0) {
    futureValue += monthly * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
  } else {
    futureValue += monthly * totalMonths;
  }

  const totalContributed = principal + monthly * totalMonths;
  const totalInterest = futureValue - totalContributed;
  const growthMultiple = totalContributed > 0 ? (futureValue / totalContributed).toFixed(1) : "0";

  // Year-by-year breakdown
  const yearlyBreakdown: { year: number; contributed: number; value: number; interest: number }[] = [];
  for (let y = 1; y <= years; y++) {
    const m = y * 12;
    let val = principal * Math.pow(1 + monthlyRate, m);
    if (monthlyRate > 0) {
      val += monthly * ((Math.pow(1 + monthlyRate, m) - 1) / monthlyRate);
    } else {
      val += monthly * m;
    }
    const contrib = principal + monthly * m;
    yearlyBreakdown.push({ year: y, contributed: contrib, value: val, interest: val - contrib });
  }

  const fmt = (n: number) =>
    new Intl.NumberFormat(curr.locale, { style: "currency", currency: curr.code, maximumFractionDigits: 0 }).format(n);

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-slide-up">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Investment Simulator</h1>
        <p className="text-muted-foreground mt-1">See the power of compound interest in action</p>
      </div>

      {/* Currency selector */}
      <div className="flex gap-2">
        {currencies.map((c, i) => (
          <button
            key={c.code}
            onClick={() => setCurrIdx(i)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              i === currIdx ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="bg-card rounded-2xl p-6 border border-border space-y-5">
        <InputSlider label="Initial Investment" value={principal} onChange={setPrincipal} min={0} max={500000} step={500} prefix={curr.symbol} />
        <InputSlider label="Monthly Contribution" value={monthly} onChange={setMonthly} min={0} max={50000} step={50} prefix={curr.symbol} />
        <InputSlider label="Expected Annual Return" value={rate} onChange={setRate} min={0} max={20} step={0.5} suffix="%" />
        <InputSlider label="Investment Period" value={years} onChange={setYears} min={1} max={40} step={1} suffix=" years" />
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ResultCard label="Future Value" value={fmt(futureValue)} sub={`${growthMultiple}× your money`} highlight />
        <ResultCard label="Total Invested" value={fmt(totalContributed)} sub={`${curr.symbol}${monthly.toLocaleString()}/mo × ${years}yr`} />
        <ResultCard label="Interest Earned" value={fmt(totalInterest)} sub="Pure compounding gains" accent />
      </div>

      {/* Visual breakdown bar */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <p className="text-sm font-semibold text-foreground mb-4">Growth Breakdown</p>
        <div className="h-10 rounded-full overflow-hidden flex">
          <div
            className="bg-primary/30 h-full flex items-center justify-center text-[10px] font-bold text-foreground transition-all"
            style={{ width: `${Math.max((totalContributed / futureValue) * 100, 15)}%` }}
          >
            Invested
          </div>
          <div className="bg-primary h-full flex-1 flex items-center justify-center text-[10px] font-bold text-primary-foreground transition-all">
            Interest
          </div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>{fmt(totalContributed)}</span>
          <span>{fmt(totalInterest)}</span>
        </div>
      </div>

      {/* Plain-language explanation */}
      <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6 space-y-3">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-accent" />
          <p className="text-sm font-semibold text-foreground">What This Means (Simple Explanation)</p>
        </div>
        <div className="text-sm leading-relaxed text-foreground/80 space-y-2">
          <p>
            If you invest <strong>{fmt(monthly)} every month</strong> for <strong>{years} years</strong> at a <strong>{rate}% annual return</strong>:
          </p>
          <div className="bg-card rounded-xl p-4 space-y-2 border border-border">
            <div className="flex items-center gap-2">
              <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
              <span><strong>Total you put in:</strong> {fmt(totalContributed)}</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
              <span><strong>Interest earned:</strong> {fmt(totalInterest)} — this is money you didn't work for!</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowRight className="h-3 w-3 text-primary shrink-0" />
              <span className="font-semibold text-primary"><strong>Final value:</strong> {fmt(futureValue)}</span>
            </div>
          </div>
          <p>
            That means your money grew to <strong>{growthMultiple}× what you invested</strong>. The extra {fmt(totalInterest)} came from compounding — your returns earning their own returns, year after year.
          </p>
          {years >= 10 && (
            <p className="text-xs text-muted-foreground italic">
              💡 Notice how most of the growth happens in the later years. That's compounding accelerating — the longer you stay invested, the faster it grows!
            </p>
          )}
        </div>
      </div>

      {/* Year-by-year table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="p-5 border-b border-border">
          <p className="text-sm font-semibold text-foreground">Year-by-Year Breakdown</p>
          <p className="text-xs text-muted-foreground">Watch compounding accelerate over time</p>
        </div>
        <div className="overflow-auto max-h-80">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground border-b border-border">
                <th className="text-left py-2 px-4 font-medium">Year</th>
                <th className="text-right py-2 px-4 font-medium">Invested</th>
                <th className="text-right py-2 px-4 font-medium">Interest</th>
                <th className="text-right py-2 px-4 font-medium">Total Value</th>
              </tr>
            </thead>
            <tbody>
              {yearlyBreakdown.map((row) => (
                <tr key={row.year} className="border-b border-border/50 last:border-0">
                  <td className="py-2.5 px-4 text-foreground font-medium">{row.year}</td>
                  <td className="py-2.5 px-4 text-right text-muted-foreground">{fmt(row.contributed)}</td>
                  <td className="py-2.5 px-4 text-right text-primary font-medium">{fmt(row.interest)}</td>
                  <td className="py-2.5 px-4 text-right text-foreground font-semibold">{fmt(row.value)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Educational tip */}
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5">
        <p className="text-xs font-semibold text-primary mb-1">🎓 The Compounding Lesson</p>
        <p className="text-sm text-foreground">
          In the first year, you earned {fmt(yearlyBreakdown[0]?.interest ?? 0)} in interest. 
          {years >= 5 && <> By year {years}, you earned {fmt((yearlyBreakdown[years - 1]?.interest ?? 0) - (yearlyBreakdown[years - 2]?.interest ?? 0))} in just that single year.</>}
          {" "}That's compounding — your money earns money, which earns more money. Start early, stay consistent, and let time do the work.
        </p>
      </div>
    </div>
  );
}

function InputSlider({
  label, value, onChange, min, max, step, prefix, suffix,
}: {
  label: string; value: number; onChange: (v: number) => void;
  min: number; max: number; step: number; prefix?: string; suffix?: string;
}) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <span className="text-sm font-bold text-primary">
          {prefix}{value.toLocaleString()}{suffix}
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
      />
    </div>
  );
}

function ResultCard({ label, value, sub, highlight, accent }: {
  label: string; value: string; sub: string; highlight?: boolean; accent?: boolean;
}) {
  return (
    <div className={`rounded-2xl p-5 border ${
      highlight ? "bg-primary/5 border-primary/30" : accent ? "bg-accent/5 border-accent/20" : "bg-card border-border"
    }`}>
      <p className={`text-xl font-bold ${highlight ? "text-primary" : accent ? "text-accent" : "text-foreground"}`}>{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
      <p className="text-[10px] text-muted-foreground mt-1">{sub}</p>
    </div>
  );
}
