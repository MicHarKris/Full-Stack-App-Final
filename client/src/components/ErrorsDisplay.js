// ErrorsDisplay.js
const ErrorsDisplay = ({ errors }) => {
  let errorsDisplay = null;
  // If there are errors, display them
  if (errors.length) {
    errorsDisplay = (
      <div className="validation--errors">
        <h3>Validation errors</h3>
        <ul>
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }
  return errorsDisplay;
};

export default ErrorsDisplay;
