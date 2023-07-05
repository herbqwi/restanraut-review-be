import { Router } from "express";
import reportController from "../controllers/report.controller";

const router = Router()
router.post('/', async (req, res) => {
  console.log(`POST /report`)
  try {
    console.log(`POST /report`)
    const result = await reportController.createNewReport(req.body);
    res.status(200).send(result);
  } catch (e: any) {
    const errMsg = `An error occurred while creating a new report`;
    console.log(`${errMsg}: `, e);
    res.status(400).send(errMsg);
  }
})

router.get(`/`, async (req, res) => {
  console.log(`GET /`)
  const result = await reportController.getAllReports();
  res.status(result != null ? 200 : 404).send(result);
})

router.get(`/:reportId`, async (req, res) => {
  console.log(`GET /:reportId`)
  const { reportId } = req.params;
  const result = await reportController.getReport(reportId);
  res.status(result != null ? 200 : 404).send(result);
})

router.delete(`/:reportId`, async (req, res) => {
  const { reportId } = req.params;
  const result = await reportController.deleteReport(reportId);

  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send('Report not found');
  }
})


export default router;