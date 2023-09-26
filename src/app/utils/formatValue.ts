export const formatValue = (value: string): string => {
  if (value.length <= 4) {
    return value;
  }

  if (value.includes('.')) {
    const [beforeDot, afterDot] = value.split('.');
    return `${beforeDot}.${afterDot.slice(0, 4)}...`;
  }

  return value.slice(0, 4) + '...';
};
