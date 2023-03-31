import React from 'react';
import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import {Container, CssBaseline} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import Register from "./features/users/Register";
import Login from "./features/users/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import {useAppSelector} from "./app/hooks";
import {selectUser} from "./features/users/usersSlice";
import CocktailForm from "./features/cocktails/components/CocktailForm";
import Cocktails from "./features/cocktails/Cocktails";
import CocktailsByUser from "./features/cocktails/components/CocktailsByUser";
import FullCocktailItem from "./features/cocktails/components/FullCocktailItem";

function App() {
  const user = useAppSelector(selectUser);

  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Cocktails/>}/>
            <Route path="/new-cocktail" element={<ProtectedRoute isAllowed={Boolean(user)}><CocktailForm/></ProtectedRoute>}/>
            <Route path="/my-cocktails" element={<ProtectedRoute isAllowed={Boolean(user)}><CocktailsByUser/></ProtectedRoute>}/>
            <Route path="/cocktails/:id" element={<FullCocktailItem/>}/>
            <Route path="/*" element={<h1>Not Found! This page does not exist!</h1>}/>
          </Routes>
        </Container>
      </main>
    </>
  );
}

export default App;
