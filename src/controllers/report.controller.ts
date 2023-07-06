import { IReport } from "../interfaces/report";
import Report from "../models/report.model";
import restaurantController from "./restaurant.controller";

const createNewReport = async (report: IReport.ReportData) => {
  const reviews = (await restaurantController.getAllReviews()).filter(review => review._id == report.commentId);
  const review = reviews.length ? reviews[0] : null
  const newReport = new Report({ ...report, content: review?.content });
  return await newReport.save();
}

const getReport = async (reportId: string) => {
  return await Report.findById(reportId)
}

const getAllReports = async () => {
  return await Report.find();
}


const deleteReport = async (reportId: string) => {
  return await Report.findByIdAndDelete(reportId);
}

const confirmReport = async (reportId: string) => {
  const report = await Report.findById(reportId);
  if (!report) return false;
  await restaurantController.deleteReview(report.restaurantId, report.commentId)
  await deleteReport(reportId);
  return true;
}

export default { createNewReport, getReport, getAllReports, confirmReport, deleteReport };