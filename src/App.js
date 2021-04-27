import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

function App() {

    function handleClickHello() {
        console.log("handleclick hello")
        Hello();
    }


    function handleClickJwt() {
        console.log("handleclick Jwt")
        Jwt();
    }


    function handleClickPeter() {
        console.log("handleclick Peter")
        Peter();
    }


    const [jwtToken,SetJwtToken]=useState()
    const [error, setError] = useState("");
    const [baseControllerValue, SetBaseControllerValue] = useState("")
    const [adminResponse,setAdminResponse]=useState()


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

            // const dataJwt = JSON.stringify(
            const dataJwt=
                {
                    username: "peter",
                    password: "password"
                }
            ;



            console.log("dataJwt=", dataJwt)
            const result = await axios.post("http://localhost:8080/authenticate", dataJwt);
            console.log("result jwt =", result)
            console.log("result.status", result.status)
            console.log("jwt", result.data.jwt)
            SetJwtToken(result.data.jwt)

        } catch (error) {
            // setError(error.message);
            setError("Er is iets mis gegaan met het ophalen");
            console.error(error);
        }

    }





    async function Peter() {

        console.log("Start try/catch Peter")
        console.log("jwtkey: ",jwtToken)

        //we hebben de jwt token nodig om daaruit de user id te halen
        //Hier gebruiken we de package npm install jwt-deco
        //en importeren!!!
        const decoded = jwt_decode(jwtToken);
        // const userId = decoded.sub;
        const userId= decoded.sub
        console.log('AuthContext jwt DECODED', decoded);
        console.log("userId: ",userId)
       const x = "Bearer " + jwtToken
        console.log(x)

        try {

            const response = await axios.get(`http://localhost:8080/users/${userId}`, {
                //    authorisaton header, object key bevat -, daarom ""
                headers: {
                    "Content-Type": "application/json",
                    // Authorization: `Bearer ${jwtToken}`, /*BACK TICK!!!!!*/
                    Authorization: `{x}`
                }
            })


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
                <span>{jwtToken}</span>
            </div>



            <div className="peter">
                <button
                    type="button"
                    onClick={handleClickPeter}
                >
                    Get user Peter
                </button>
                <span></span>
            </div>


        </>

    );
}

export default App;
