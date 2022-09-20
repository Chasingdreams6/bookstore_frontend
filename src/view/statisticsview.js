import "../css/statisticsview.css";
import UserHead from "../components/head";
import Statistics from "../components/statistics";
import RootHead from "../components/roothead";


function StatisticsView(props) {

    return (
      <div className="statistics-view">
          {/*<UserHead/>*/}
          <RootHead profile={props.profile}/>
          <Statistics

          />
      </div>
    );
}

export default StatisticsView;
