export type RealTimeAPI = {
  type: string;
  SN: string;
  ver: string;
  Data: number[];
  Information: (string | number)[];
};

type RealTimeDataEntity = {
  current: number;
  voltage: number;
  power: number;
};

type UnitDescription = {
  name: string;
  short: string;
};

export type RealTimeData = {
  pv: RealTimeDataEntity[];
  grid: RealTimeDataEntity & {
    frequency: number;
    energyTo: number;
    energyFrom: number;
  };
  battery: RealTimeDataEntity & {
    temperature: number;
    capacity: number;
  };
  solar: {
    today: number;
    total: number;
  };
  eps: {
    current: number;
    voltage: number;
    frequency: number;
    va: number;
  };
  feedIn: {
    power: number;
  };
  status: number;
  temperature: number;
  meta: {
    type: string;
    version: string;
    systemMax: number;
  };
  units: {
    current: UnitDescription;
    power: UnitDescription;
    voltage: UnitDescription;
    frequency: UnitDescription;
  };
};

export type UsefulRealTimeData = {
  pv: RealTimeDataEntity;
  solar: RealTimeData['solar'];
  temperature: RealTimeData['temperature'];
};
