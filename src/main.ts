import "./style";

const url = new URL(location.href);

const authToken = url.searchParams.get('auth_token') || atob('YjViZjAyOTdkNjIxM2E5NGEzZWY1YTZlNGIxODIzNjk5MTM0OGMxYg==');
const authUser = url.searchParams.get('auth_user') || 'iwnow';

const mdUser = url.searchParams.get('user') || 'repapved';
const mdRepo = url.searchParams.get('repo') || 'test-article';
const mdFile = url.searchParams.get('file') || 'test.md';
const mdBranch = url.searchParams.get('branch') || 'main';


async function rawLoader(path: string) {
  return await fetch(path).then((response) => response.text());
}

async function ghApi(resource: string, httpMethod: 'POST' | 'GET' = 'GET', body?: any) {
  const endpoint = "https://api.github.com";
  const creds = `${authUser}:${authToken}`;
  const auth = btoa(creds);
  const options = {
    mode: "cors",
    method: httpMethod,
    headers: {
      Authorization: "Basic " + auth,
    },
    body: body && JSON.stringify(body)
  } as any;;
  return fetch(`${endpoint}${resource}`, options);
}

async function markdownToHtml(text: string) {
  return ghApi('/markdown', 'POST', { text }).then(r => r.text()).then(text => {
      const replaced = text.replaceAll('id="user-content-', 'id="');
      return replaced;
  });
}

async function run() {
  const testMd = await rawLoader(
    `https://raw.githubusercontent.com/${mdUser}/${mdRepo}/${mdBranch}/${mdFile}`
  );
  const htmlMd = await markdownToHtml(testMd);

  const mdFrame = document.getElementById("md-frame");
  mdFrame.innerHTML = htmlMd;
}

run();
