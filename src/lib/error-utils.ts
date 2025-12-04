/**
 * Helper function to extract error message from API response
 * This will get the actual error message from backend to display in toast
 */
export function getErrorMessage(
  error: any,
  fallback: string = "Terjadi kesalahan"
): string {
  // Check for backend error message in response
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  // Check for validation errors array
  if (
    error?.response?.data?.errors &&
    Array.isArray(error.response.data.errors)
  ) {
    return error.response.data.errors
      .map((e: any) => e.msg || e.message)
      .join(", ");
  }

  // Check for single error string
  if (error?.response?.data?.error) {
    return error.response.data.error;
  }

  // Check for axios error message
  if (error?.message) {
    return error.message;
  }

  return fallback;
}

/**
 * Get error title based on status code
 */
export function getErrorTitle(error: any): string {
  const status = error?.response?.status;

  switch (status) {
    case 400:
      return "Validasi Gagal";
    case 401:
      return "Tidak Terautentikasi";
    case 403:
      return "Akses Ditolak";
    case 404:
      return "Data Tidak Ditemukan";
    case 409:
      return "Data Duplikat";
    case 422:
      return "Data Tidak Valid";
    case 500:
      return "Kesalahan Server";
    default:
      return "Gagal";
  }
}
