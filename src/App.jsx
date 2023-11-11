
//import './App.css'
import Carlist from './components/Carlist'
import { AppBar, Typography } from "@mui/material";
// import { Typography } from '@mui/material/styles/createTypography';

function App() {

  return (
    <>
      <AppBar
        position="absolute">
        <Typography variant="h6">
          Carshop
        </Typography>
        <Carlist />
      </AppBar>
    </>
  )
}

export default App
