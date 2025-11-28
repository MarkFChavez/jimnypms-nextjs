import {
  MaintenanceItem,
  MaintenanceInterval,
  DrivingCondition,
  Transmission,
} from "./data/types";

export type SimpleStatus = "replace" | "inspect" | "due-soon" | "ok";

export interface SimpleMaintenanceResult {
  status: SimpleStatus;
  kmUntilDue: number;
  intervalKm: number;
  percentUsed: number;
}

export interface VehicleInput {
  odometer: number;
  transmission: Transmission;
  drivingCondition: DrivingCondition;
}

export function getApplicableInterval(
  item: MaintenanceItem,
  drivingCondition: DrivingCondition
): MaintenanceInterval {
  // Use Asia-Pacific intervals as default
  return item.intervals["asia-pacific"][drivingCondition];
}

export function isItemApplicable(
  item: MaintenanceItem,
  transmission: Transmission
): boolean {
  if (!item.applicableTo) return true;

  if (item.applicableTo.transmission) {
    if (!item.applicableTo.transmission.includes(transmission)) {
      return false;
    }
  }

  // Skip coolant type filtering - show generic coolant message
  if (item.applicableTo.coolantType) {
    return false;
  }

  return true;
}

export function calculateSimpleStatus(
  item: MaintenanceItem,
  vehicle: VehicleInput
): SimpleMaintenanceResult {
  const interval = getApplicableInterval(item, vehicle.drivingCondition);

  // If no km interval, return as OK (time-based only items)
  if (interval.km === null || interval.km === 0) {
    return {
      status: "ok",
      kmUntilDue: 0,
      intervalKm: 0,
      percentUsed: 0,
    };
  }

  // Calculate where we are in the current interval cycle
  // e.g., oil change every 10,000km. At 45,000km → we're 5,000km into the cycle (50%)
  const kmIntoCurrentCycle = vehicle.odometer % interval.km;
  const kmUntilDue = interval.km - kmIntoCurrentCycle;
  const percentUsed = Math.round((kmIntoCurrentCycle / interval.km) * 100);

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
    intervalKm: interval.km,
    percentUsed,
  };
}

export function formatKm(km: number): string {
  return km.toLocaleString() + " km";
}

export interface CategorizedItems {
  replace: Array<{ item: MaintenanceItem; result: SimpleMaintenanceResult }>;
  inspect: Array<{ item: MaintenanceItem; result: SimpleMaintenanceResult }>;
  dueSoon: Array<{ item: MaintenanceItem; result: SimpleMaintenanceResult }>;
  ok: Array<{ item: MaintenanceItem; result: SimpleMaintenanceResult }>;
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
