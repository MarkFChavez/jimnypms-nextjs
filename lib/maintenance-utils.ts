// Simple types for the YAML config
export type Transmission = "manual" | "automatic";
export type DrivingCondition = "normal" | "heavy";
export type SimpleStatus = "replace" | "inspect" | "due-soon" | "ok";

// Maintenance profiles for different owner preferences (only affects oil change interval)
export const MAINTENANCE_PROFILES = {
  strict: { label: "Strict", interval: "5k km", oilChangeKm: 5000 },
  conservative: { label: "Conservative", interval: "10k km", oilChangeKm: 10000 },
  serviceManual: { label: "Service Manual", interval: "15k km", oilChangeKm: 15000 },
} as const;

export type MaintenanceProfile = keyof typeof MAINTENANCE_PROFILES;

export interface MaintenanceItem {
  name: string;
  interval: {
    normal: number;
    heavy: number;
  };
  for?: "all" | "manual" | "automatic";
  oneTime?: boolean;
  notes?: string;
}

export interface MaintenanceConfig {
  items: MaintenanceItem[];
}

export interface VehicleInput {
  odometer: number;
  transmission: Transmission;
  drivingCondition: DrivingCondition;
  profile: MaintenanceProfile;
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
  // Profile only affects "Engine Oil & Filter" (not break-in)
  const isOilChange = item.name === "Engine Oil & Filter" && !item.oneTime;
  const intervalKm = isOilChange
    ? MAINTENANCE_PROFILES[vehicle.profile].oilChangeKm
    : item.interval[vehicle.drivingCondition];

  if (!intervalKm || intervalKm === 0) {
    return {
      status: "ok",
      kmUntilDue: 0,
      intervalKm: 0,
      percentUsed: 0,
    };
  }

  // Calculate where we are in the current interval cycle
  let kmIntoCurrentCycle = vehicle.odometer % intervalKm;

  // Edge case: if exactly at interval boundary, treat as 100% (just completed)
  if (kmIntoCurrentCycle === 0 && vehicle.odometer > 0) {
    kmIntoCurrentCycle = intervalKm;
  }

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

    // Skip one-time items that are already completed
    if (item.oneTime) {
      const intervalKm = item.interval[vehicle.drivingCondition];
      if (vehicle.odometer > intervalKm) {
        continue;
      }
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
