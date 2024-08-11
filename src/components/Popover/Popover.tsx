import { FloatingArrow, arrow, useFloating, FloatingPortal, offset, shift } from "@floating-ui/react"
import { useId, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Props {
  children: React.ReactNode
  renderElement: React.ReactElement
  className?: string
  initialOpen?: boolean
}
export default function Popover({ children, renderElement, initialOpen }: Props) {
  const id = useId()
  const [openLanguage, setOpenLanguage] = useState(initialOpen || false)
  const arrowRef = useRef(null)
  const { refs, context, strategy, x, y } = useFloating({
    middleware: [
      offset(6),
      shift(),
      arrow({
        element: arrowRef
      })
    ]
  })
  const openMenuLanguage = () => setOpenLanguage(true)
  const closeMenuLanguage = () => setOpenLanguage(false)
  return (
    <div
      id={id}
      className='flex items-center mr-2'
      ref={refs.setReference}
      onMouseEnter={openMenuLanguage}
      onMouseLeave={closeMenuLanguage}
    >
      {children}
      <AnimatePresence>
        <FloatingPortal>
          {openLanguage && (
            <motion.div
              className=' flex flex-col bg-white text-black py-4 pl-3 text-[16px] border border-gray-300 shadow-sm flex-shrink-0'
              initial={{ opacity: 0, transform: "scale(0)" }}
              animate={{ opacity: 1, transform: "scale(1)" }}
              exit={{ opacity: 0, transform: "scale(0)" }} // Add exit animation
              transition={{ duration: 0.2 }}
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: "max-content"
              }}
            >
              <FloatingArrow ref={arrowRef} context={context} fill='white' />
              {renderElement}
            </motion.div>
          )}
        </FloatingPortal>
      </AnimatePresence>
    </div>
  )
}
