import React from "react";
import {connect} from 'react-redux';
import './stylesheet.css'

class AsterLayout extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ui-aster-client-feedback parallax">

        <div className='ui-feedback-panel'>
          <div className='ui-feedback-content'>
            <h3 className='title'>
              <span>Our Clients' Feedback</span>
            </h3>

            <div className='feedback-content'>
              <div className='item'>
                <p>
                  The working system of Universal Web expert is really systematic. Its functions from all sides are not
                  only great but also fast. It shows its capacity and capability in work profoundly. It satisfies the
                  clients fruitfully meeting up their demand according to their sweet will. So, the clients show their
                  great urge to make their work complete from this reliable institution.
                </p>
                <div className='feedback-by'>
                  Abdul Ahad <span className='position'> / Chairman</span>
                </div>
              </div>

              <div className='item'>
                <p>
                  As a client, I would like to uphold my opinion about Universal Web Expert. This institution has
                  achieved the highest peak of satisfaction in case of comment from the clients. I myself express the
                  full contentment to this institution as I am absolutely pleased getting service from this prolific
                  institution.
                </p>
                <div className='feedback-by'>
                  Dabid Gain <span className='position'>/ Managing Director</span>
                </div>
              </div>

              <div className='item'>
                <p>
                  Universal Web Expert is undoubtedly reliable and creative in case of Web design and development. The
                  experience of the programmers associated with this institution in outsourcing is really praiseworthy.
                  From the very beginning of this institution, they have successfully gained positive attitude where
                  works are completed timely and perfectly maintaining standard. It also ensures the proper solution of
                  works.
                </p>
                <div className='feedback-by'>
                  Dabid Gain <span className='position'>/ CEO</span>
                </div>
              </div>

              <div className='item'>
                <p>
                  Universal Web Expert is certainly one of the renowned web design companies. I appreciate of this
                  company from the core of my heart. The reason why I cannot help making good comment about this
                  institution is that it has completed a work of mine satisfactorily maintaining quality, time and
                  reasonable price. Thank automatically comes for this institution from my heart. I also would like to
                  highly recommend the clients of the whole world to make their work of web design, wordpress theme
                  development and so on from this company. I wish a successive future of this institution.
                </p>
                <div className='feedback-by'>
                  Dabid Gain <span className='position'>/ ANS Clothing Limited</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(AsterLayout);

