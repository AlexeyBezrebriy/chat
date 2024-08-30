export const messageConvertTime = (timestamp: string) => {
  const date = new Date(timestamp)

  const formattedDate = date.toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  })

  return formattedDate
}

export const chatConvertTime = (timestamp: string) => {
  const date = new Date(timestamp)

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  }

  return new Intl.DateTimeFormat("en-US", options).format(date)
}
