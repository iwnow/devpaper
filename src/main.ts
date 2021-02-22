import './style';

async function rawLoader(path: string) {
    return await fetch(path).then(response => response.text());
}

