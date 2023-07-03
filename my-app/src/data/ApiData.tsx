import nppes from "../images/tools/NPPES.png"
import openFDA from "../images/tools/openFDA.png"
import world_health from "../images/tools/world_health.png"
export const api_data = [
    {
        id: "1",
        api_name: "WHO Athena API",
        img: world_health,
        text: "The WHO Athena API is a web-based API provided by the World Health Organization (WHO) that allows authorized users to access information about medical products, including medicines and vaccines. Athena stands for \"Adverse Events Terminology Harmonization and Management\".",
        link: "https://www.who.int/data/gho/info/athena-api",
    },
    {
        id: "2",
        api_name: "FDA Drug API",
        img: openFDA,
        text: "OpenFDA provides APIs and raw download access to a number of high-value, high priority and scalable structured datasets, including adverse events, drug product labeling, and recall enforcement reports.",
        link: "https://open.fda.gov/apis/drug/drugsfda/how-to-use-the-endpoint/",
    },
    {
        id: "3",
        api_name: "NPPES Medical Provider API",
        img: nppes,
        text: "The NPPES Medical Provider API is a RESTful API (Application Programming Interface) provided by the National Plan and Provider Enumeration System (NPPES) which is a public registry of healthcare providers in the United States. This API allows authorized users to access data about healthcare providers such as physicians, dentists, and nurses, including their NPI (National Provider Identifier), taxonomy codes, addresses, phone numbers, and more.",
        link: "https://npiregistry.cms.hhs.gov/api-page",
    }

];
