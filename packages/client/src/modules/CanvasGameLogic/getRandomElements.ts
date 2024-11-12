export function getRandomElements() {
  const elements = [
    // O-фигура
    {
      blocks: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
      color: '#FF6EC7',
      strokeColor: '#B81C6D',
    },
    // // I-фигура
    {
      blocks: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
      ],
      color: '#FF6F00',
      strokeColor: '#C75F00',
    },
    {
      blocks: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
      ],
      color: '#FFFF00',
      strokeColor: '#CCCC00',
    },
    // Z-фигура
    {
      blocks: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 1 },
        { x: 1, y: 1 },
      ],
      color: '#00FF00',
      strokeColor: '#009900',
    },
    {
      blocks: [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 0, y: 2 },
      ],
      color: '#00FFFF',
      strokeColor: '#009999',
    },
    // S-фигура
    {
      blocks: [
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
      ],
      color: '#9900FF',
      strokeColor: '#6600CC',
    },
    {
      blocks: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
      ],
      color: '#FF00FF',
      strokeColor: '#990099',
    },
    // T-фигура
    {
      blocks: [
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
      ],
      color: '#00FF99',
      strokeColor: '#009966',
    },
    {
      blocks: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 2, y: 0 },
      ],
      color: '#FF4500',
      strokeColor: '#B23B00',
    },
    {
      blocks: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 0, y: 2 },
      ],
      color: '#FF1493',
      strokeColor: '#8B1A1A',
    },
    {
      blocks: [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
      ],
      color: '#ADFF2F',
      strokeColor: '#4C9E1E',
    },
    // J-фигура
    {
      blocks: [
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
        { x: 0, y: 2 },
      ],
      color: '#D3FF00',
      strokeColor: '#9B9D00',
    },
    {
      blocks: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      color: '#FF6347',
      strokeColor: '#E35D25',
    },
    {
      blocks: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
      ],
      color: '#FF8C00',
      strokeColor: '#B45C00',
    },
    {
      blocks: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
      ],
      color: '#8A2BE2',
      strokeColor: '#5A2A90',
    },
    // L-фигура
    {
      blocks: [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
      ],
      color: '#7FFF00',
      strokeColor: '#6F9D00',
    },
    {
      blocks: [
        { x: 2, y: 0 },
        { x: 0, y: 1 },
        { x: 1, y: 1 },
        { x: 2, y: 1 },
      ],
      color: '#32CD32',
      strokeColor: '#278B2C',
    },
    {
      blocks: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: 1 },
        { x: 1, y: 2 },
      ],
      color: '#FF7F50',
      strokeColor: '#D84B2F',
    },
    {
      blocks: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 0, y: 1 },
      ],
      color: '#C71585',
      strokeColor: '#9B1B53',
    },
  ]

  const indices: number[] = []
  while (indices.length < 3) {
    const randomIndex = Math.floor(Math.random() * elements.length)
    indices.push(randomIndex)
  }

  return indices.map((index: number, i) => {
    return {
      x: 10,
      y: i * 3,
      isDragging: false,
      ...elements[index],
    }
  })
}
