import mongoose, { Schema } from 'mongoose';
import { IReport } from '../interfaces/report';

const reportSchema = new Schema<IReport.ReportData>({
  restaurantId: {
    type: String,
    required: true,
  },
  commentId: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

const Report = mongoose.model<IReport.ReportData>('Report', reportSchema);

export default Report;