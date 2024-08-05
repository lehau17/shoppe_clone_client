import Footer from "../../components/Footer"

interface Props {
  children: React.ReactNode
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}
