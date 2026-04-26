const COLOR_SCHEMAS: Array<{ backgroundColor: string; color: string }> = [
  { backgroundColor: '#2c3a6e', color: '#91a7ff' },
  { backgroundColor: '#1c3a5e', color: '#74c0fc' },
  { backgroundColor: '#0d3b44', color: '#66d9e8' },
  { backgroundColor: '#1a3a2a', color: '#69db7c' },
  { backgroundColor: '#4a2b0a', color: '#ffc078' },
  { backgroundColor: '#3d1a35', color: '#f783ac' },
  { backgroundColor: '#2d1f5e', color: '#b197fc' },
  { backgroundColor: '#3b1c2e', color: '#e599f7' },
];

export const getColorSchemaByText = (name: string) => {
  const hash = name.split('').reduce((acc, char) => {
    return acc + char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  return COLOR_SCHEMAS[Math.abs(hash) % COLOR_SCHEMAS.length];
};
