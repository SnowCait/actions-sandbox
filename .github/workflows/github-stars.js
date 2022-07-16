modules.exports = async ({github, context}) => {
  const starredRepos = await github.rest.search.repos({
    q: encodeURIComponent('stars:>100000'),
    sort: 'stars',
    per_page: 5,
  });
  console.log(starredRepos);
}
