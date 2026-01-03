import DarkSchema from "@/composnents/DarkShema"
import DarkShema from "@/composnents/DarkShema"
import Header from "@/composnents/Header/header"
import { Fragment } from "react/jsx-runtime"



const layout = ({
  children,
}: { children: React.ReactNode }) => {
  return (
    <DarkSchema
    >
      <Fragment >
        <Header  title="Team" border/>
        {children}
      </Fragment>
    </DarkSchema>
  )
}

export default layout