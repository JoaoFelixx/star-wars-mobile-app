import type { Vehicle, VehicleAPIResponse } from '@/types/vehicle';

import { api } from './client';


export function getVehicles() {

  const vehiclesData = api<VehicleAPIResponse>('/vehicles');

  return vehiclesData;
}

export function getVehiclesByPagination(pagination?: number) {
  const url = pagination ? `/vehicles/?page=${pagination}` : '/vehicles';

  const vehiclesData = api<VehicleAPIResponse>(url);

  return vehiclesData;
}

export function getVehicle(id: string) {
  return api<Vehicle>(`/vehicles/${id}`);
}
