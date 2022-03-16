import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap, faBook, faUserGroup, faUserTie } from '@fortawesome/free-solid-svg-icons';

class Home extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            enseignants: [],
            formations:  [],
            candidats: [],
            promotions: []
    
        }
        
    }

    componentDidMount() {
        axios.get(`http://localhost:8034/enseignants`)
          .then((res) => {
            const result = [];
            const map = new Map();
            for (const item of res.data) {
                if (!map.has(item.noEnseignant)) {
                  if(item.noEnseignant){
                    map.set(item.noEnseignant, true);    // set any value to Map
                    result.push(item);
                }
              }
            }
            this.setState({ enseignants: result })
        })
    
        axios.get("http://localhost:8034/formations").then((res)=>{
          const result = [];
          const map = new Map();
          for (const item of res.data) {
              if (!map.has(item.codeFormation)) {
                if(item.codeFormation){
                  map.set(item.codeFormation, true);    // set any value to Map
                  result.push(item);
              }
            }
          }
          this.setState({ formations: result })
        })
    
        axios.get("http://localhost:8034/candidats").then((res)=>{
          const result = [];
          const map = new Map();
          for (const item of res.data) {
              if (!map.has(item.noCandidat)) {
                if(item.noCandidat){
                  map.set(item.noCandidat, true);    // set any value to Map
                  result.push(item);
              }
            }
          }
          this.setState({ candidats: result })
        })
    
        axios.get("http://localhost:8034/promotions").then((res)=>{
          
          this.setState({ promotions: res.data})
        })
    
    }
    render() {
        return (
            <div>
        <br /><br />
        <h2 style={{textAlign:'center'}}>Tableau de bord</h2>
      <div className="featured">
      <div className="featuredItem">
      <FontAwesomeIcon icon={faUserTie} className="featuredIcon"/> <br />
        <span className="featuredTitle" style={{marginLeft:'60px'}}>Nombre d'enseignants</span>
        <div className="featuredLength">
          {this.state.enseignants.length}
        </div>
      </div>
      <div className="featuredItem">
      <FontAwesomeIcon icon={faBook} className="featuredIcon"/><br />
        <span className="featuredTitle" style={{marginLeft:'60px'}}>Nombre de formations</span>
        <div className="featuredLength">
          {this.state.formations.length}
        </div>
      </div>
      <div className="featuredItem">
      <FontAwesomeIcon icon={faUserGroup} className="featuredIcon"/> <br />
      <span className="featuredTitle" style={{marginLeft:'60px'}}>Nombre de candidats</span>
        <div className="featuredLength">
          {this.state.candidats.length}
        </div>
      </div>
      <div className="featuredItem">
      <FontAwesomeIcon icon={faGraduationCap} className="featuredIcon"/><br />
        <span className="featuredTitle" style={{marginLeft:'60px'}}>Nombre de promotions</span>
        <div className="featuredLength">
          {this.state.promotions.length}
        </div>
      </div>
    </div>
    </div>
        );
    }
}

export default Home;