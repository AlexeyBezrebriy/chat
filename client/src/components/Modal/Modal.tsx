import { ReactNode } from "react"
import "./Modal.css"

interface IModal {
  active: boolean
  setActive: (active: boolean) => void
  children: ReactNode
}

export const Modal = ({ active, setActive, children }: IModal) => {
  return (
    <div className={active ? "modal active" : "modal"} onClick={() => setActive(false)}>
      <div
        className={active ? "modal__content active" : "modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
