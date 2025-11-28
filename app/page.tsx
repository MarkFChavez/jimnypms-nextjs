import { loadMaintenanceItems } from "@/lib/load-maintenance";
import MaintenanceChecker from "./maintenance-checker";

export default function Home() {
  // Load maintenance items server-side
  const items = loadMaintenanceItems();

  return <MaintenanceChecker items={items} />;
}
