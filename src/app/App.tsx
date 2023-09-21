import {useEffect} from 'react';
import './App.module.css';
import {TodolistsList} from "features/TodolistsList/TodolistsList";
import sl from './App.module.css'
import {useSelector} from "react-redux";
import {AppRootState} from 'app/store';
import {RequestStatus} from 'app/appReducer';
import {Routes, Route} from 'react-router-dom';
import {Login} from 'features/Auth/Login/Login';
import {Error404} from 'common/components';
import {ErrorSnackbar} from 'common/components';
import {authThunks} from 'features/Auth/authReducer';
import {useActions} from 'common/hooks';


export const App = () => {
  const appStatusRequest = useSelector<AppRootState, RequestStatus>(state => state.app.status)
  const error = useSelector<AppRootState, string | null>(state => state.app.error)
  const isInit = useSelector<AppRootState, boolean>(state => state.app.isInit)
  const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)
  const {authLogOut, authMe} = useActions(authThunks)

  useEffect(() => {
    document.title = 'My Todolist'
    authMe()
  }, [])

  const logoutHandler = () => authLogOut()

  return (
    <div className={sl.app}>
      {appStatusRequest === 'loading' &&
        <div className={sl.preloader}>
          <div className={sl.preloader__row}>
            <div className={sl.loader}></div>
          </div>
        </div>
      }
      <div className={isInit ? sl.app : sl.appOpacity}>
        <header className={sl.appHeader}>
          <h1>TODOLIST</h1>
          {isLoggedIn && <div className={sl.navLinks} onClick={logoutHandler}>
            Logout
          </div>}
        </header>

        {error && <ErrorSnackbar error={error}/>}
        <>
          <Routes>
            <Route path={'/'} element={<TodolistsList/>}/>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'*'} element={<Error404/>}/>
          </Routes>
        </>
      </div>
    </div>
  );
}