import "../css/statisticsview.css";
import Statistics from "../components/statistics";
import RootHead from "../components/roothead";


function StatisticsView(props) {

    return (
      <div className="statistics-view">
          {/*<UserHead/>*/}
          <RootHead profile={props.profile} closeWsConnection={props.closeWsConnection}/>
          <Statistics

          />
      </div>
    );
}

export default StatisticsView;
