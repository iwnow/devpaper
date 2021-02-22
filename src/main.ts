import "./style";

async function rawLoader(path: string) {
  return await fetch(path).then((response) => response.text());
}

async function ghApi(resource: string, httpMethod: 'POST' | 'GET' = 'GET', body?: any) {
  const user = "iwnow";
  const token = "bd085c23abe7c6d84f9d651c25abaa06b22d9057";
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
  return ghApi('/markdown', 'POST', { text }).then(r => r.text()).then(text => {
      const replaced = text.replaceAll('id="user-content-', 'id="');
      return replaced;
  });
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
