module.exports = async ({github}) => {
  import { RequestError } from "@octokit/request-error";

  // Target repositories
  const starredRepos = await github.rest.search.repos({
    q: 'stars:>100000',
    sort: 'stars',
    per_page: 5,
  });
  console.log(starredRepos.data.total_count, starredRepos.data.incomplete_results);
  console.log(starredRepos.data.items.map(x => x.full_name));

  // Each info
  const repositoryNames = starredRepos.data.items;
  repositoryNames.forEach(async repository => {
    try {
      const workflows = await github.rest.repos.getContent({
        owner: repository.owner.login,
        repo: repository.name,
        path: '.github/workflows/',
      });
      console.log(workflows.status);
    } catch (e) {
      if (e instanceof RequestError) {
        console.log(e);
      } else {
        throw e;
      }
    }
    const content = await github.rest.repos.getContent({
      owner: repository.owner.login,
      repo: repository.name,
      path: '',
    });
    console.log(content.data);
  });
}
