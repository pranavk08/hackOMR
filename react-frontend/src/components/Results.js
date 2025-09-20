import React from 'react';
import { Trophy, BookOpen, CheckCircle, Image as ImageIcon } from 'lucide-react';

const Results = ({ data }) => {
  const { total_score, per_subject_scores, answers, paths } = data;

  const displaySubjectScores = () => {
    if (!per_subject_scores || Object.keys(per_subject_scores).length === 0) {
      return null;
    }

    return (
      <div className="subject-scores">
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BookOpen size={20} />
          Subject Scores
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(per_subject_scores).map(([subject, score]) => (
            <div key={subject} className="subject-score">
              <div className="subject-name">
                {subject.charAt(0).toUpperCase() + subject.slice(1)}
              </div>
              <div className="subject-value">{score}/20</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const displayAnswers = () => {
    if (!answers || Object.keys(answers).length === 0) {
      return null;
    }

    return (
      <div className="answers-section">
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <CheckCircle size={20} />
          Detected Answers
        </h4>
        <div className="answers-grid">
          {Object.entries(answers).map(([question, answer]) => (
            <div key={question} className={`answer-item ${answer ? 'filled' : ''}`}>
              <div className="answer-question">{question}</div>
              <div className="answer-value">{answer || 'Not filled'}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const displayImages = () => {
    if (!paths) return null;

    return (
      <div className="images-section">
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <ImageIcon size={20} />
          Processed Images
        </h4>
        <div className="image-gallery">
          {paths.rectified && (
            <div className="image-item">
              <h5 className="font-medium mb-2">Rectified Image</h5>
              <img
                src={`http://127.0.0.1:8000/outputs/${paths.rectified.split('\\').pop()}`}
                alt="Rectified OMR sheet"
                className="w-full rounded-lg shadow-md border-2 border-gray-200"
              />
            </div>
          )}
          {paths.overlay && (
            <div className="image-item">
              <h5 className="font-medium mb-2">Overlay with Detection</h5>
              <img
                src={`http://127.0.0.1:8000/outputs/${paths.overlay.split('\\').pop()}`}
                alt="Overlay with bubble detection"
                className="w-full rounded-lg shadow-md border-2 border-gray-200"
              />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <Trophy className="text-yellow-500" size={28} />
        Results
      </h3>

      <div className="results-content">
        {/* Total Score */}
        <div className="score-summary">
          <div className="total-score">
            <span className="score-label">Total Score</span>
            <span className="score-value">{total_score || 0}</span>
          </div>
        </div>

        {/* Subject Scores */}
        {displaySubjectScores()}

        {/* Answers */}
        {displayAnswers()}

        {/* Processed Images */}
        {displayImages()}
      </div>

      <style jsx>{`
        .score-summary {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 32px;
          border-radius: 16px;
          text-align: center;
          margin-bottom: 32px;
        }

        .total-score {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .score-label {
          font-size: 1.25rem;
          opacity: 0.9;
        }

        .score-value {
          font-size: 3.5rem;
          font-weight: bold;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        .subject-scores {
          margin-bottom: 32px;
        }

        .subject-score {
          background: #f8f9ff;
          padding: 20px;
          border-radius: 12px;
          text-align: center;
          border-left: 4px solid #667eea;
        }

        .subject-name {
          font-weight: bold;
          color: #333;
          margin-bottom: 8px;
        }

        .subject-value {
          font-size: 1.5rem;
          color: #667eea;
          font-weight: bold;
        }

        .answers-section {
          margin-bottom: 32px;
        }

        .answers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 12px;
        }

        .answer-item {
          background: #f8f9ff;
          padding: 16px;
          border-radius: 8px;
          text-align: center;
          border: 2px solid #e0e0e0;
          transition: all 0.3s ease;
        }

        .answer-item.filled {
          background: #e8f5e8;
          border-color: #4caf50;
        }

        .answer-question {
          font-weight: bold;
          margin-bottom: 8px;
          color: #333;
        }

        .answer-value {
          font-size: 1.1rem;
          color: #667eea;
        }

        .images-section {
          margin-bottom: 32px;
        }

        .image-gallery {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 24px;
        }

        .image-item {
          text-align: center;
        }

        .image-item h5 {
          margin-bottom: 12px;
          color: #333;
        }

        @media (max-width: 768px) {
          .answers-grid {
            grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
          }
          
          .image-gallery {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Results;
