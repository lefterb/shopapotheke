import { Request, Response } from "express"
import nodefetch from "node-fetch";

const GITHUB_API = "https://api.github.com";

const fixJSDate = (incomingDate: Date, separator = "-"): string => {
  const date = new Date(incomingDate);
  const [year, month, day] = [date.getFullYear(), date.getMonth() + 1, date.getDate()];

  const fixedMonth = month < 10 ? "0" + month : "" + month;
  const fixedDay = day < 10 ? "0" + day : "" + day;

  return `${year}${separator}${fixedMonth}${separator}${fixedDay}`;
}

const queryBuilder = (perPage = 10, page = 0, language: string, date: Date) => {
  const queryDate = `?q=created:>${fixJSDate(date)}`;
  const queryLanguage = !language || language.toLowerCase() !== 'all' ? `+language:${language}` : "";
  const queryPerPage = `&per_page=${perPage}`;
  const queryPage = `&page=${page+1}`;
  const queryOrder = `&order=desc`;
  const querySort = `&sort=stars`;

  const finalQuery = queryDate + queryLanguage + queryPerPage + queryPage + querySort + queryOrder;
  return finalQuery;
}

interface ProcessedRepository {
  id: number,
  name: string,
  stars: number,
  forks: number,
  watchers: number,
  description: string,
  owner: string,
  avatarURL: string,
  language: string
  url: string,
}

const processFetchedRepositories = (repo: Record<string, any>): ProcessedRepository => {
  return {
    id: repo.id,
    name: repo.name,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    watchers: repo.watchers_count,
    description: repo.description,
    owner: repo.owner.login,
    avatarURL: repo.owner.avatar_url,
    language: repo.language || 'unknown',
    url: repo.html_url
  }
}

export const getLatestRepositories = async (
  request: Request,
  response: Response
): Promise<void> => {
  try {
    const {
      currentPage,
      itemsPerPage,
      language,
      date
    } = request.body

    const resource = "/search/repositories";
    const query = queryBuilder(itemsPerPage, currentPage, language, date); // "?q=created:>2021-08-01+language:\"ruby\"&sort=stars&order=desc";
    const apiURL = GITHUB_API + resource + query;

    let resultStatus;
    const result = await nodefetch(apiURL, {
      method: "GET",
      headers: {
        Accept: "application/vnd.github.v3+json"
      }
    }).then((result => {
      resultStatus = result.status
      return result.json()
    }));

    if (resultStatus !== 200) {
      throw {
        status: resultStatus,
        message: result.message
      }
    }

    const processedRepos = result.items.map((fetchedRepository: Record<string, any>) => processFetchedRepositories(fetchedRepository));

    response.status(200).json({
      success: true,
      message: "Success!",
      data: {
        repositories: processedRepos,
        totalItems: result.total_count || 0,
      }
    })
  } catch (error) {
    response.status((error && error.status) || 500).json({
      error: error.detail || error.message || "A server error has occured"
    })
  }
}