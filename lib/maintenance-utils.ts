// Simple types for the YAML config
export type Transmission = "manual" | "automatic";
export type DrivingCondition = "normal" | "severe";
export type SimpleStatus = "replace" | "inspect" | "due-soon" | "ok";

export interface MaintenanceItem {
  name: string;
  interval: {
    normal: number;
    severe: number;
  };
  for?: "all" | "manual" | "automatic";
  notes?: string;
}

export interface MaintenanceConfig {
  items: MaintenanceItem[];
}

export interface VehicleInput {
  odometer: number;
  transmission: Transmission;
  drivingCondition: DrivingCondition;
}

export interface SimpleMaintenanceResult {
  status: SimpleStatus;
  kmUntilDue: number;
  intervalKm: number;
  percentUsed: number;
}

export interface CategorizedItems {
  replace: Array<{ item: MaintenanceItem; result: SimpleMaintenanceResult }>;
  inspect: Array<{ item: MaintenanceItem; result: SimpleMaintenanceResult }>;
  dueSoon: Array<{ item: MaintenanceItem; result: SimpleMaintenanceResult }>;
  ok: Array<{ item: MaintenanceItem; result: SimpleMaintenanceResult }>;
}

export function isItemApplicable(
  item: MaintenanceItem,
  transmission: Transmission
): boolean {
  if (!item.for || item.for === "all") return true;
  return item.for === transmission;
}

export function calculateSimpleStatus(
  item: MaintenanceItem,
  vehicle: VehicleInput
): SimpleMaintenanceResult {
  const intervalKm = item.interval[vehicle.drivingCondition];

  if (!intervalKm || intervalKm === 0) {
    return {
      status: "ok",
      kmUntilDue: 0,
      intervalKm: 0,
      percentUsed: 0,
    };
  }

  // Calculate where we are in the current interval cycle
  const kmIntoCurrentCycle = vehicle.odometer % intervalKm;
  const kmUntilDue = intervalKm - kmIntoCurrentCycle;
  const percentUsed = Math.round((kmIntoCurrentCycle / intervalKm) * 100);

  // Determine status based on percentage through interval
  let status: SimpleStatus = "ok";
  if (percentUsed >= 100) {
    status = "replace";
  } else if (percentUsed >= 85) {
    status = "inspect";
  } else if (percentUsed >= 70) {
    status = "due-soon";
  }

  return {
    status,
    kmUntilDue,
    intervalKm,
    percentUsed,
  };
}

export function categorizeMaintenanceItems(
  items: MaintenanceItem[],
  vehicle: VehicleInput
): CategorizedItems {
  const result: CategorizedItems = {
    replace: [],
    inspect: [],
    dueSoon: [],
    ok: [],
  };

  for (const item of items) {
    if (!isItemApplicable(item, vehicle.transmission)) {
      continue;
    }

    const status = calculateSimpleStatus(item, vehicle);
    const entry = { item, result: status };

    switch (status.status) {
      case "replace":
        result.replace.push(entry);
        break;
      case "inspect":
        result.inspect.push(entry);
        break;
      case "due-soon":
        result.dueSoon.push(entry);
        break;
      case "ok":
        result.ok.push(entry);
        break;
    }
  }

  // Sort each category by urgency (higher percent = more urgent)
  const sortByPercent = (
    a: { result: SimpleMaintenanceResult },
    b: { result: SimpleMaintenanceResult }
  ) => b.result.percentUsed - a.result.percentUsed;

  result.replace.sort(sortByPercent);
  result.inspect.sort(sortByPercent);
  result.dueSoon.sort(sortByPercent);
  result.ok.sort(sortByPercent);

  return result;
}

export function formatKm(km: number): string {
  return km.toLocaleString() + " km";
}
