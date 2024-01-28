import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Container, Switch } from '@mui/material';
import Header from './components/Header/Header';
import Definitions from './components/Definitions/Definitions';
import { grey } from '@mui/material/colors';

const App = () => {
  const [meanings, setMeanings] = useState([]);
  const [word, setWord] = useState('');
  const [category, setCategory] = useState('en');
  const [LightMode, setLightMode] = useState(false);

  const dictionaryApi = async () => {
    try {
      const { data } = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
      );
      setMeanings(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dictionaryApi();
  }, [word, category]);

  return (
    <div
      className="App"
      style={{
        height: '100vh',
        backgroundColor: LightMode ? "#fff" : '#282c34',
        color: LightMode ? "black" : 'white',
        transition: "all 0.5s linear",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          justifyContent: "space-evenly",
        }}
      >
        <div
          style={{ position: 'absolute', top: 0, right: 15, paddingTop: 10 }}
        >
          <span>{LightMode?"Dark" : "Light"} Mode</span>
          <Switch
            checked={LightMode}
            onChange={() => setLightMode(!LightMode)}
            sx={{
              switchBase: {
                color: grey[50],
                '&$checked': {
                  color: grey[900],
                },
                '&$checked + $track': {
                  backgroundColor: grey[500],
                },
              },
              checked: {},
              track: {},
            }}
          />
        </div>

        <Header
          category={category}
          setCategory={setCategory}
          word={word}
          setWord={setWord}
          LightMode={LightMode}
        />
        {meanings && (
          <Definitions meanings={meanings} word={word} category={category} />
        )}
      </Container>
    </div>
  );
};

export default App;
