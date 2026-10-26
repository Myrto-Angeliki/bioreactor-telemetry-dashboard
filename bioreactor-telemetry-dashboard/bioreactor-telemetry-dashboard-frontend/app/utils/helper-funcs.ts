

export async function fetchData<T>(request: string): Promise<T> {
  const response = await fetch(request);
  return await response.json();
}

