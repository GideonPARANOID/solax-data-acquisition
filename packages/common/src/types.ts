export type RTAPI = {
  type: string;
  SN: string;
  ver: string;
  Data: number[];
  Information: (string | number)[];
};

type RTDataEntity = {
  current: number;
  voltage: number;
  power: number;
};

type UnitDescription = {
  name: string;
  short: string;
};

export type ParsedRT = {
  date: number;
  pv: RTDataEntity[];
  grid: RTDataEntity & {
    frequency: number;
    energyTo: number;
    energyFrom: number;
  };
  battery: RTDataEntity & {
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

export type MinuteStats = {
  date: number;
  pv: RTDataEntity;
  solar: ParsedRT['solar'];
  temperature: ParsedRT['temperature'];
};

export type Record = {
  date: number;
  value: number;
};

export type DayStats = {
  date: number;
  total: number;
  max: {
    minute: Record;
    hour: Record;
  };
};
