import React from 'react'

const AddPlayer = () => {
  return (
    <div className="add-form-container">
    <div className="form-wrapper" style={{ transform: `translateX(-${step * 33.333}%)`}}>
      {/* Form 1 */}
      <div className="form-step">
        <h2>Form 1</h2>
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
        <input type="email" placeholder="Email" />
      </div>

      {/* Form 2 */}
      <div className="form-step">
        <h2>Form 2</h2>
        <input type="text" placeholder="Address" />
        <input type="text" placeholder="City" />
        <input type="text" placeholder="Postal Code" />
      </div>

      {/* Form 3 */}
      <div className="form-step">
        <h2>Form 3</h2>
        <input type="text" placeholder="Card Number" />
        <input type="text" placeholder="Expiration Date" />
        <input type="text" placeholder="CVV" />
      </div>
    </div>

    <div className="navigation-buttons">
        <button onClick={handlePrev} disabled={step === 0}>
          Previous
        </button>
        <button onClick={handleNext} disabled={step === 2}>
          Next
        </button>
      </div>
  </div>
  )
}

export default AddPlayer