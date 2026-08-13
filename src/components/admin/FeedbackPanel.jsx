import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge, EmptyState } from '../ui';

export const FeedbackPanel = ({ feedbacks = [], markAsRead, deleteFeedback }) => {
  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn">
      <div>
        <Badge variant="warning" size="sm" className="mb-2">
          User Submissions
        </Badge>
        <h1 className="text-2xl font-bold tracking-tight text-white">Community Feedback ({feedbacks.length})</h1>
        <p className="text-xs text-text-gray mt-1">Review feedback, suggestions, and resource requests from users.</p>
      </div>

      {feedbacks.length === 0 ? (
        <EmptyState
          title="No user feedback received"
          description="Messages submitted through the user dashboard will appear here."
        />
      ) : (
        <div className="space-y-4">
          {feedbacks.map((fb) => (
            <Card
              key={fb.id}
              className={`p-5 transition-all ${
                fb.read ? 'bg-slate-900/60' : 'bg-slate-900 border-cyan-500/40 shadow-lg shadow-cyan-500/5'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">💬</span>
                  <span className="text-xs font-mono text-text-gray">{fb.date || 'Recent'}</span>
                  {!fb.read && (
                    <Badge variant="warning" size="sm">
                      UNREAD
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {!fb.read && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => markAsRead(fb.id)}
                    >
                      Mark Read
                    </Button>
                  )}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteFeedback(fb.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <p className="text-xs text-text-dark leading-relaxed font-sans">{fb.text}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedbackPanel;
