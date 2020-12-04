import { mocked } from 'ts-jest/utils';

import { extractStats, getRTData } from 'solax-common/services';
import { ParsedRT, MinuteStats } from 'solax-common/types';

import { pollMinutely } from '../agenda-items';
import { PollerDb } from '../poller-db';

jest.mock('solax-common/services');

const pollerDbMock = ({
  addMinutely: jest.fn(),
} as unknown) as PollerDb;

describe('agenda items', () => {
  describe('poll minutely', () => {
    const mocks = {
      getRTData: {} as ParsedRT,
      extractStats: {
        date: new Date(0, 0, 0, 0, 0, 10),
      } as MinuteStats,
    };

    beforeAll(async () => {
      mocked(getRTData).mockResolvedValue(mocks.getRTData);
      mocked(extractStats).mockReturnValue(mocks.extractStats);
      await pollMinutely(pollerDbMock)();
    });

    it('should get real time data', () => expect(getRTData).toHaveBeenCalled());

    it('should extract the stats', () =>
      expect(extractStats).toHaveBeenCalledWith(mocks.getRTData));

    it('should update the database with the data & the time set to zero seconds past the minute', () =>
      expect(pollerDbMock.addMinutely).toHaveBeenCalledWith({
        ...mocks.extractStats,
        date: new Date(0, 0, 0, 0, 0, 0),
      }));
  });
});
