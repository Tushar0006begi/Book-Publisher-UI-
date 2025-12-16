const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api"

export const api = {
  // Author endpoints
  author: {
    register: async (data: { name: string; email: string; password: string; bio?: string }) => {
      const response = await fetch(`${API_BASE_URL}/author/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      return response.json()
    },

    login: async (data: { email: string; password: string }) => {
      const response = await fetch(`${API_BASE_URL}/author/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      return response.json()
    },

    submitManuscript: async (formData: FormData, token: string) => {
      const response = await fetch(`${API_BASE_URL}/author/manuscripts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      })
      return response.json()
    },

    getManuscripts: async (token: string) => {
      const response = await fetch(`${API_BASE_URL}/author/manuscripts`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return response.json()
    },

    getProfile: async (token: string) => {
      const response = await fetch(`${API_BASE_URL}/author/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return response.json()
    },

    getRoyalties: async (token: string) => {
      const response = await fetch(`${API_BASE_URL}/author/royalties`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return response.json()
    },
  },

  // Publisher endpoints
  publisher: {
    register: async (data: { name: string; email: string; password: string; company_name?: string }) => {
      const response = await fetch(`${API_BASE_URL}/publisher/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      return response.json()
    },

    login: async (data: { email: string; password: string }) => {
      const response = await fetch(`${API_BASE_URL}/publisher/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      return response.json()
    },

    getSubmissions: async (token: string, status?: string) => {
      const url = status
        ? `${API_BASE_URL}/publisher/submissions?status=${status}`
        : `${API_BASE_URL}/publisher/submissions`
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return response.json()
    },

    updateSubmissionStatus: async (id: number, status: string, token: string) => {
      const response = await fetch(`${API_BASE_URL}/publisher/submissions/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      })
      return response.json()
    },

    getAnalytics: async (token: string) => {
      const response = await fetch(`${API_BASE_URL}/publisher/analytics`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return response.json()
    },

    getBooks: async (token: string) => {
      const response = await fetch(`${API_BASE_URL}/publisher/books`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      return response.json()
    },

    createBook: async (data: any, token: string) => {
      const response = await fetch(`${API_BASE_URL}/publisher/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
      return response.json()
    },

    updateBook: async (id: number, data: any, token: string) => {
      const response = await fetch(`${API_BASE_URL}/publisher/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })
      return response.json()
    },
  },
}

// In production, these should use proper authentication from a context/session
export const submitManuscript = async (data: any, file: File) => {
  const formData = new FormData()
  formData.append("manuscript", file)
  formData.append("title", data.title)
  formData.append("category", data.category)
  formData.append("synopsis", data.synopsis)
  formData.append("word_count", data.wordCount.toString())
  formData.append("status", data.status)
  if (data.isbn) formData.append("isbn", data.isbn)

  const response = await fetch(`${API_BASE_URL}/author/manuscripts`, {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to submit manuscript")
  }

  return response.json()
}

export const getSubmissions = async (status?: string) => {
  const url = status
    ? `${API_BASE_URL}/publisher/submissions?status=${status}`
    : `${API_BASE_URL}/publisher/submissions`

  const response = await fetch(url)

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to fetch submissions")
  }

  return response.json()
}

export const updateSubmissionStatus = async (id: number, status: string) => {
  const response = await fetch(`${API_BASE_URL}/publisher/submissions/${id}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || "Failed to update submission status")
  }

  return response.json()
}
