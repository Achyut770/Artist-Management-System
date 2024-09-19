import './App.css';
import Navbar from './components/common/Layouts/Navbar';
import AuthProvider from './context/AuthProvider';
import Router from './router/routes';

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
