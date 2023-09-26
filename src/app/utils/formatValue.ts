export const formatValue = (value: string): string => {
  if (value.length <= 4) {
    return value;
  }

  if (value.includes('.')) {
    const [beforeDot, afterDot] = value.split('.');
    return afterDot.length > 4 ? `${beforeDot}.${afterDot.slice(0, 4)}...` : value;
  }

  return `${value.slice(0, 4)}...`;
};
