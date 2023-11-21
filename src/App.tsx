import Footer from './components/Footer';
import Header from './components/Header';
import Main from './pages/Main';
// import './App.css';
import {Routes, Route} from 'react-router-dom';
import EventDetail from './pages/EventDetail';
import NotFound from './pages/NotFound';
import SearchList from './pages/SearchList';
import EventList from './pages/EventList';
import useData from './customHook/useData';
import { dataContext } from './context/dataContext';
import ScrollToTop from './components/ScrollToTop';
import { GoTopBtn } from './components/buttons/GoTopBtn';

function App() {
  const [eventList] = useData();
  return (
    <dataContext.Provider value={eventList}>
    <div className="App">
      <ScrollToTop />
      <Header/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/eventList/:pageId" element={<EventList/>}/>
          <Route path="/eventDetail" element={<EventDetail/>}/>
          <Route path="/search" element={<SearchList/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      <Footer/>
      <GoTopBtn />
    </div>
    </dataContext.Provider>
  );
}

export default App;
