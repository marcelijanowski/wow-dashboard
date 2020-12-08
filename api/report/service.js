import axios from "axios";

export class ReportService {
  async generateReport(token) {
    const { data } = await axios({
      url: `${process.env.WOW_HOST}${process.env.WOW_SERVICE_STATUS}`,
      method: 'POST',
      headers: {
        'Authorization': token
      }
    })
    return data;
  }
  async getReport(token, jobId) {
    const { data } = await axios({
      url: `${process.env.WOW_HOST}${process.env.WOW_SERVICE_STATUS}/${jobId}`,
      method: 'GET',
      headers: {
        'Authorization': token
      }
    });
    return data;
  }
}
