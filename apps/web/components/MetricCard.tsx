interface MetricCardProps {
  label: string;
  value: string;
  description?: string;
}

export default function MetricCard({ label, value, description }: MetricCardProps) {
  return (
    <div className="rounded-lg border bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-2xl font-semibold text-slate-900">{value}</p>
      {description && <p className="text-xs text-slate-400">{description}</p>}
    </div>
  );
}
