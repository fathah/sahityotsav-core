export default class Constants{
    static readonly ISDEV = process.env.NODE_ENV === "development";
    static readonly PROJECT_ROOT = Constants.ISDEV? "C:\\dev\\sahicms\\": "/home/sahicms/";
}