import { useEffect, useState } from 'react';
import styles from  "./app.module.sass"
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
// import { getData } from "../../utils/api";

const API = "https://norma.nomoreparties.space/api/ingredients";
function App() {
  const [ state, setState ] = useState([])

  useEffect(() => {
    const getData = () => {
      fetch(API)
        .then(res => {
          if ( !res.ok ) {
            console.log(res.status);
          } else {
            return res.json();
          }
        })
        .then(data => setState(data.data ))
        .catch(e => console.log(e.messages));
    }
    getData()
  }, [])

  return (
    <>
      <AppHeader/>
      <main className={styles.app__main}>
        <BurgerIngredients data={state}/>
        <BurgerConstructor data={state}/>
      </main>
    </>
  );
}

export default App;
