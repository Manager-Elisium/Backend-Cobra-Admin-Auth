import { CronJob } from 'cron';
import moment from "moment";
import { createDashboardService, lobbyDashboardService, vipCardDashboardService } from 'src/services/admin-dashbaord.service';

export const job = new CronJob(
  '0 0 * * *',
  async () => {
    const currentDate = moment().startOf('D');
    const body = {
        CREATED_DATE: currentDate
    }
    await lobbyDashboardService(body);
    await vipCardDashboardService(body);
    await createDashboardService(body);
  },
  null,
  true,
  'Asia/Kolkata'
);


