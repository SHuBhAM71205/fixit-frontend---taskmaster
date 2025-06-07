import { useContext } from "react"
import React from 'react'
import Currpgcontext from "../context/currpgcontext"
export default function Header() {
    const context=useContext(Currpgcontext)
    const{currpg}=context
  return (
<div className="flex h-10 justify-end  p-3 text-2xl border-b border-amber-800 bg-stone-100">
  {currpg}
</div>
  )
}
