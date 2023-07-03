
export interface Counts {
    all: number;
    closed: number;
    opened: number;
}

export interface Statistics {
    counts: Counts;
}

export interface StatisticsCall {
    statistics: Statistics;
}
export interface ContributorInfo {
    name: string;
    email: string;
    commits: number;
    additions: number;
    deletions: number;
}

export function findContributorInfoWithName(contributorInfoList: ContributorInfo[], name: String) {
    if (contributorInfoList == undefined || contributorInfoList.length == 0) {
        return null
    }
    for (var i = 0; i < contributorInfoList.length; i++) {
        let contributorInfo: ContributorInfo = contributorInfoList[i]
        console.log("contributorInfo.name", contributorInfo.name)
        console.log("name", name)
        if (contributorInfo.name === 'rebecca' && name === 'XU YINGYING') {
            return contributorInfo
        }
        if (contributorInfo.name === name) {
            console.log("found contributorInfo", contributorInfo)
            return contributorInfo
        }
    }
    console.log(contributorInfoList)
    // throw new Error("Name " + name + " not found in contributorInfoList!!!");
}

export function getTotalCommits(contributorInfoList: ContributorInfo[]) {
    if (contributorInfoList == undefined || contributorInfoList.length == 0) {
        return 0
    }
    let result = 0
    for (var i = 0; i < contributorInfoList.length; i++) {
        let contributorInfo: ContributorInfo = contributorInfoList[i]
        result += contributorInfo.commits
    }
    return result
}
