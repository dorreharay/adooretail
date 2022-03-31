import API from "@api";

const types = [
  {
    type: 'products',
    request: API.getProducts,
  }
]

export async function useRequest(type, payload) {
  let data, error

  const request = types.find(item => item.type === type).request

  try {
    if (!request) throw new Error('Invalid request type')

    data = await request(payload)
  } catch (err) {
    error = err.message
  } finally {
    return { data, error }
  }
}