module.exports = async ({github}) => {
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
  const result = await repositoryNames.map(async repository => {
    const {data: root} = await github.rest.repos.getContent({
      owner: repository.owner.login,
      repo: repository.name,
      path: '',
    });
    console.log(root.map(x => x.name));
    
    // CircleCI
    const CircleCI = root.some(x => x.type == 'dir' && x.name == '.circleci');
    
    // GitHub Actions
    let GitHubActions = false;
    if (root.some(x => x.type == 'dir' && x.name == '.github')) {
      const {data: _github} = await github.rest.repos.getContent({
        owner: repository.owner.login,
        repo: repository.name,
        path: '.github',
      });
      GitHubActions = _github.some(x => x.type == 'dir' && x.name == 'workflows');
    }
    
    return {
      repository: repository.full_name,
      CircleCI,
      GitHubActions
    }
  });
  console.log(result);
}
