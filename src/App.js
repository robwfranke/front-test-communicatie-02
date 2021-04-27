import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {

    function handleClickHello() {
        console.log("handleclick hello")
        Hello();

    }




    function handleClickJwt() {
        console.log("handleclick Jwt")
        Jwt();

    }



    const [jwt,setJwt]=useState()
    const [error, setError] = useState("");
const [baseControllerValue,SetBaseControllerValue]=useState("")




    async function Hello() {
        try {
            console.log("Start try/catch hello")

               const result = await axios.get("http://localhost:8080/");
            console.log(result.data)
            SetBaseControllerValue(result.data)

        } catch (error) {
            // setError(error.message);
            setError("Er is iets mis gegaan met het ophalen");
            console.error(error);
        }

    }





    async function Jwt() {
        try {
            console.log("Start try/catch jwt")

            const dataJwt = JSON.stringify(
                {
                    username: 'peter',
                    password: 'password'
                }
        );

            console.log("dataJwt=", dataJwt)
            const result = await axios.post("http://localhost:8080/authenticate", dataJwt);
            console.log("result jwt =", result)
            console.log("result.status", result.status)
            console.log("jwt",result.data.jwt)
            setJwt(result.data.jwt)
            console.log("jwt",jwt)

        } catch (error) {
            // setError(error.message);
            setError("Er is iets mis gegaan met het ophalen");
            console.error(error);
        }

    }



    return (

        <>



            <div className="base">
                <button
                    type="button"
                    onClick={handleClickHello}
                >
                    BaseController
                </button>
                <span>{baseControllerValue}</span>
            </div>


            <div className="jwt">
                <button
                    type="button"
                    onClick={handleClickJwt}
                >
                    Get jwt token
                </button>
                {/*<span>{jwt}</span>*/}
            </div>




        </>

    );
}

export default App;
