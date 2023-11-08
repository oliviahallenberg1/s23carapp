
//import './App.css'
import Carlist from './Carlist'
import { AppBar, Typography } from "@mui/material";
// import { Typography } from '@mui/material/styles/createTypography';

function App() {

  return (
    <>
      <AppBar
        position="static">
        <Typography variant="h6"
          color="black">
          Carshop
        </Typography>
        <Carlist />
      </AppBar>
    </>
  )
}

export default App
