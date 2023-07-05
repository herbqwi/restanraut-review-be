import { IReport } from "../interfaces/report";
import Report from "../models/report.model";

const createNewReport = async (report: IReport.ReportData) => {
  const newReport = new Report(report);
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


export default { createNewReport, getReport, getAllReports, deleteReport };