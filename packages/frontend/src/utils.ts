export const getTime = (date: Date): string => `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;

export const average = (values: number[]) =>
  values.reduce((total, current) => total + current, 0) / values.length;

export const movingAverage = (values, count, defaultValue = 0) =>
  [...new Array(count / 2)]
    .map(() => defaultValue)
    .concat(
      values.map((value: number, index: number): number =>
        average(values.slice(index, index + count))
      )
    );

export const format = {
  power: (value: number) => `${(value / 1000).toFixed(3)}kW`,
  energy: (value: number) => `${(value / 1000).toFixed(3)}kWh`,
}
