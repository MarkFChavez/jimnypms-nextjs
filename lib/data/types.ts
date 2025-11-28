export type Region = "asia-pacific" | "europe";
export type DrivingCondition = "normal" | "severe";
export type Transmission = "manual" | "automatic";
export type CoolantType = "blue" | "green";

export interface MaintenanceInterval {
  km: number | null;
  months: number | null;
}

export interface MaintenanceItem {
  id: string;
  name: string;
  category: "engine" | "transmission" | "brakes" | "fluids" | "filters" | "other";
  description: string;
  intervals: {
    "asia-pacific": {
      normal: MaintenanceInterval;
      severe: MaintenanceInterval;
    };
    europe: {
      normal: MaintenanceInterval;
      severe: MaintenanceInterval;
    };
  };
  applicableTo?: {
    transmission?: Transmission[];
    coolantType?: CoolantType[];
  };
  notes?: string;
}

export interface Part {
  id: string;
  name: string;
  category: string;
  oemPartNumber: string;
  alternatives: {
    brand: string;
    partNumber: string;
    notes?: string;
  }[];
  specifications?: string;
}

export interface FluidSpec {
  id: string;
  name: string;
  specification: string;
  capacity: string;
  oemProduct?: string;
  oemPartNumber?: string;
  alternatives: string[];
  notes?: string;
}

export interface UserVehicle {
  odometer: number;
  lastUpdated: string;
  region: Region;
  transmission: Transmission;
  drivingCondition: DrivingCondition;
  coolantType: CoolantType;
}

export interface ServiceRecord {
  id: string;
  maintenanceItemId: string;
  date: string;
  odometer: number;
  cost?: number;
  notes?: string;
}

export type MaintenanceStatus = "overdue" | "due-soon" | "ok";
