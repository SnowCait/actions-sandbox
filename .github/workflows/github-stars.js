module.exports = async ({github}) => {
  const starredRepos = await github.rest.search.repos({
    q: 'stars:>100000',
    sort: 'stars',
    per_page: 5,
  });
  console.log(starredRepos.data.total_count, starredRepos.data.incomplete_results);
  console.log(starredRepos.data.items.map(x => x.full_name));
}
