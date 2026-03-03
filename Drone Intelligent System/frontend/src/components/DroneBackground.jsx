export default function DroneBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">

      {/* Moving drone */}
      <div className="absolute animate-droneFlight text-4xl">
        🚁
      </div>

    </div>
  );
}