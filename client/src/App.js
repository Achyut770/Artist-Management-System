import './App.css';
import Navbar from './components/common/Navbar';
import AuthProvider from './context/AuthProvider';
import Router from './routes';

function App() {
  return (
    <AuthProvider>
      <section className='container'>
        <Navbar />
        <div className='routes'>
          <Router />
        </div>

      </section>

    </AuthProvider>
  );
}

export default App;
