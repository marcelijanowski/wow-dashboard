import {ReportService} from "./service.js";

export class ReportController {
  constructor() {
    this.reportService = new ReportService();
    this.generateReport = this.generateReport.bind(this);
    this.getReport = this.getReport.bind(this);
  }
  async generateReport(request, response, next)  {
    try {
      const { headers } = request;
      const data = await this.reportService.generateReport(headers.authorization);
      return response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
  async getReport(request, response, next) {
    try {
      const { headers, params, query } = request;
      const { id } = params;
      const rawData = await this.reportService.getReport(headers.authorization, id);
      const data = query.search ? rawData.service_reports.filter(item => (new RegExp(query.search, 'ig')).test(item.host.name)) : rawData.service_reports;
      return response.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}
