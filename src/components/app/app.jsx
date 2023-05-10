import { useEffect, useState } from 'react';
import styles from  "./app.module.sass"
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { BurgerConstructorContext } from "../services/burgerConstructorContext";

const API = "https://norma.nomoreparties.space/api/ingredients";
function App() {
  const [ loaded, setLoaded ] = useState(false)
  const [ state, setState ] = useState([])

  useEffect(() => {
    const getData = () => {
      fetch(API)
        .then(res => {
          if ( res.ok ) {
            return res.json();
          }
          return Promise.reject(`Ошибка ${res.status}`)

        })
        .then(data => {
          setState(data.data)
          setLoaded(true)
        })
        .catch(e => {
          console.log(e.messages)
          setLoaded(false)
        });
    }
    getData()
  }, [])

  return (

    <>
      {loaded && (
        <>
          <AppHeader/>
          <main className={styles.app__main}>
            <BurgerIngredients data={state}/>
            <BurgerConstructorContext.Provider value={{state}}>
              <BurgerConstructor />
            </BurgerConstructorContext.Provider>

          </main>
        </>
      )}
    </>


  );
}

export default App;
