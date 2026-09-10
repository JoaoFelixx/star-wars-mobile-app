import type { Vehicle } from "@/types/vehicle";

export function mapVehicle(vehicle: Vehicle) {
  const id = vehicle.url.match(/\/(\d+)\/$/)?.[1] || "";

  return {
    ...vehicle,
    id,
  };
}
