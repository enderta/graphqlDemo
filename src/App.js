import ApolloAppProvider from '../src/components/ApolloProvider';
import Pages from './components/Pages';

function App() {
  return (
    <ApolloAppProvider>
   <div>
   <Pages />
    </div>
    </ApolloAppProvider>
  );
}

export default App;
