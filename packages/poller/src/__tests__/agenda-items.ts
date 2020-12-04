import { mocked } from 'ts-jest/utils';

import { extractStats, getRTData } from 'solax-common/services';
import {
  ParsedRT,
  MinuteStats,
  DayStats,
  RecordStats,
} from 'solax-common/types';

import { generateDayStats, pollMinutely } from '../agenda-items';
import { calcDayStats } from '../aggregation';
import { PollerDB } from '../poller-db';

jest.mock('solax-common/services');
jest.mock('../aggregation');

describe('agenda items', () => {
  const mocks = {
    pollerDB: ({
      getMinutelyForDay: jest.fn(),
      updateDay: jest.fn(),
      getRecords: jest.fn(),
      addMinutely: jest.fn(),
      updateRecords: jest.fn(),
    } as unknown) as PollerDB,
    date: new Date(0, 0, 0, 0, 0, 10),
  };

  describe('poll minutely', () => {
    const data = {
      getRTData: {} as ParsedRT,
      extractStats: {
        date: mocks.date,
      } as MinuteStats,
    };

    beforeAll(async () => {
      mocked(getRTData).mockResolvedValue(data.getRTData);
      mocked(extractStats).mockReturnValue(data.extractStats);
      await pollMinutely(mocks.pollerDB)();
    });

    it('should get real time data', () => expect(getRTData).toHaveBeenCalled());

    it('should extract the stats', () =>
      expect(extractStats).toHaveBeenCalledWith(data.getRTData));

    it('should update the database with the data & the time set to zero seconds past the minute', () =>
      expect(mocks.pollerDB.addMinutely).toHaveBeenCalledWith({
        ...data.extractStats,
        date: new Date(0, 0, 0, 0, 0, 0),
      }));
  });

  describe('generate day stats', () => {
    const data = {
      getRecords: {
        max: {
          minute: { value: 1, date: mocks.date },
          hour: { value: 1, date: mocks.date },
          day: { value: 1, date: mocks.date },
        },
      } as RecordStats,
      calcDayStats: {
        max: {
          minute: { value: 1, date: mocks.date },
          hour: { value: 2, date: mocks.date },
        },
        total: 3,
        date: mocks.date,
      } as DayStats,
      updateRecords: {
        max: {
          minute: { value: 1, date: mocks.date },
          hour: { value: 2, date: mocks.date },
          day: { value: 3, date: mocks.date },
        },
      },
    };

    beforeAll(async () => {
      mocked(calcDayStats).mockReturnValue(data.calcDayStats);
      mocked(mocks.pollerDB.getRecords).mockResolvedValue(data.getRecords);
      await generateDayStats(mocks.pollerDB)();
    });

    it('should get minutely data for the day', () =>
      expect(mocks.pollerDB.getMinutelyForDay).toHaveBeenCalledWith(
        expect.any(Date)
      ));

    it('should update the day stats', () =>
      expect(mocks.pollerDB.updateDay).toHaveBeenCalledWith(data.calcDayStats));

    it('should update the record', () =>
      expect(mocks.pollerDB.updateRecords).toHaveBeenCalledWith(
        data.updateRecords
      ));
  });
});
