import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {

    function handleClick() {
        console.log("handleclick")
        fetchDataBooks();

    }


    function handleClickSingleBook() {
        console.log("handleclick single book")
        fetchDataJwt();

    }


    function handleClickJwt() {
        console.log("handleclick post book")
        PostBook();

    }

    function handleClickDeleteBook() {
        console.log("handleclick delete book")
        DeleteBook();

    }


    const [books, setBooks] = useState([]);/*array van books*/
    const [single, setSingle] = useState('')
    const [jwt,setJwt]=useState()
    const [error, setError] = useState("");
    const [halen, ToggleHalen] = useState(false)


    async function fetchDataBooks() {
        try {
            console.log("Start try/catch")
            const result = await axios.get("http://localhost:8080/books")
            setBooks(result.data)
            // console.log("result",result)
            // console.log("books",books)

        } catch (error) {
            // setError(error.message);
            setError("Er is iets mis gegaan met het ophalen");
            console.error(error);
        }
    }

    async function fetchDataJwt() {
        try {
            console.log("Start try/catch Single")
            const {data: {title}} = await axios.get("http://localhost:8080/books/1")
            console.log("title =", title)
            setSingle(title);


            console.log("result singlebook", single)

        } catch (error) {
            // setError(error.message);
            setError("Er is iets mis gegaan met het ophalen");
            console.error(error);
        }


    }


    async function PostBook() {
        try {
            console.log("Start try/catch jwt")

            const dataJwt = {
               username: 'peter',
                password:'password'

            }

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

    async function DeleteBook() {
        try {
            console.log("Start try/catch Delete")
            const result = await axios.delete("http://localhost:8080/books/2")
            console.log("result post =", result)
            console.log("result.status", result.status)


        } catch (error) {
            // setError(error.message);
            setError("Er is iets mis gegaan met het ophalen");
            console.error(error);
        }


    }


    return (

        <>
            <div className="books">
                <ul>

                    {/* loader kan ook met button (niets met deze app te maken, gewoon voorbeeld*/}

                    <button
                        type="button"
                        onClick={handleClick}
                    >
                        Haal data op
                        {/*{loading ?<LoadingIcon className="loader"/>:<>Versturen</>}*/}
                    </button>
                </ul>

                <p>lijst met boeken, evt ternaire operator gebruiken</p>
                <p>aantal boeken {books.length}</p>
                {books && books.map((book) => {
                    console.log("book titel", book.title)
                    return <li key={book.id}>
                        <span> boek {book.title}</span>
                    </li>
                })}
            </div>


            <div className="book">
                <button
                    type="button"
                    onClick={handleClickSingleBook}
                >
                    Haal data van 1 book op
                </button>
                <p>opgevraagd boek {single}</p>
            </div>

            <div className="post">
                <button
                    type="button"
                    onClick={handleClickJwt}
                >
                    Get jwt token
                </button>
                {/*<span>{jwt}</span>*/}
            </div>


            <div className="delete">

                <button
                    type="button"
                    onClick={handleClickDeleteBook}
                >
                    delete book
                </button>
            </div>


        </>

    );
}

export default App;
