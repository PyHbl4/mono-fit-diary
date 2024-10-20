import { WithAuthMiddleware } from './with-auth.middleware';

describe('WithAuthMiddleware', () => {
  it('should be defined', () => {
    expect(new WithAuthMiddleware()).toBeDefined();
  });
});
