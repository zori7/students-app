interface ApiClient {
  fetch: <T = any>(uri: string, query?: Array<Array<string>>) => Promise<T>
}

export const apiClient: ApiClient = {
  async fetch(uri, query) {
    const normalizedUri = uri.trimLeft()
    const queryString = (new URLSearchParams(query || {})).toString()

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_BASE_ID}/${normalizedUri}?${queryString}`,
      {
        headers: {
          "Authorization": `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
      },
    )

    const jsonResponse = await response.json()

    if (!response.ok) {
      const errorMessage = jsonResponse.error.message

      alert(errorMessage)
      throw new Error(errorMessage)
    }

    return jsonResponse
  },
}
