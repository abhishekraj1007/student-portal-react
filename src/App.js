import './App.css';
import { Toaster } from 'react-hot-toast';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const theme = createTheme();

function App() {
  const content = useRoutes(routes);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster position="top-center" />
        {content}
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
