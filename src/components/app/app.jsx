import { useEffect } from 'react';
import styles from  "./app.module.sass"
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import { useDispatch, useSelector } from "react-redux";
import { getBurgerIngredients } from "../../services/actions/get-burger-ingredients-actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend"

function App() {
  const dispatch = useDispatch();
  const isLoading  = useSelector(store => store.burgerIngredients.isLoading);

  useEffect( () => {
    dispatch(getBurgerIngredients())
  }, [dispatch] );


  return (

    <>
      {!isLoading && (
        <>
          <AppHeader/>
          <main className={styles.app__main}>
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          </main>
        </>
      )}
    </>


  );
}

export default App;
