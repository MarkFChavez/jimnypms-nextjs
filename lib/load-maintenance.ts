import "server-only";
import { parse } from "yaml";
import fs from "fs";
import path from "path";
import { MaintenanceItem, MaintenanceConfig } from "./maintenance-utils";

// Load and parse the YAML config (server-side only)
export function loadMaintenanceItems(): MaintenanceItem[] {
  const yamlPath = path.join(process.cwd(), "maintenance.yaml");
  const yamlContent = fs.readFileSync(yamlPath, "utf-8");
  const config = parse(yamlContent) as MaintenanceConfig;
  return config.items;
}
