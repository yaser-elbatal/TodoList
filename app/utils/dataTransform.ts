import type { OriginalDataItem, TransformedDataItem } from "../types"

/**
 * Transforms the original JSON data into the specified output format
 * @param data - Array of original data items
 * @returns Array of transformed data items
 */
export function transformData(data: OriginalDataItem[]): TransformedDataItem[] {
  return data.map((item) => {
    // Create full name by combining first_name and last_name
    const fullName = item.last_name ? `${item.first_name} ${item.last_name}` : item.first_name

    // Convert power from string to number
    const power = Number.parseInt(item.power, 10)

    // Parse birth_date from DD.MM.YYYY format to Date object
    const [day, month, year] = item.birth_date.split(".")
    const birthDate = new Date(Number.parseInt(year), Number.parseInt(month) - 1, Number.parseInt(day))

    return {
      fullName,
      username: item.username,
      power,
      birthDate,
    }
  })
}

/**
 * Calculates the arithmetic mean of power fields in the JSON data
 * @param data - Array of original data items
 * @returns The arithmetic mean of power values
 */
export function calculateArithmeticMean(data: OriginalDataItem[]): number {
  if (data.length === 0) {
    return 0
  }

  // Convert power strings to numbers and sum them
  const totalPower = data.reduce((sum, item) => {
    return sum + Number.parseInt(item.power, 10)
  }, 0)

  // Calculate arithmetic mean
  const arithmeticMean = totalPower / data.length

  return arithmeticMean
}

/**
 * Utility function to demonstrate the transformation and calculation
 * This function can be used for testing or demonstration purposes
 */
export function demonstrateTransformation(data: OriginalDataItem[]): void {
  console.log("=== Original Data ===")
  console.log(JSON.stringify(data, null, 2))

  console.log("\n=== Transformed Data ===")
  const transformed = transformData(data)
  console.log(JSON.stringify(transformed, null, 2))

  console.log("\n=== Arithmetic Mean of Power Values ===")
  const mean = calculateArithmeticMean(data)
  console.log(`Arithmetic Mean: ${mean}`)
  console.log(`Rounded to 2 decimal places: ${mean.toFixed(2)}`)
}
