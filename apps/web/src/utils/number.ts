export function padNumber(num: number) {
  return num.toString().padStart(2, '0')
}

export const formatNumberdd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumSignificantDigits: 3
})

export function formatNumber(num: number) {
  // Check if the input is a number
  if (typeof num !== 'number') {
    throw new Error('Input must be a number');
  }

  // Convert the number to a string
  const str = num.toString();

  // Add commas for thousands separation
  const formattedStr = str.replace(/(\d)(?=(\d{3})+$)/g, '$1.');

  return formattedStr == '0' ? 'Miễn phí':  formattedStr + ' đ'
  }