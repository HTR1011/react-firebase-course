import { useEffect, useState } from 'react';
import './App.css';
import { Auth } from './components/auth';
import { auth, db } from "./config/firebase"
//TO CRUD fireStore with fire base, we use these function
import {getDocs, collection, addDoc, deleteDoc, updateDoc, doc} from "firebase/firestore"





function App() {
  const [movieList, setMovieList] = useState([]);

  //NEW MOVIE STATES
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseYear, setNewReleaseYear] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  const movivesCollectionRef = collection(db, "movies");

  //UPDATE TITLE STATE
  const [updatedTitle, setUpdatedTitle] = useState("")


    //READ DATA FROM DATA BASE
    //      SET THE MOVIE LIST
  const getMovieList = async () => {
    try {
      const data = await getDocs(movivesCollectionRef)
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (err){
      console.log("ERROR AT + " + err)
    }
  }

  //DELETE
  const deleteMovie = async(id) =>{
    const movieDoc = doc(db,"movies", id );
    await deleteDoc(movieDoc);
  }

  //UPDATE
  const updateMovie = async(id) =>{
    const movieDoc = doc(db,"movies", id );
    await updateDoc(movieDoc, {title : updatedTitle});
  }


  useEffect (() => {
    getMovieList();
  }, [] )

  //WRITE
  const onSubmitMovie = async () => {
    try{
      await addDoc(movivesCollectionRef, {
        title: newMovieTitle, 
        releaseYear: newReleaseYear,
        receivedAnOscar: isNewMovieOscar,
        userId : auth?.currentUser?.uid,
      });
    } catch(err){
      console.log("ERROR AT " + err)
    }
  }



  return (
    <div className="App"> 
      <Auth />


        <div>
              {/* WRITE AND INSERT A NEW DATA VALUE TO FIRE STORE 
              with couple input as Name - Title - Oscar Check Box */}
          <input placeholder='Movie tittle...' 
          onChange={(e) => setNewMovieTitle(e.target.value)}/>

          <input placeholder='Release Year...' 
          type="number"
          onChange={(e) => setNewReleaseYear(Number(e.target.value))}/>

          <input type='checkbox' 
          //If the movie got oscar, instance check?
          checked = {isNewMovieOscar} 
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}/>
          <label>Received an Oscar</label>

                {/* SUBMIT BUTTON */}
          <button onClick={onSubmitMovie}>Submit</button>
        </div>


        <div>
          {/* DELETE MOVIE WITH DELETE FUNCTION ONCLICK */}
          {movieList.map((movie) => (
            <div>
              <h1 style = {{color: movie.receivedAnOscar ? "green" : "red"}}> {movie.title} </h1>
              <p> Year: {movie.releaseYear} </p>
              <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>

              {/* UPDATE MOVIE WITH UPDATE FUNCTION ONCLICK */}
              <input placeholder='new title...'
              onChange = {(e) => setUpdatedTitle(e.target.value)}/>
              <button onClick = {() => updateMovie(movie.id)}>Update Title</button>
            </div>

          ))}
        </div>


    </div>
  );
}

export default App;