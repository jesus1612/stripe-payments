import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [concepts, setConcepts] = useState([]);

  let navigate = useNavigate();
  const routeChange = () =>{
    let path = `/payment`;
    navigate(path);
  }

  return (
    <>
      <h5>Elige el concepto a pagar</h5>
      <select name="concepto" defaultValue="  ">
        {
          concepts.map(concept => (
        <option value="someOption">{ concept.metadata.concepto }</option>

          ))
        }
        <option value="RINC">Reinscripción</option>
        <option value="CRED">Credencial</option>
      </select>
      <button onClick={routeChange}>Pagar</button>
    </>
  );
}

export default Home;