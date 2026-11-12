interface LoadingMessageProps {
  text: string;
}

function LoadingMessage({ text }: LoadingMessageProps) {
  return (
    <div className="status-message" role="status">
      <span className="spinner" aria-hidden="true" />
      <p>{text}</p>
    </div>
  );
}

export default LoadingMessage;
