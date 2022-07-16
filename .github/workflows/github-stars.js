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
  repositoryNames.forEach(async repository => {
    const {data: root} = await github.rest.repos.getContent({
      owner: repository.owner.login,
      repo: repository.name,
      path: '',
    });
    console.log(root.map(x => x.name));
    
    // CircleCI
    console.log('[CircleCI]', root.some(x => x.type == 'dir' && x.name == '.circleci'));
    
    // GitHub Actions
    console.log('[GitHub Actions]', root.some(x => x.type == 'dir' && x.name == '.github'));
    if (root.some(x => x.type == 'dir' && x.name == '.github')) {
      const {data: _github} = await github.rest.repos.getContent({
        owner: repository.owner.login,
        repo: repository.name,
        path: '.github',
      });
      console.log(_github.map(x => x.name));
      console.log(_github.some(x => x.type == 'dir' && x.name == 'workflows'));
    }
  });
}
