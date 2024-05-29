import Memo from "./components/Memo";
import Movie from "./components/Movie";
import { DUMMY } from "./movieDummy";

function App() {
  return (
    <div>
      <div className="app-container">
        {
          DUMMY.results.map((item) => {
            return(
              <Movie 
                title={item.title}
                vote_average={item.vote_average}
                poster_path={item.poster_path}
              />
            ) 
          })
        }
      <Memo></Memo>
      </div>

    </div>
    
  );
}

export default App;
