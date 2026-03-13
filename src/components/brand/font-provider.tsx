interface FontProviderProps {
  families: string[]
}

export function FontProvider({ families }: FontProviderProps) {
  if (families.length === 0) return null

  const params = families
    .map((f) => {
      const encoded = encodeURIComponent(f)
      return `family=${encoded}:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400`
    })
    .join("&")

  return (
    <link
      rel="stylesheet"
      href={`https://fonts.googleapis.com/css2?${params}&display=swap`}
    />
  )
}
