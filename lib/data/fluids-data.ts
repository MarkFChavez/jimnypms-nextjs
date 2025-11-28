import { FluidSpec } from "./types";

export const fluidsData: FluidSpec[] = [
  {
    id: "engine-oil",
    name: "Engine Oil",
    specification: "0W-20 (or 5W-30) Full Synthetic, API SN/SP, GF-6A",
    capacity: "4.0L (with filter)",
    oemProduct: "Ecstar F9000 0W-20",
    alternatives: [
      "Mobil 1 0W-20",
      "Castrol Edge 0W-20",
      "Penrite Enviro+ 0W-20",
      "Valvoline SynPower 0W-20"
    ],
    notes: "0W-20 recommended for fuel economy. 5W-30 acceptable in warmer climates."
  },
  {
    id: "manual-trans",
    name: "Manual Transmission Oil",
    specification: "75W-80 GL-4 (or 75W GL-4)",
    capacity: "1.2L",
    oemProduct: "Suzuki Gear Oil 75W",
    oemPartNumber: "99000-22B27-036",
    alternatives: [
      "Penrite Pro-Gear 70W-75",
      "Red Line MT-LV 70W75",
      "Shell Spirax S4 G 75W-80"
    ],
    notes: "Same spec as transfer case"
  },
  {
    id: "auto-trans",
    name: "Automatic Transmission Fluid",
    specification: "Suzuki ATF3317 (JWS3309 compatible)",
    capacity: "3-4L (drain/fill), 5.7L (total)",
    oemProduct: "Suzuki ATF3317",
    alternatives: [
      "Mobil ATF Multi-Vehicle",
      "Castrol Transmax Dexron-VI",
      "Penrite ATF FS"
    ],
    notes: "Sensitive to fluid type. OEM recommended."
  },
  {
    id: "transfer-case",
    name: "Transfer Case Oil",
    specification: "75W-80 GL-4 Full Synthetic",
    capacity: "1.2L",
    oemProduct: "Suzuki Gear Oil 75W",
    oemPartNumber: "99000-22B27-036",
    alternatives: [
      "Penrite Pro-Gear 70W-75",
      "Red Line MT-LV 70W75"
    ],
    notes: "Same spec as manual transmission"
  },
  {
    id: "differential",
    name: "Differential Oil (Front & Rear)",
    specification: "75W-85 GL-5 Full Synthetic",
    capacity: "Front: 1.6L, Rear: 1.3L",
    oemProduct: "Suzuki Super Gear Oil 75W-85",
    alternatives: [
      "Penrite Pro-Gear GL-5 75W-85",
      "Red Line 75W85 GL-5"
    ],
    notes: "GL-5 required for hypoid gears"
  },
  {
    id: "coolant-blue",
    name: "Engine Coolant (Blue - Super Long Life)",
    specification: "Ethylene glycol super long-life coolant",
    capacity: "~5.0L",
    oemProduct: "Suzuki Super Long Life Coolant (Blue)",
    alternatives: [
      "Penrite Blue OEM Coolant",
      "Toyota Super Long Life Coolant (Blue)"
    ],
    notes: "First change at 150k km / 8 years, then every 75k km / 4 years. Do NOT mix with green coolant."
  },
  {
    id: "coolant-green",
    name: "Engine Coolant (Green - Long Life)",
    specification: "Ethylene glycol long-life coolant",
    capacity: "~5.0L",
    oemProduct: "Suzuki Long Life Coolant (Green)",
    alternatives: [
      "Nulon Green Long Life Coolant",
      "Penrite Green OEM Coolant"
    ],
    notes: "Change every 45k km / 3 years. Do NOT mix with blue coolant."
  },
  {
    id: "brake-fluid",
    name: "Brake Fluid",
    specification: "DOT-3 (DOT-4 compatible)",
    capacity: "~800mL",
    alternatives: [
      "Bendix DOT-3",
      "Castrol DOT-4",
      "Any quality DOT-3/DOT-4"
    ],
    notes: "Shared reservoir with clutch on manual transmission vehicles"
  },
  {
    id: "power-steering",
    name: "Power Steering Fluid",
    specification: "Electric Power Steering - No Fluid Required",
    capacity: "N/A",
    alternatives: [],
    notes: "Gen 4 Jimny uses electric power steering. No fluid to change."
  },
  {
    id: "washer-fluid",
    name: "Windscreen Washer Fluid",
    specification: "Any quality washer fluid",
    capacity: "~2.5L",
    alternatives: [
      "Rain-X Washer Fluid",
      "Any quality brand"
    ],
    notes: "Use bug remover concentrate in summer, anti-freeze washer fluid in cold climates"
  }
];
