import { omitHiddenProps, Entities } from './omit-hidden-props';

describe('omitHiddenProps', () => {
  it('should omit hidden properties for Users entity', () => {
    const user = {
      id: '1',
      username: 'test',
      email: 'user@example.com',
      password: 'secret',
      scopes: ['admin'],
      sessionId: 'session123',
    };

    const sanitized = omitHiddenProps(user, Entities.Users);

    expect(sanitized).toEqual({
      id: '1',
      username: 'test',
      email: 'user@example.com',
    });
  });

  it('should return entity unchanged when no hidden properties present', () => {
    const user = {
      id: '2',
      username: 'another',
      email: 'another@example.com',
    };

    const sanitized = omitHiddenProps(user, Entities.Users);

    expect(sanitized).toEqual(user);
  });

  it('should omit hidden properties for OtherEntity', () => {
    const entity = {
      visible: 'yes',
      someHiddenField: 'secret',
    };

    const sanitized = omitHiddenProps(entity, Entities.OtherEntity);

    expect(sanitized).toEqual({ visible: 'yes' });
  });
});
