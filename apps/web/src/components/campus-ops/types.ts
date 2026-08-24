import type { DashboardSummary, RoomDto } from '@smart-campus/shared-types';

export type OpsMetric = 'occupancy' | 'temperature' | 'co2' | 'humidity';

export type MetricStatus = 'GOOD' | 'WARN' | 'LOW' | 'CRITICAL';

export type BuildingMetric = {
  value: number;
  unit: string;
  status: MetricStatus;
  isDemo: boolean;
};

export type CampusBuildingView = {
  id: string;
  code: string;
  name: string;
  floors: number;
  roomsCount: number;
  devicesCount: number;
  mapX: number;
  mapY: number;
  temperature: BuildingMetric;
  co2: BuildingMetric;
  humidity: BuildingMetric;
  utilisation: BuildingMetric;
  isDemo: boolean;
};

export type WeeklyCell = {
  day: number;
  hour: number;
  intensity: number;
  isDemo: boolean;
};

export type CampusOpsData = {
  summary: DashboardSummary | null;
  buildings: CampusBuildingView[];
  rooms: RoomDto[];
  weeklyPattern: WeeklyCell[];
  occupancyPeople: number;
  occupancyPercent: number;
  loading: boolean;
  error: string | null;
};
