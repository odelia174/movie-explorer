interface ErrorMessageProps {
  message: string;
  details?: string;
}

function ErrorMessage({ message, details }: ErrorMessageProps) {
  return (
    <div className="status-message status-message--error" role="alert">
      <p className="status-message__title">{message}</p>
      {details && <p className="status-message__details">{details}</p>}
    </div>
  );
}

export default ErrorMessage;
