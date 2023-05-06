/*eslint-disable*/
import Home from './component/Home';
import PlayerName from './component/PlayerName';
import GenerateMatch from './component/GenerateMatch';
import MatchPage from './component/MatchPage';
import PlayersRank from './component/PlayersRank';
import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playerName" element={<PlayerName />} />
          <Route path="/generateMatch" element={<GenerateMatch />} />
          <Route path="/matchPage" element={<MatchPage />} />
          <Route path="/playersRank" element={<PlayersRank />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
