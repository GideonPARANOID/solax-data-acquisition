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

type UnitDesc = {
  name: string;
  short: string;
};

export type ParsedRT = {
  date: Date;
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
    current: UnitDesc;
    power: UnitDesc;
    voltage: UnitDesc;
    frequency: UnitDesc;
  };
};

export type MinuteStats = {
  date: Date;
  pv: RTDataEntity;
  solar: ParsedRT['solar'];
  temperature: ParsedRT['temperature'];
};

export type Record = {
  date: Date;
  value: number;
};

export type DayStats = {
  date: Date;
  total: number;
  max: {
    minute: Record;
    hour: Record;
  };
};

export type RecordStats = {
  max: {
    minute: Record;
    hour: Record;
    day: Record;
  };
};
