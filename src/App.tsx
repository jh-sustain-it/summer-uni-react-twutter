import FeedContainer from "./components/FeedContainer";
import { GQLProvider } from "./RelayEnvironment";

function App() {
  return (
    <GQLProvider>
      <FeedContainer />
    </GQLProvider>
  );
}

export default App;
