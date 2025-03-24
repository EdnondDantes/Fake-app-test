import React from 'react';
import { Typography } from '@mui/material';

class ErrorBoundary extends React.Component {
  state = { hasError: false, errorInfo: null };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
    this.setState({ errorInfo: errorInfo.componentStack });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20 }}>
          <Typography variant="h5" color="error" gutterBottom>
            Что-то пошло не так
          </Typography>
          <Typography variant="body1">
            Пожалуйста, попробуйте перезагрузить страницу или вернуться позже
          </Typography>
          {this.state.errorInfo && (
            <details style={{ marginTop: 20 }}>
              <summary>Подробности об ошибке</summary>
              <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.errorInfo}</pre>
            </details>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;