import { useParams } from "react-router-dom"

export default function CountryDetail() {
   const { code } = useParams()

   return (
     <div className="p-6">
       <h1 className="text-2xl font-bold">Contry code: {code}</h1>
     </div>
   )
}