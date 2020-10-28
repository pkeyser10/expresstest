import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {useHistory, useLocation} from 'react-router-dom';
import './App.scss';
import { getJSONData } from "./tools/Toolkit";
import { SamplesData, Sample } from "./tools/Samples.model";

import LoadingOverlay from "./LoadingOverlay/LoadingOverlay";
import SelectedView from "./SelectedView/SelectedView";
import AllView from "./AllView/AllView";
import RandomView from "./RandomView/RandomView";
import SearchView from "./SearchView/SearchView";
import Error from "./Error/Error";

// request url of Web API to retrieve JSON
const RETRIEVE_SCRIPT:string = "http://localhost:8080/portfolio";
// const RETRIEVE_SCRIPT:string = "https://www.seanmorrow.ca/_lessons/portfolioData_JSON.php";
//const RETRIEVE_SCRIPT:string = "https://www.seanmorrow.ca/_lessons/portfolioData_JSON_empty.php";

const App = ():JSX.Element => {
  // ---------------------------------------------- event handers
  const onResponse = (result:SamplesData):void => {
    // data received from Web API
    //console.table(result);
    setSamples(result.samples);
    setLoading(false);
  };

  const onError = (message:string):void => console.log("*** Error has occured during AJAX data transmission: " + message);  

  // ---------------------------------------------- main
  const history:any = useHistory();
  // returns the current location object of the browser - can use to find the current URL (route)
  const route:string = useLocation().pathname;

  // setup state variables
  const [loading, setLoading] = React.useState<boolean>(true);
  const [samples, setSamples] = React.useState<Sample[]>([]);

  // lifecycle hooks
  React.useEffect(():void => {
    // component mounted - loading JSON data when root component mounts
    getJSONData(RETRIEVE_SCRIPT, onResponse, onError);
  }, []);

  return (
    <div className="main">
      
      <LoadingOverlay bgColor="#035074" spinnerColor="#FFFFFF" enabled={loading} />

      <div className="header">
        <div className="header header--title">Portfolio Sampler</div>
        <div className="header header--subtitle">Web App implemented with React.js</div>
      </div>
      
      {
        (samples.length > 0) ? 
          <div className="view">
            <div className="view__radios">
              View: 
              <input name="view" type="radio" value="1" defaultChecked={route === "/selected" || route === "/" ? true : false} onClick={() => history.push("/selected")} /> Selected 
              <input name="view" type="radio" value="2" defaultChecked={route === "/all" ? true : false} onClick={() => history.push("/all")} /> All
              <input name="view" type="radio" value="3" defaultChecked={route === "/random" ? true : false} onClick={() => history.push("/random")} /> Random
              <input name="view" type="radio" value="4" defaultChecked={route === "/search" ? true : false} onClick={() => history.push("/search")} /> Search
            </div> 

            <Switch>
              {/* <SelectedView samples={samples} visible={view === 1 ? true : false} />
              <AllView samples={samples} visible={view === 2 ? true : false} />
              <RandomView samples={samples} visible={view === 3 ? true : false} /> */}

              <Route
                path='/'
                render={():JSX.Element => 
                  <React.Fragment>
                    <SelectedView samples={samples} visible={true} />
                    <AllView samples={samples} visible={false} />
                    <RandomView samples={samples} visible={false} />
                    <SearchView samples={samples} visible={false} />
                  </React.Fragment>}
                exact />

              <Route
                path='/selected'
                render={():JSX.Element => 
                  <React.Fragment>
                    <SelectedView samples={samples} visible={true} />
                    <AllView samples={samples} visible={false} />
                    <RandomView samples={samples} visible={false} />
                    <SearchView samples={samples} visible={false} />
                  </React.Fragment>}
              />

              <Route
                path='/all'
                render={():JSX.Element => 
                  <React.Fragment>
                    <SelectedView samples={samples} visible={false} />
                    <AllView samples={samples} visible={true} />
                    <RandomView samples={samples} visible={false} />
                    <SearchView samples={samples} visible={false} />
                  </React.Fragment>}
              />

              <Route
                path='/random'
                render={():JSX.Element => 
                  <React.Fragment>
                    <SelectedView samples={samples} visible={false} />
                    <AllView samples={samples} visible={false} />
                    <RandomView samples={samples} visible={true} />
                    <SearchView samples={samples} visible={false} />
                  </React.Fragment>}
              />

              <Route
                path='/search'
                render={():JSX.Element => 
                  <React.Fragment>
                    <SelectedView samples={samples} visible={false} />
                    <AllView samples={samples} visible={false} />
                    <RandomView samples={samples} visible={false} />
                    <SearchView samples={samples} visible={true} />
                  </React.Fragment>}
              />

              <Route component={Error} />

            </Switch>

          </div>
        :
          <div className="view">
            <div className="view__radios">
              No portfolio samples available :(
            </div>
          </div>
      }
    
    </div>
  );
}

export default App;