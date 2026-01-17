import { OrdersService } from './orders.service';

describe('OrdersService', () => {
  it('should be defined', () => {
    const service = new OrdersService({} as never);
    expect(service).toBeDefined();
  });
});
