import logo from './logo.svg';
import './App.css';
import CityTable from './components/CityTable';
import ApolloAppProvider from '../src/components/ApolloProvider';

function App() {
  return (
    <ApolloAppProvider>
   <div>
    <CityTable />
    </div>
    </ApolloAppProvider>
  );
}

export default App;
