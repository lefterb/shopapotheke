import { ISagaAPIResponse, SettingsData } from "../../types"

// export const getRepositories = async (
//   querySettings: SettingsData
// ): Promise<ISagaAPIResponse> => {
//   const result = await fetch("/get-respositories", {
//     method: "POST",
//     body: JSON.stringify(querySettings),
//     headers: {
//       "Content-Type": "application/json"
//     }
//   })

//   if (result.status !== 200) {
//     const { error } = await result.json()
//     return {
//       success: false,
//       error
//     }
//   }

//   const { data } = await result.json()
//   return {
//     success: true,
//     data
//   }
// }

export async function getRepositories(
  querySettings: SettingsData
): Promise<ISagaAPIResponse> {
  const result = await fetch("/get-respositories", {
    method: "POST",
    body: JSON.stringify(querySettings),
    headers: {
      "Content-Type": "application/json"
    }
  })

  if (result.status !== 200) {
    const { error } = await result.json()
    return {
      success: false,
      error
    }
  }

  const { data } = await result.json()
  return {
    success: true,
    data
  }
}

export default {
  getRepositories
}
