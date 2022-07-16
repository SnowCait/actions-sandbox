module.exports = async ({github}) => {
  const starredRepos = await github.rest.search.repos({
    q: 'stars:>100000',
    sort: 'stars',
    per_page: 5,
  });
  console.log(starredRepos.data);
}
