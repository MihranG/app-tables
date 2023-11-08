export interface IApiError {
    "code": number,
    "details": Array<{
        "@type": "string",
        "additionalProp1": any,
        "additionalProp2": any,
        "additionalProp3": any,
    }>,
    "message": "string"
}

export interface IAppRow {
    "appId": string,
    "appName": string,
    "appSources": string[],
    "category": string
}
export interface IAllAppsResponse {
    appRows:IAppRow[],
    totalCount: number
}

export interface IAppOverviewResponse {
    appOverview: IAppRow
}

export interface IAppUsersResponse {
    appUsers: string[]
}

