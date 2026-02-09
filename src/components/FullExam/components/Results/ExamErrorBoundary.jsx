/* src/components/FullExam/errors/ExamErrorBoundary.jsx */

import React from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

/**
 * Error Boundary for Exam Component
 * Catches errors and displays user-friendly message
 * Allows recovery without full page reload
 */
export class ExamErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Exam Error:', error, errorInfo);
    
    this.setState(prevState => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1,
    }));

    // Log to monitoring service (e.g., Sentry, LogRocket)
    // logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    // Clear local storage if corrupted
    try {
      localStorage.removeItem('exam-progress-draft');
    } catch (err) {
      console.error('Failed to clear storage:', err);
    }

    // Reset error boundary
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });

    // Reload page
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      const isDevelopment = process.env.NODE_ENV === 'development';

      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center p-8">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-8">
            {/* Error Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-red-600" />
              </div>
            </div>

            {/* Error Title */}
            <h1 className="text-2xl font-black text-red-900 text-center mb-2">
              Something Went Wrong
            </h1>

            {/* Error Message */}
            <p className="text-red-800 text-center mb-4">
              We encountered an unexpected error during your exam. Your progress has been automatically saved to your device.
            </p>

            {/* Error Details (Development Only) */}
            {isDevelopment && this.state.error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-xs font-mono text-red-900 break-words">
                  <strong>Error:</strong> {this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-xs font-bold text-red-900">
                      Stack Trace
                    </summary>
                    <pre className="text-xs overflow-auto mt-2 text-red-800">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            {/* What You Can Do */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm font-bold text-blue-900 mb-2">What you can do:</p>
              <ul className="text-sm text-blue-900 space-y-1">
                <li>✓ Your answers are saved locally</li>
                <li>✓ Try reloading the page</li>
                <li>✓ Clear your browser cache if issues persist</li>
                <li>✓ Use a different browser if available</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={this.handleReset}
                className="w-full py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Try Again</span>
              </button>

              <button
                onClick={this.handleGoHome}
                className="w-full py-3 bg-slate-200 text-slate-900 rounded-lg font-bold hover:bg-slate-300 transition-colors"
              >
                Go Home
              </button>
            </div>

            {/* Help Text */}
            <p className="text-xs text-slate-600 text-center mt-6">
              If the problem persists, please contact support at support@huflit.edu.vn
            </p>

            {/* Error Count Warning */}
            {this.state.errorCount > 2 && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-900">
                  <strong>⚠️ Multiple errors detected.</strong> Please reload the page or clear your browser cache.
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ExamErrorBoundary;