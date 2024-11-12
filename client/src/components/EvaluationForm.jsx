import React, {useState} from 'react'
import './css/EvaluationForm.css'
import { apiService } from "../services/apiService";


const EvaluationForm = ({newPlayerId}) => {

    const evaluationCriteria = [
      {id: 'Passing', label: "Passing",},
      {id: 'Technique', label: "Player's Technique",},
      {id: 'Endurance', label: "Player's Endurance",},
      {id: 'Speed', label: "Player's Speed",},
      {id: 'SetPieces', label: "SetPiece Ability",},
      {id: 'Shooting', label: "Shooting Ability",},
      {id: 'WorkRate', label: "Workrate",},
      {id: 'Jumping', label: "Jumping",},
      {id: 'Aggression', label: "Aggression",},
      {id: 'Strength', label: "Strength",},
      {id: 'Build_up_play', label: "Build_up_play",},
      {id: 'Agility', label: "Agility",},
      {id: 'Short_passes', label: "Short_passes",},
      {id: 'Long_passes', label: "Long_passes",},
      {id: 'Onevone_attacking', label: "Onevone_attacking",},
      {id: 'Decision_making', label: "Decision_making",},
      {id: 'Crossing', label: "Crossing",},
      {id: 'Mentality', label: "Mentality",},
      {id: 'Goalscoring', label: "Goalscoring",},
      {id: 'Offensive_heading', label: "Offensive_heading",},
      {id: 'Defensive_heading', label: "Defensive_heading",},
      {id: 'Leadership', label: "Leadership",}

    ];
      const [ratings, setRatings] = useState({});
      const [notes, setNotes] = useState('');
      const [flag, setFlag] = useState('');
    
      const handleChange = (e, criterionId) => {
        setRatings({
          ...ratings,
          [criterionId]: e.target.value
          
        });
      };

      const [showDialog, setShowDialog] = useState(false);

      const handleDialog = () => {
        setShowDialog(true);

        // Automatically close the dialog after 2 seconds
        setTimeout(() => {
          setShowDialog(false);
        }, 9000);
      }

      const avergaeCalculator = (data) => {
        let average = 0;
        let num = 0;
        for (const [key, value] of Object.entries(data)) {
          if(!(key === "Note" || key === "Player_id" || key === "Average")){
          num = parseInt(value, 10);
          average +=  num;
          }
        }
        return Number((average/22).toFixed(2));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const averageEvaluation = avergaeCalculator(ratings);
        setRatings({
          ...ratings,
          Player_id: newPlayerId,
          Note: notes,
          Average: averageEvaluation,
        });
        
        console.log("average=" + averageEvaluation);

        if(Object.keys(ratings).length < 25){
          setFlag("Incomplete evaluation, check a value for each evalution parameter");
          handleDialog();
        }else{
          try {
            const response = await apiService.post('/evaluation/', ratings, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
            setFlag("Player Added to Databse successfully");
            handleDialog();
            } catch (error) {
              console.error('Error saving player:', error);
            }
          
        }
        
      };

  return (
    <div className="survey-form">
      {showDialog && (
        <div className="dialogStyles">
          <div className="dialogContent">
            <p>{flag}</p>
            <button onClick={() => setShowDialog(false)}>Close</button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {evaluationCriteria.map((criterion) => (
          <div key={criterion.id} className="evaluation-question">
            <span>{criterion.label}</span>
            <div className="radio-button-group">
              {[1, 2, 3, 4, 5].map((value) => (
                <label
                  key={value}
                  className={`radio-button ${
                    ratings[criterion.id] === String(value) ? 'active' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name={criterion.id}
                    value={value}
                    onChange={(e) => handleChange(e, criterion.id)}
                    // required
                  />
                  {value}
                </label>
              ))}
            </div>
          </div>
        ))}

        <h2 className='note-header'>Notes</h2>
        <textarea name="notes" 
          id="notes"
          rows={10}  
          cols={5}
          onChange={(e) =>  setNotes(e.target.value)} 
          required
        />

        <button type="submit" className="submit-button">
          Submit Evaluation
        </button>
      </form> 
    </div>

  )
}

export default EvaluationForm