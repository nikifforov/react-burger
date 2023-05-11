import { useEffect, useState } from 'react';
import styles from  "./app.module.sass"
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { BurgerContext } from "../../services/burgerContext";
import { BASE_URL, request } from "../../utils/api"

function App() {
  const [ loaded, setLoaded ] = useState(false)
  const [ state, setState ] = useState([])

  useEffect(() => {
    request(`${BASE_URL}/ingredients`)
      .then((data) => {
        setState(data.data)
        setLoaded(true)
      })
      .catch(e => {
        console.log(e.messages)
        setLoaded(false)
      });
  }, [])

  return (

    <>
      {loaded && (
        <>
        <BurgerContext.Provider value={{state}}>
          <AppHeader/>
          <main className={styles.app__main}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        </BurgerContext.Provider>
        </>
      )}
    </>


  );
}

export default App;
