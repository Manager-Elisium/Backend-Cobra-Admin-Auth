import moment from "moment";
import { ErrorCodes } from "src/common/error-type";
import StandardError from "src/common/standard-error";
import { AdminActivity } from "src/domain/admin-activity.entity";
import { activityList } from "src/repository/admin-activity.repository";


async function paginationActivityService(body: any): Promise<{ list: AdminActivity[], count: number }> {
    const timePeriods = [
        'Today',
        'Last Seven Days',
        'Last Month',
        'Last Six Months',
        'Last Year',
        'Overall Statistics'
    ];
    if (!timePeriods.includes(body.TIME_PERIODS)) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Time Periods Selection Error."
        );
    }
    const query = {
        take: body.take,
        skip: (body.page - 1) * body.take
    } as any;
    if (body.TIME_PERIODS === "Today") {
        query.startDate = moment().startOf('D');
        query.endDate = moment().endOf('D');
    } else if(body.TIME_PERIODS === "Last Seven Days") {
        query.startDate = moment().startOf('D').subtract(7, 'days');
        query.endDate = moment().endOf('D');
    } else if(body.TIME_PERIODS === "Last Month") {
        query.startDate = moment().startOf('D').subtract(30, 'days');
        query.endDate = moment().endOf('D');
    } else if(body.TIME_PERIODS === "Last Six Months") {
        query.startDate = moment().startOf('D').subtract(180, 'days');
        query.endDate = moment().endOf('D');
    } else if(body.TIME_PERIODS === "Last Year") {
        query.startDate = moment().startOf('D').subtract(365, 'days');
        query.endDate = moment().endOf('D');
    }
    if(!!body.MODULE) {
        query.MODULE = body.MODULE;
    }
    if(!!body.ROLE_ID) {
        query.ROLE_ID = body.ROLE_ID;
    }
    
    const data = await activityList(query) as any;
    if (!data) {
        throw new StandardError(
            ErrorCodes.API_VALIDATION_ERROR,
            "Activity list Found Error."
        );
    }
    console.log(query)
    const list = data?.[0] ?? [];
    return { list: list, count: data?.[1] };
}

// Today, Last Seven Day, Last Month, Last Six month, Last Year, Overall Statics

export { paginationActivityService };