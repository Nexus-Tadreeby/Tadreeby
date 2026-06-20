export default function InfoBox({ children, variant = "blue" }) {
  const variants = {
    blue: "bg-blue-50 border-blue-200 text-blue-700",
    green: "bg-green-50 border-green-200 text-green-700",
    orange: "bg-orange-50 border-orange-200 text-orange-700"
  };

  return (
    <div className={`border rounded-xl p-4 text-sm font-['Inter'] ${variants[variant]}`}>
      {children}
    </div>
  );
}