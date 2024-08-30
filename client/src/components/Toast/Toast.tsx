import { useEffect } from "react"
import "./Toast.css"

interface ToastProps {
  message: string
  show: boolean
  onClose: () => void
}

export const Toast = ({ message, show, onClose }: ToastProps) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [show])

  return <div className={`toast ${show ? "show" : ""}`}>{message}</div>
}
