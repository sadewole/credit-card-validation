const trimPattern = (value, pattern) => {
  if (value.endsWith(pattern)) {
    let trimmedStr = value.slice(0, value.length - pattern.length);
    return trimmedStr;
  }

  return value;
};

export function cardNumberFormatter(
  oldValue,
  newValue
) {
  const pattern = ' ';
  // user is deleting so return without formatting
  if (oldValue.length > newValue.length) {
    return trimPattern(newValue, pattern);
  }

  return trimPattern(
    newValue
      .replace(/\W/gi, '')
      .replace(/(.{4})/g, '$1 ')
      .slice(0, 19),
    pattern
  );
}

export function expirationDateFormatter(
  oldValue,
  newValue
) {
  // user is deleting so return without formatting
  if (oldValue.length > newValue.length) {
    return trimPattern(newValue, '/');
  }

  return trimPattern(
    newValue
      .replace(/\W/gi, '')
      .replace(/(.{2})/g, '$1/')
      .slice(0, 5),
    '/'
  );
}
