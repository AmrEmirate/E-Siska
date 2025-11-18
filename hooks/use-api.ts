"use client"

import { useCallback, useState } from "react"
import apiClient from "@/lib/api-client"
import type { AxiosError } from "axios"

interface UseApiOptions {
  onSuccess?: (data: any) => void
  onError?: (error: AxiosError) => void
}

export function useApi<T = any>(options?: UseApiOptions) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<AxiosError | null>(null)

  const request = useCallback(
    async (method: "get" | "post" | "put" | "delete", endpoint: string, payload?: any) => {
      setLoading(true)
      setError(null)

      try {
        const response = await apiClient[method](endpoint, payload)
        setData(response.data)
        options?.onSuccess?.(response.data)
        return response.data
      } catch (err) {
        const axiosError = err as AxiosError
        setError(axiosError)
        options?.onError?.(axiosError)
        throw axiosError
      } finally {
        setLoading(false)
      }
    },
    [options],
  )

  return {
    data,
    loading,
    error,
    get: (endpoint: string) => request("get", endpoint),
    post: (endpoint: string, payload: any) => request("post", endpoint, payload),
    put: (endpoint: string, payload: any) => request("put", endpoint, payload),
    delete: (endpoint: string) => request("delete", endpoint),
  }
}
