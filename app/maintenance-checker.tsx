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
  const [drivingCondition, setDrivingCondition] = useState<DrivingCondition>("normal");
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
    <div style={{ border: "1px solid #333", padding: "24px", background: "#fffef9" }}>
      <h1 style={{ margin: "0 0 4px 0", fontSize: "18px", fontWeight: "bold", letterSpacing: "1px" }}>
        JIMNY MAINTENANCE CHECK
      </h1>
      <p style={{ margin: "0 0 24px 0", fontSize: "12px", color: "#666" }}>
        Suzuki Jimny Gen 4 (JB64/JB74)
      </p>

      <hr />

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}>
            Current Odometer:
          </label>
          <input
            type="number"
            value={odometer}
            onChange={(e) => setOdometer(e.target.value)}
            placeholder="e.g. 45000"
            style={{ width: "150px", fontSize: "16px" }}
            min="0"
            required
          />
          <span style={{ marginLeft: "8px", color: "#666" }}>km</span>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}>
            Transmission:
          </label>
          <label style={{ marginRight: "20px", cursor: "pointer" }}>
            <input
              type="radio"
              name="transmission"
              value="manual"
              checked={transmission === "manual"}
              onChange={() => setTransmission("manual")}
            />
            Manual
          </label>
          <label style={{ cursor: "pointer" }}>
            <input
              type="radio"
              name="transmission"
              value="automatic"
              checked={transmission === "automatic"}
              onChange={() => setTransmission("automatic")}
            />
            Automatic
          </label>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}>
            Driving Conditions:
          </label>
          <label style={{ marginRight: "20px", cursor: "pointer" }}>
            <input
              type="radio"
              name="driving"
              value="normal"
              checked={drivingCondition === "normal"}
              onChange={() => setDrivingCondition("normal")}
            />
            Normal
          </label>
          <label style={{ cursor: "pointer" }}>
            <input
              type="radio"
              name="driving"
              value="severe"
              checked={drivingCondition === "severe"}
              onChange={() => setDrivingCondition("severe")}
            />
            Severe
          </label>
          <p style={{ margin: "8px 0 0 0", fontSize: "11px", color: "#666" }}>
            Severe: dusty roads, off-road, towing, extreme temperatures
          </p>
        </div>

        <hr />

        <button type="submit" style={{ width: "100%", padding: "12px", fontWeight: "bold" }}>
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
    <div style={{ border: "1px solid #333", padding: "24px", background: "#fffef9" }}>
      <h1 style={{ margin: "0 0 4px 0", fontSize: "18px", fontWeight: "bold", letterSpacing: "1px" }}>
        MAINTENANCE REPORT
      </h1>
      <p style={{ margin: "0 0 16px 0", fontSize: "12px", color: "#666" }}>
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
    <div style={{ marginBottom: "20px" }}>
      <h2
        className={statusClass}
        style={{
          margin: "0 0 8px 0",
          fontSize: "14px",
          fontWeight: "bold",
          cursor: collapsed ? "pointer" : "default",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
        onClick={() => collapsed && setIsExpanded(!isExpanded)}
      >
        <span style={{
          display: "inline-block",
          width: "12px",
          height: "12px",
          border: "1px solid currentColor",
          background: count > 0 ? "currentColor" : "transparent",
        }} />
        {title} ({count})
        {collapsed && (
          <span style={{ fontSize: "12px", color: "#666" }}>
            {isExpanded ? "[-]" : "[+]"}
          </span>
        )}
      </h2>

      {isExpanded && (
        <>
          {items.length === 0 && emptyText && (
            <p style={{ margin: "0", fontSize: "12px", color: "#666", paddingLeft: "20px" }}>
              {emptyText}
            </p>
          )}
          {items.map(({ item, result }) => (
            <div
              key={item.name}
              style={{
                paddingLeft: "20px",
                marginBottom: "8px",
                fontSize: "13px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>• {item.name}</span>
                {result.kmUntilDue > 0 && (
                  <span style={{ color: "#666" }}>
                    {formatKm(result.kmUntilDue)} left
                  </span>
                )}
              </div>
              {result.intervalKm > 0 && (
                <div style={{ fontSize: "11px", color: "#666", paddingLeft: "12px" }}>
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
