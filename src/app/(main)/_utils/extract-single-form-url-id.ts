export default function extractSingleFormUrlID(
  inputString: string,
): string | null {
  const parts = inputString.split("/");
  if (parts.length === 2 && parts[0] === "single-form-data") {
    return `${parts[1]}`;
  } else {
    return null; // Return null if the input doesn't match the expected format
  }
}
