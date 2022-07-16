module.exports = async ({github}) => {
  // Target repositories
  const {data: starredRepos} = await github.rest.search.repos({
    q: 'stars:>10000',
    sort: 'stars',
    per_page: 100,
  });

  // Each info
  return await Promise.all(starredRepos.items.map(async repository => {
    const {data: root} = await github.rest.repos.getContent({
      owner: repository.owner.login,
      repo: repository.name,
      path: '',
    });
    
    // CircleCI
    const CircleCI = root.some(x => x.type == 'dir' && x.name == '.circleci');
    
    // Travis CI
    const TravisCI = root.some(x => x.type == 'file' && x.name == '.travis.yml');
    
    // Drone
    const Drone = root.some(x => x.type == 'file' && x.name == '.drone.yml');
    
    // Azure Pipelines
    const AzurePipelines = root.some(x => x.type == 'file' && x.name == 'azure-pipelines.yml');
    
    // Appveyor
    const Appveyor = root.some(x => x.type == 'file' && x.name == 'appveyor.yml');
    
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
      html_url: repository.html_url,
      CircleCI,
      TravisCI,
      Drone,
      AzurePipelines,
      Appveyor,
      GitHubActions,
    }
  }));
}
