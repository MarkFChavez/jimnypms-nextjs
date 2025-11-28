"use client";

import { useState } from "react";
import { jsPDF } from "jspdf";
import {
  categorizeMaintenanceItems,
  formatKm,
  CategorizedItems,
  VehicleInput,
  MaintenanceItem,
  SimpleMaintenanceResult,
  DrivingCondition,
  Transmission,
  MaintenanceProfile,
  MAINTENANCE_PROFILES,
} from "@/lib/maintenance-utils";

interface Props {
  items: MaintenanceItem[];
}

export default function MaintenanceChecker({ items }: Props) {
  const [showResults, setShowResults] = useState(false);
  const [odometer, setOdometer] = useState("");
  const [transmission, setTransmission] = useState<Transmission>("automatic");
  const [profile, setProfile] = useState<MaintenanceProfile>("conservative");
  const [drivingCondition, setDrivingCondition] = useState<DrivingCondition>("normal");
  const [results, setResults] = useState<CategorizedItems | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const km = parseInt(odometer, 10);
    if (isNaN(km) || km < 0) return;

    const vehicle: VehicleInput = {
      odometer: km,
      transmission,
      profile,
      drivingCondition,
    };

    const categorized = categorizeMaintenanceItems(items, vehicle);
    setResults(categorized);
    setShowResults(true);
  };

  const handleReset = () => {
    setOdometer("");
    setProfile("conservative");
    setShowResults(false);
    setResults(null);
  };

  if (showResults && results) {
    return (
      <ResultsView
        results={results}
        odometer={parseInt(odometer, 10)}
        transmission={transmission}
        profile={profile}
        drivingCondition={drivingCondition}
        onReset={handleReset}
      />
    );
  }

  return (
    <div style={{ border: "2px solid #333", padding: "32px", background: "#fffef9", position: "relative" }}>
      {/* JB74 Badge */}
      <span style={{
        position: "absolute",
        top: "-16px",
        right: "16px",
        background: "#333",
        color: "#fffef9",
        padding: "8px 16px",
        fontSize: "18px",
        fontWeight: "bold",
        letterSpacing: "2px"
      }}>
        JB74
      </span>

      <h1 style={{ margin: "0 0 8px 0", fontSize: "22px", fontWeight: "bold", letterSpacing: "1px" }}>
        WHAT'S DUE?
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
            style={{ width: "100%", maxWidth: "180px" }}
            min="0"
            required
            autoFocus
          />
          <span style={{ marginLeft: "12px", color: "#444", fontSize: "18px" }}>km</span>
        </div>

        <div style={{ marginBottom: "28px" }}>
          <label style={{ display: "block", marginBottom: "12px", fontSize: "18px", fontWeight: "bold" }}>
            Maintenance Profile:
          </label>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {(Object.keys(MAINTENANCE_PROFILES) as MaintenanceProfile[]).map((key) => {
              const isSelected = profile === key;
              const { label, interval } = MAINTENANCE_PROFILES[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setProfile(key)}
                  style={{
                    flex: "1 1 100px",
                    minWidth: "100px",
                    padding: "12px 16px",
                    border: isSelected ? "3px solid #333" : "2px solid #aaa",
                    background: isSelected ? "#f0f0e8" : "#fffef9",
                    cursor: "pointer",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: "14px", fontWeight: isSelected ? "bold" : "normal" }}>
                    {label}
                  </div>
                  <div style={{ fontSize: "18px", fontWeight: "bold", marginTop: "4px" }}>
                    {interval}
                  </div>
                </button>
              );
            })}
          </div>
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

function generatePDF(
  results: CategorizedItems,
  odometer: number,
  transmission: Transmission,
  profile: MaintenanceProfile,
  drivingCondition: DrivingCondition
) {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  // Helper to add text and handle page breaks
  const addText = (text: string, fontSize: number, isBold = false, color: [number, number, number] = [0, 0, 0]) => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", isBold ? "bold" : "normal");
    doc.setTextColor(color[0], color[1], color[2]);

    const lines = doc.splitTextToSize(text, contentWidth);
    const lineHeight = fontSize * 0.5;

    for (const line of lines) {
      if (y + lineHeight > 280) {
        doc.addPage();
        y = 20;
      }
      doc.text(line, margin, y);
      y += lineHeight;
    }
  };

  const addSection = (
    title: string,
    items: Array<{ item: MaintenanceItem; result: SimpleMaintenanceResult }>,
    color: [number, number, number]
  ) => {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    y += 5;
    addText(`${title} (${items.length})`, 14, true, color);
    y += 2;

    if (items.length === 0) {
      addText("None", 10, false, [100, 100, 100]);
    } else {
      for (const { item, result } of items) {
        const kmInfo = result.kmUntilDue > 0 ? ` - ${formatKm(result.kmUntilDue)} left` : "";
        addText(`• ${item.name}${kmInfo}`, 11, false);
        if (result.intervalKm > 0) {
          addText(`  Every ${formatKm(result.intervalKm)}`, 9, false, [100, 100, 100]);
        }
        if (item.notes) {
          addText(`  ${item.notes}`, 9, false, [100, 100, 100]);
        }
        y += 2;
      }
    }
  };

  // Header
  addText("JIMNY PH MAINTENANCE REPORT", 18, true);
  y += 3;
  const profileInfo = `${MAINTENANCE_PROFILES[profile].label} (${MAINTENANCE_PROFILES[profile].interval})`;
  addText(`${formatKm(odometer)} | ${transmission} | ${profileInfo} | ${drivingCondition} driving`, 11, false, [68, 68, 68]);
  addText(`Generated: ${new Date().toLocaleDateString()}`, 9, false, [100, 100, 100]);
  y += 5;

  // Sections with colors
  addSection("REPLACE NOW", results.replace, [196, 30, 58]);
  addSection("INSPECT", results.inspect, [184, 134, 11]);
  addSection("DUE SOON", results.dueSoon, [47, 84, 150]);
  addSection("OK", results.ok, [46, 125, 50]);

  // Footer
  y += 10;
  addText("Based on Suzuki Jimny JB74 service manual intervals.", 8, false, [100, 100, 100]);

  doc.save(`jimny-maintenance-${odometer}km.pdf`);
}

function ResultsView({
  results,
  odometer,
  transmission,
  profile,
  drivingCondition,
  onReset,
}: {
  results: CategorizedItems;
  odometer: number;
  transmission: Transmission;
  profile: MaintenanceProfile;
  drivingCondition: DrivingCondition;
  onReset: () => void;
}) {
  return (
    <div style={{ border: "2px solid #333", background: "#fffef9", padding: "32px" }}>
      <h1 style={{ margin: "0 0 8px 0", fontSize: "22px", fontWeight: "bold", letterSpacing: "1px" }}>
        MAINTENANCE REPORT
      </h1>
      <p style={{ margin: "0 0 20px 0", fontSize: "16px", color: "#444" }}>
        {formatKm(odometer)} | {transmission} | {MAINTENANCE_PROFILES[profile].label} ({MAINTENANCE_PROFILES[profile].interval}) | {drivingCondition} driving
      </p>
      <hr style={{ margin: "0 0 20px 0" }} />

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

      <hr style={{ margin: "20px 0" }} />
      <div style={{ display: "flex", gap: "16px", flexDirection: "column" }}>
        <button onClick={() => generatePDF(results, odometer, transmission, profile, drivingCondition)} style={{ width: "100%", fontWeight: "bold", color: "#c41e3a" }}>
          [ DOWNLOAD PDF ]
        </button>
        <button onClick={onReset} style={{ width: "100%" }}>
          &larr; Check Different Mileage
        </button>
      </div>
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
          {items.map(({ item, result }, index) => (
            <div
              key={item.name}
              style={{
                padding: "12px 12px 12px 28px",
                fontSize: "16px",
                background: index % 2 === 0 ? "#f5f5f2" : "transparent",
                borderLeft: "3px solid currentColor",
                marginLeft: "6px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
                <span style={{ fontWeight: "bold" }}>{item.name}</span>
                {result.kmUntilDue > 0 && (
                  <span style={{ fontWeight: "500", color: "#555" }}>
                    {formatKm(result.kmUntilDue)} left
                  </span>
                )}
              </div>
              {result.intervalKm > 0 && (
                <div style={{ fontSize: "14px", color: "#444", paddingLeft: "16px", marginTop: "4px" }}>
                  every {formatKm(result.intervalKm)}
                </div>
              )}
              {item.notes && (
                <div style={{ fontSize: "13px", color: "#666", paddingLeft: "16px", marginTop: "6px", lineHeight: "1.4" }}>
                  {item.notes}
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
