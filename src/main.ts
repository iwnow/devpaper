import "./style";

async function rawLoader(path: string) {
  return await fetch(path).then((response) => response.text());
}

async function ghApi(resource: string, httpMethod: 'POST' | 'GET' = 'GET', body?: any) {
  const user = "iwnow";
  const token = "ff817d361da828c381330214c1e82030e1d89fcd";
  const endpoint = "https://api.github.com";
  const creds = `${user}:${token}`;
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
  return ghApi('/markdown', 'POST', { text }).then(r => r.text());
}

async function run() {
  const testMd = await rawLoader(
    "https://raw.githubusercontent.com/repapved/test-article/main/test.md"
  );
  const htmlMd = await markdownToHtml(testMd);

  const mdFrame = document.getElementById("md-frame");
  mdFrame.innerHTML = htmlMd;
}

run();
