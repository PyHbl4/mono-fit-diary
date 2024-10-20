export enum Entities {
  Users = 'Users',
  OtherEntity = 'OtherEntity',
  // Добавьте сюда другие типы сущностей по мере необходимости
}

const hiddenProps: Record<Entities, string[]> = {
  [Entities.Users]: ['password', 'scopes', 'sessionId'],
  [Entities.OtherEntity]: ['someHiddenField'], // Пример для другой сущности
};

export function omitHiddenProps<T extends object>(entity: T, Entities: Entities): Partial<T> {
  const propsToHide = hiddenProps[Entities];
  return Object.fromEntries(Object.entries(entity).filter(([key]) => !propsToHide.includes(key))) as Partial<T>;
}
