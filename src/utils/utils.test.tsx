import { excludeItemById } from './exclude-item-by-id';

it(`excludeItemById correctly deletes first element`, function () {
  const mockItems = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ];

  const result = excludeItemById(1, mockItems);

  expect(result).toHaveLength(5);
  expect(result).not.toContainEqual([{ id: 1 }]);
});

it(`excludeItemById correctly deletes middle element`, function () {
  const mockItems = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ];
  const result = excludeItemById(3, mockItems);

  expect(result).toHaveLength(5);
  expect(result).not.toContainEqual([{ id: 3 }]);
});

it(`excludeItemById correctly deletes last element`, function () {
  const mockItems = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
  ];
  const result = excludeItemById(6, mockItems);

  expect(result).toHaveLength(5);
  expect(result).not.toContainEqual([{ id: 6 }]);
});

