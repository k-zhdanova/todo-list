import './App.css';
import { TodoList } from './modules/TodoList';
import { Header } from './modules/Header';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Header />
      <TodoList />
      <ToastContainer />
    </div>
  );
}

export default App;
