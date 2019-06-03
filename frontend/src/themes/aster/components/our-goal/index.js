import React from "react";
import steveTeam from 'themes/aster/assets/images/steve-team.jpg';
import asterTeam from 'themes/aster/assets/images/aster-team.jpg';
import './stylesheet.css'

class OurGoal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ui-aster-goal">
        <div className='ui-title-panel'>
          <h3>~ Our goal ~</h3>
        </div>
        <p className='desc'>
          Your idea, our solutions. Together, we are one team.
        </p>
        <p className='desc last'>
          Together, We rewrite the next chapter of business success.
        </p>
        <div className='ui-aster-outer-panel'>
          <div className='ui-aster-content'>

            <div className='ui-aster-content-item'>
              <div>
                <div>
                  <img src={steveTeam}/>
                </div>
              </div>
            </div>
            <div className='ui-aster-content-item align-left'>
              <div>
                <div>
                  <img src={asterTeam}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="team-slogan">
          <div>

            we are one team

          </div>
        </div>
      </div>
    );
  }
}

export default OurGoal;

