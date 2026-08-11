const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  courseCategory: { type: String, required: true },
  timeLimitMinutes: { type: Number, default: 10 },
  questions: [{
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswerIndex: { type: Number, required: true },
    explanation: { type: String }
  }]
}, { timestamps: true });

const CertificateSchema = new mongoose.Schema({
  certificateId: { type: String, required: true, unique: true },
  studentName: { type: String, required: true },
  courseTitle: { type: String, required: true },
  issueDate: { type: Date, default: Date.now },
  grade: { type: String, default: 'A+' }
});

module.exports = {
  Quiz: mongoose.model('Quiz', QuizSchema),
  Certificate: mongoose.model('Certificate', CertificateSchema)
};
