import React, { lazy } from "react";
import { Switch, Route } from "react-router-dom";
import StudyRoute from "./StudyRoute";
const DetailBeginer = lazy(() =>
  import("../../../features/DetailRoute/DetailBeginer")
);
const DetailFrontEnd = lazy(() =>
  import("../../../features/DetailRoute/DetailFrontEnd")
);
const DetailBackEnd = lazy(() =>
  import("../../../features/DetailRoute/DetailBackEnd")
);

const DetailMobile = lazy(() =>
  import("../../../features/DetailRoute/DetailMobile")
);
function NestedRouter() {
  return (
    <>
      <Switch>
        <Route exact path="/studyRoute">
          <StudyRoute />
        </Route>
        <Route exact path="/studyRoute/back-end">
          <DetailBackEnd />
        </Route>
        <Route exact path="/studyRoute/nhap-mon">
          <DetailBeginer />
        </Route>
        <Route exact path="/studyRoute/front-end">
          <DetailFrontEnd />
        </Route>
        <Route exact path="/studyRoute/mobile-app">
          <DetailMobile />
        </Route>
      </Switch>
    </>
  );
}

export default NestedRouter;
