"use client";

import { useState } from "react";
import {
  categorizeMaintenanceItems,
  formatKm,
  CategorizedItems,
  VehicleInput,
  MaintenanceItem,
  SimpleMaintenanceResult,
  DrivingCondition,
  Transmission,
} from "@/lib/maintenance-utils";

interface Props {
  items: MaintenanceItem[];
}

export default function MaintenanceChecker({ items }: Props) {
  const [showResults, setShowResults] = useState(false);
  const [odometer, setOdometer] = useState("");
  const [transmission, setTransmission] = useState<Transmission>("manual");
  const [drivingCondition, setDrivingCondition] = useState<DrivingCondition>("heavy");
  const [results, setResults] = useState<CategorizedItems | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const km = parseInt(odometer, 10);
    if (isNaN(km) || km < 0) return;

    const vehicle: VehicleInput = {
      odometer: km,
      transmission,
      drivingCondition,
    };

    const categorized = categorizeMaintenanceItems(items, vehicle);
    setResults(categorized);
    setShowResults(true);
  };

  const handleReset = () => {
    setOdometer("");
    setShowResults(false);
    setResults(null);
  };

  if (showResults && results) {
    return (
      <ResultsView
        results={results}
        odometer={parseInt(odometer, 10)}
        transmission={transmission}
        drivingCondition={drivingCondition}
        onReset={handleReset}
      />
    );
  }

  return (
    <div style={{ border: "2px solid #333", padding: "32px", background: "#fffef9" }}>
      <h1 style={{ margin: "0 0 8px 0", fontSize: "22px", fontWeight: "bold", letterSpacing: "1px" }}>
        MAINTENANCE CHECK
      </h1>
      <p style={{ margin: "0 0 28px 0", fontSize: "16px", color: "#444" }}>
        Suzuki Jimny JB74 - Philippine Edition
      </p>

      <hr />

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "28px" }}>
          <label style={{ display: "block", marginBottom: "12px", fontSize: "18px", fontWeight: "bold" }}>
            Current Odometer:
          </label>
          <input
            type="number"
            value={odometer}
            onChange={(e) => setOdometer(e.target.value)}
            placeholder="e.g. 45000"
            style={{ width: "180px" }}
            min="0"
            required
          />
          <span style={{ marginLeft: "12px", color: "#444", fontSize: "18px" }}>km</span>
        </div>

        <div style={{ marginBottom: "28px" }}>
          <label style={{ display: "block", marginBottom: "12px", fontSize: "18px", fontWeight: "bold" }}>
            Transmission:
          </label>
          <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
            <label style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
              <input
                type="radio"
                name="transmission"
                value="manual"
                checked={transmission === "manual"}
                onChange={() => setTransmission("manual")}
              />
              <span style={{ fontSize: "18px" }}>Manual</span>
            </label>
            <label style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
              <input
                type="radio"
                name="transmission"
                value="automatic"
                checked={transmission === "automatic"}
                onChange={() => setTransmission("automatic")}
              />
              <span style={{ fontSize: "18px" }}>Automatic</span>
            </label>
          </div>
        </div>

        <div style={{ marginBottom: "32px" }}>
          <label style={{ display: "block", marginBottom: "12px", fontSize: "18px", fontWeight: "bold" }}>
            Driving Conditions:
          </label>
          <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
            <label style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
              <input
                type="radio"
                name="driving"
                value="normal"
                checked={drivingCondition === "normal"}
                onChange={() => setDrivingCondition("normal")}
              />
              <span style={{ fontSize: "18px" }}>Normal</span>
            </label>
            <label style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
              <input
                type="radio"
                name="driving"
                value="heavy"
                checked={drivingCondition === "heavy"}
                onChange={() => setDrivingCondition("heavy")}
              />
              <span style={{ fontSize: "18px" }}>Heavy Use</span>
            </label>
          </div>
          <p style={{ margin: "12px 0 0 0", fontSize: "14px", color: "#444" }}>
            Heavy Use: provincial roads, flooding, off-road, heavy traffic
          </p>
        </div>

        <hr />

        <button type="submit" style={{ width: "100%", fontWeight: "bold" }}>
          [ CHECK MAINTENANCE ]
        </button>
      </form>
    </div>
  );
}

function ResultsView({
  results,
  odometer,
  transmission,
  drivingCondition,
  onReset,
}: {
  results: CategorizedItems;
  odometer: number;
  transmission: Transmission;
  drivingCondition: DrivingCondition;
  onReset: () => void;
}) {
  return (
    <div style={{ border: "2px solid #333", padding: "32px", background: "#fffef9" }}>
      <h1 style={{ margin: "0 0 8px 0", fontSize: "22px", fontWeight: "bold", letterSpacing: "1px" }}>
        MAINTENANCE REPORT
      </h1>
      <p style={{ margin: "0 0 20px 0", fontSize: "16px", color: "#444" }}>
        {formatKm(odometer)} | {transmission} | {drivingCondition} driving
      </p>

      <hr />

      <Section
        title="REPLACE NOW"
        items={results.replace}
        statusClass="status-replace"
        emptyText="Nothing needs immediate replacement"
      />

      <Section
        title="INSPECT"
        items={results.inspect}
        statusClass="status-inspect"
        emptyText="Nothing needs inspection"
      />

      <Section
        title="DUE SOON"
        items={results.dueSoon}
        statusClass="status-due-soon"
        emptyText="Nothing due soon"
      />

      <Section
        title="OK"
        items={results.ok}
        statusClass="status-ok"
        emptyText=""
        collapsed
      />

      <hr />

      <button onClick={onReset} style={{ width: "100%" }}>
        &larr; Check Different Mileage
      </button>
    </div>
  );
}

function Section({
  title,
  items,
  statusClass,
  emptyText,
  collapsed = false,
}: {
  title: string;
  items: Array<{ item: MaintenanceItem; result: SimpleMaintenanceResult }>;
  statusClass: string;
  emptyText: string;
  collapsed?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(!collapsed);

  const count = items.length;

  return (
    <div style={{ marginBottom: "28px" }}>
      <h2
        className={statusClass}
        style={{
          margin: "0 0 12px 0",
          fontSize: "18px",
          fontWeight: "bold",
          cursor: collapsed ? "pointer" : "default",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
        onClick={() => collapsed && setIsExpanded(!isExpanded)}
      >
        <span style={{
          display: "inline-block",
          width: "16px",
          height: "16px",
          border: "2px solid currentColor",
          background: count > 0 ? "currentColor" : "transparent",
          flexShrink: 0,
        }} />
        {title} ({count})
        {collapsed && (
          <span style={{ fontSize: "14px", color: "#444" }}>
            {isExpanded ? "[-]" : "[+]"}
          </span>
        )}
      </h2>

      {isExpanded && (
        <>
          {items.length === 0 && emptyText && (
            <p style={{ margin: "0", fontSize: "16px", color: "#444", paddingLeft: "28px" }}>
              {emptyText}
            </p>
          )}
          {items.map(({ item, result }) => (
            <div
              key={item.name}
              style={{
                paddingLeft: "28px",
                marginBottom: "12px",
                fontSize: "16px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
                <span>• {item.name}</span>
                {result.kmUntilDue > 0 && (
                  <span style={{ fontWeight: "bold" }}>
                    {formatKm(result.kmUntilDue)} left
                  </span>
                )}
              </div>
              {result.intervalKm > 0 && (
                <div style={{ fontSize: "14px", color: "#444", paddingLeft: "16px" }}>
                  every {formatKm(result.intervalKm)}
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
