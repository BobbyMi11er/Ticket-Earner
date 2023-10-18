import './styles/App.scss';
import { usePlayable } from './hooks/usePlayable';
import Game from './components/Game';
import {ThemeProvider} from '@mui/material/styles';
import {theme} from './theme';
import Opening from './components/Opening';
import { useState } from 'react';


function App() {
  const playable = usePlayable();

  const [loadGame, setLoadGame] = useState(false);

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
          <Opening playable={playable} setLoadGame={setLoadGame} />
          {
            loadGame ? <Game /> : <div />
          }
      </div>
    </ThemeProvider>
  );
}

export default App;
