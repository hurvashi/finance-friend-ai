import { useState } from "react";
import { TrendingUp, DollarSign } from "lucide-react";

export default function CalculatorPage() {
  const [principal, setPrincipal] = useState(1000);
  const [monthly, setMonthly] = useState(100);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(10);

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

  return (
    <div className="max-w-xl mx-auto space-y-8 animate-slide-up">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Investment Calculator</h1>
        <p className="text-muted-foreground mt-1">See the power of compound interest</p>
      </div>

      <div className="bg-card rounded-2xl p-6 border border-border space-y-5">
        <InputSlider label="Initial Investment" value={principal} onChange={setPrincipal} min={0} max={100000} step={500} prefix="$" />
        <InputSlider label="Monthly Contribution" value={monthly} onChange={setMonthly} min={0} max={5000} step={50} prefix="$" />
        <InputSlider label="Annual Return %" value={rate} onChange={setRate} min={0} max={20} step={0.5} suffix="%" />
        <InputSlider label="Time Period" value={years} onChange={setYears} min={1} max={40} step={1} suffix=" years" />
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <ResultCard label="Future Value" value={futureValue} icon={TrendingUp} highlight />
        <ResultCard label="Total Contributed" value={totalContributed} icon={DollarSign} />
        <ResultCard label="Interest Earned" value={totalInterest} icon={TrendingUp} />
      </div>

      {/* Visual bar */}
      <div className="bg-card rounded-2xl p-6 border border-border">
        <p className="text-sm font-semibold text-foreground mb-4">Growth Breakdown</p>
        <div className="h-8 rounded-full overflow-hidden flex">
          <div
            className="bg-primary/30 h-full transition-all"
            style={{ width: `${(totalContributed / futureValue) * 100}%` }}
          />
          <div className="bg-primary h-full flex-1" />
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>Contributions: {formatCurrency(totalContributed)}</span>
          <span>Interest: {formatCurrency(totalInterest)}</span>
        </div>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5">
        <p className="text-xs font-semibold text-primary mb-1">💡 Did you know?</p>
        <p className="text-sm text-foreground">
          Albert Einstein reportedly called compound interest "the eighth wonder of the world." Starting early — even with small amounts — can lead to significant wealth over time.
        </p>
      </div>
    </div>
  );
}

function InputSlider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
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
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
      />
    </div>
  );
}

function ResultCard({
  label,
  value,
  icon: Icon,
  highlight,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  highlight?: boolean;
}) {
  return (
    <div className={`rounded-2xl p-5 border ${highlight ? "bg-primary/5 border-primary/30" : "bg-card border-border"}`}>
      <Icon className={`h-5 w-5 mb-2 ${highlight ? "text-primary" : "text-muted-foreground"}`} />
      <p className="text-xl font-bold text-foreground">{formatCurrency(value)}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
}
