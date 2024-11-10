export function getRandomElements() {
  const arr = [
    {
      x: 10,
      y: 0,
      blocks: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
      isDragging: false,
    },
    {
      x: 10,
      y: 3,
      blocks: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 1 },
        { x: 1, y: 1 },
      ],
      isDragging: false,
    },
    {
      x: 10,
      y: 6,
      blocks: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 0, y: 0 },
      ],
      isDragging: false,
    },
  ]

  if (arr.length < 3) {
    throw new Error('Массив должен содержать хотя бы 3 элемента')
  }

  const indices = new Set()
  while (indices.size < 3) {
    const randomIndex = Math.floor(Math.random() * arr.length)
    indices.add(randomIndex)
  }

  return Array.from(indices).map((index: any) => arr[index])
}
